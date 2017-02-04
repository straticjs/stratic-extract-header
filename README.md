# `stratic-extract-header`

[![Greenkeeper badge](https://badges.greenkeeper.io/straticjs/stratic-extract-header.svg)](https://greenkeeper.io/)

[remark][1] plugin to extract values from a standard [Stratic][2] header

## Installation

    npm install stratic-extract-header

## Usage

```js
var remark = require('remark');
var extractHeader = require('stratic-extract-header');

var fileData = {}
var processor = remark().use(extractHeader, {data: fileData});

processor.process([
    '# Post information',
    '"Title", "0 UTC-0","Jane Doe", "some, categories"',
	'# Post text',
	'Some arbitrary Markdown content'
].join('\n'));

console.log(fileData);
```

Outputs:

```
{ title: 'Title',
  time: { epoch: '0', utcoffset: 'UTC-0' },
  author: 'Jane Doe',
  categories: [ 'some', 'categories' ] }
```

You must pass an options object to `remark.use()`. This object should contain one key, `data`, whose value is a reference to the object that `stratic-extract-header` will populate with metadata information.

## License

LGPL 3.0+

## Author

Alex Jordan <alex@strugee.net>

 [1]: https://github.com/wooorm/remark
 [2]: https://github.com/strugee/generator-stratic
