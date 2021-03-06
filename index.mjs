import path from 'path'
import printj from 'printj'

class RenamerIndexDir {
  constructor () {
    this.matchCount = {}
  }

  description () {
    return 'Replaces the `\\{\\{index\\}\\}` token, resetting the counter for each folder visited.'
  }

  optionDefinitions () {
    return [
      { name: 'index-format', description: 'The format of the number to replace `\\{\\{index\\}\\}` with. Specify a standard printf format string, for example `%03d` would yield 001, 002, 003 etc. Defaults to `%d`.' }
    ]
  }

  getMatchCount (dirname) {
    if (!this.matchCount[dirname]) this.matchCount[dirname] = 1
    return this.matchCount[dirname]++
  }

  replace (filePath, options) {
    if (/{{index}}/.test(filePath)) {
      const file = path.parse(filePath)
      const newBasename = this.replaceIndexToken(file.base, this.getMatchCount(file.dir), options.indexFormat || '%d')
      return path.join(file.dir, newBasename)
    } else {
      return filePath
    }
  }

  replaceIndexToken (basename, index, format) {
    return basename.replace(/{{index}}/g, printj.sprintf(format, index))
  }
}

export default RenamerIndexDir
