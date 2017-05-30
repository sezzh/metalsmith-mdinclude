# metalsmith-mdinclude

A Metalsmith plugin that let you use an include statement within your markdown files.

It's based on markdown-include project:

https://github.com/sethen/markdown-include

## Installation

with npm:

```bash
$ npm install metalsmith-mdinclude
```

## Usage

```javascript
const Metalsmith = require('metalsmith')
const mdinclude = require('metalsmith-mdinclude')

var metalsmith = new Metalsmith(__dirname)
  .use(mdinclude())
```

you could have a markdown document in `doc-build/markdown/extended/component-overview.md` with this content:

```markdown
# title

#include "doc-build/markdown/built-in/component.md"

```

And a component.md with this content:
```markdown
## title 2

some text
```

this means you have a doc-build directory at your root project, then you'll have a markdown processed chunk within this result once you execute metalsmith:

```markdown
# title

## title 2

some text
```
