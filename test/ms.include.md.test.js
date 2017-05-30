const Metalsmith = require('metalsmith')
const path = require('path')
const mdinclude = require('../index')

test('Should exist include markdown content', (done) => {
  var doc1 =
  `# Docs\n\n# class1\n\nclass1 description\n\n\n# class2\n\nclass2 description\n\n`
  var doc2 = `# test markdown\n\njust a paragraph.\n\n`

  function callback (err, files) {
    if (err) console.log(err)
    expect(files['docs.md'].contents.toString()).toBe(doc1)
    expect(files['index.md'].contents.toString()).toBe(doc2)
    done()
  }

  Metalsmith(__dirname)
  .source(path.resolve(__dirname, 'src', 'markdown', 'extended'))
  .destination(path.resolve(__dirname, 'docs'))
  .use(mdinclude({}))
  .build(callback)
})
