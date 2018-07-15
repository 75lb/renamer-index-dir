[![view on npm](https://img.shields.io/npm/v/renamer-index-dir.svg)](https://www.npmjs.org/package/renamer-index-dir)
[![npm module downloads](https://img.shields.io/npm/dt/renamer-index-dir.svg)](https://www.npmjs.org/package/renamer-index-dir)
[![Build Status](https://travis-ci.org/75lb/renamer-index-dir.svg?branch=master)](https://travis-ci.org/75lb/renamer-index-dir)
[![Dependency Status](https://david-dm.org/75lb/renamer-index-dir.svg)](https://david-dm.org/75lb/renamer-index-dir)
[![Coverage Status](https://coveralls.io/repos/github/75lb/renamer-index-dir/badge.svg)](https://coveralls.io/github/75lb/renamer-index-dir)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# renamer-index-dir

Replaces the `{{index}}` token like the built-in renamer behaviour but resets the counter for each folder visited.

_In the example below, Windows users should use double instead of single quotes._

```
$ npm install -g renamer renamer-index-dir

$ tree
.
├── folder1
│   ├── one
│   └── two
├── folder2
│   ├── one
│   └── two
├── one
└── two

2 directories, 6 files

$ renamer -p default -p renamer-index-dir --find '/$/' --replace '{{index}}' */*
✔︎ folder1/one → folder1/one1
✔︎ folder1/two → folder1/two2
✔︎ folder2/one → folder2/one1
✔︎ folder2/two → folder2/two2

$ tree
.
├── folder1
│   ├── one1
│   └── two2
├── folder2
│   ├── one1
│   └── two2
├── one
└── two

2 directories, 6 files
```


* * *

&copy; 2018 Lloyd Brookes <75pound@gmail.com>.