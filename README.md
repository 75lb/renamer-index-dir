[![view on npm](https://badgen.net/npm/v/renamer-index-dir)](https://www.npmjs.org/package/renamer-index-dir)
[![npm module downloads](https://badgen.net/npm/dt/renamer-index-dir)](https://www.npmjs.org/package/renamer-index-dir)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/renamer-index-dir)](https://github.com/75lb/renamer-index-dir/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/renamer-index-dir)](https://github.com/75lb/renamer-index-dir/network/dependents?dependent_type=PACKAGE)
[![Build Status](https://travis-ci.org/75lb/renamer-index-dir.svg?branch=master)](https://travis-ci.org/75lb/renamer-index-dir)
[![Coverage Status](https://coveralls.io/repos/github/75lb/renamer-index-dir/badge.svg)](https://coveralls.io/github/75lb/renamer-index-dir)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# renamer-index-dir

This is a [renamer](https://github.com/75lb/renamer) replace chain plugin - see [this tutorial](https://github.com/75lb/renamer/wiki/How-to-use-replace-chain-plugins) to learn how to use renamer plugins.

Replaces the `{{index}}` token (like the [built-in renamer behaviour](https://github.com/75lb/renamer/wiki/Examples#index-token-examples)) but resets the counter for each folder visited.

_In the example below, Windows users should use double instead of single quotes._ Remove the `--dry-run` flag to rename the files on disk.

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

$ renamer --chain find-replace --chain renamer-index-dir --find '/$/' --replace '{{index}}' --dry-run */*

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

&copy; 2018-21 Lloyd Brookes <75pound@gmail.com>.
