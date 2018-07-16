const TestRunner = require('test-runner')
const renamerIndexDir = require('./')
const Renamer = require('renamer')
const mkdirp = require('mkdirp2')
const path = require('path')
const fs = require('fs')
const a = require('assert')
const rimraf = require('rimraf')

const runner = new TestRunner()

function createFixture (filePath) {
  const dirname = path.dirname(filePath)
  mkdirp.sync(dirname)
  fs.writeFileSync(filePath, 'test')
  return filePath
}

const testRoot = `tmp/${path.basename(__filename)}`
rimraf.sync(testRoot)

runner.test('optionDefinitions', function () {
  const Plugin = renamerIndexDir(class {})
  const plugin = new Plugin()
  const result = plugin.optionDefinitions()
  a.strictEqual(result.length, 1)
})

runner.test('simple', function () {
  createFixture(`${testRoot}/${this.index}/one/one`)
  createFixture(`${testRoot}/${this.index}/two/one`)
  const renamer = new Renamer()
  renamer.rename({
    files: [ `${testRoot}/${this.index}/one/one`, `${testRoot}/${this.index}/two/one`],
    plugin: [ 'default', renamerIndexDir ],
    find: /$/,
    replace: '{{index}}'
  })
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/one/one`), false)
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/two/one`), false)
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/one/one1`), true)
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/two/one1`), true)
})

runner.test('simple, no index', function () {
  createFixture(`${testRoot}/${this.index}/one/one`)
  createFixture(`${testRoot}/${this.index}/two/one`)
  const renamer = new Renamer()
  renamer.rename({
    files: [ `${testRoot}/${this.index}/one/one`, `${testRoot}/${this.index}/two/one`],
    plugin: [ 'default', renamerIndexDir ],
    find: /$/,
    replace: '_'
  })
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/one/one`), false)
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/two/one`), false)
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/one/one_`), true)
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/two/one_`), true)
})
