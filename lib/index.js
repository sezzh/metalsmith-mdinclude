const debug = require('debug')('metalsmith-mdinclude')
const mdInclude = require('markdown-include')

/**
 * Expose `plugin`.
 */
module.exports = plugin

/**
 * metalsmith-mdinclude plugin
 * @param {opts} obj probably aditional settings for further implementations.
 * @returns {function}
 */
function plugin (opts) {
  if (opts === undefined) opts = {}
  opts.pattern = opts.pattern || []

  return (files, metalsmith, done) => {
    setImmediate(done)
    var indexArray = Object.keys(files)
    for (var i = 0; i < indexArray.length; i++) {
      var content = files[indexArray[i]].contents.toString()
      processContent(content, indexArray[i])
    }
    for (i = 0; i < indexArray.length; i++) {
      var replacedContent = mdInclude.build[indexArray[i]].parsedData
      files[indexArray[i]].contents = Buffer.from(replacedContent)
    }
  }
}

/**
 * Process the content of the buffer to discover which files would be include.
 * @param {content} string The content of the file.
 * @param {file} string Path of the file.
 */
function processContent (content, file) {
  var rawData = content
  var includeTags = mdInclude.findIncludeTags(rawData)
  var files = includeTags.length
    ? mdInclude.processIncludeTags(file, content, includeTags)
    : null

  mdInclude.build[file] = {
    files: files,
    includeTags: includeTags,
    rawData: rawData
  }

  if (files && includeTags) {
    mdInclude.build[file].parsedData = mdInclude.replaceIncludeTags(file)
  } else {
    mdInclude.build[file].parsedData = rawData
  }
}
