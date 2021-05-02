import Renamer from 'renamer'
import assert from 'assert'
import rimraf from 'rimraf'
import fs from 'fs'
import path from 'path'
import TestRunner from 'test-runner'
import RenamerIndexDir from 'renamer-index-dir'
import mkdirp from 'mkdirp2'
import getModulePaths from 'current-module-paths'
const a = assert.strict
const __filename = getModulePaths(import.meta.url).__filename

const tom = new TestRunner.Tom()

function createFixture (filePath) {
  const dirname = path.dirname(filePath)
  mkdirp.sync(dirname)
  fs.writeFileSync(filePath, 'test')
  return filePath
}

const testRoot = `tmp/${path.basename(__filename)}`
rimraf.sync(testRoot)

tom.test('optionDefinitions', function () {
  const plugin = new RenamerIndexDir()
  const result = plugin.optionDefinitions()
  a.equal(result.length, 1)
})

tom.test('simple', async function () {
  createFixture(`${testRoot}/${this.index}/one/one`)
  createFixture(`${testRoot}/${this.index}/two/one`)
  createFixture(`${testRoot}/${this.index}/one/two`)
  const renamer = new Renamer()
  await renamer.rename({
    files: [`${testRoot}/${this.index}/one/one`, `${testRoot}/${this.index}/two/one`, `${testRoot}/${this.index}/one/two`],
    chain: ['find-replace', RenamerIndexDir],
    find: /$/,
    replace: '{{index}}'
  })
  a.equal(fs.existsSync(`${testRoot}/${this.index}/one/one`), false)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/two/one`), false)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/one/two`), false)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/one/one1`), true)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/two/one1`), true)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/one/two2`), true)
})

tom.test('simple, no index', async function () {
  createFixture(`${testRoot}/${this.index}/one/one`)
  createFixture(`${testRoot}/${this.index}/two/one`)
  const renamer = new Renamer()
  await renamer.rename({
    files: [`${testRoot}/${this.index}/one/one`, `${testRoot}/${this.index}/two/one`],
    chain: ['find-replace', RenamerIndexDir],
    find: /$/,
    replace: '_'
  })
  a.equal(fs.existsSync(`${testRoot}/${this.index}/one/one`), false)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/two/one`), false)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/one/one_`), true)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/two/one_`), true)
})

tom.test('description', function () {
  const plugin = new RenamerIndexDir()
  const result = plugin.description()
  a.ok(result)
})

export default tom
