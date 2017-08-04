# Semi-Semantic Versioning

Semi-Semantic is similar to semver, but more permissive, allowing arbitrary number of segment components, like `1.2.3.4`.

Semi-Semantic also allows and sorts segmented alphanumerics in the pre-release and post-release segments, like `1.2.3-alpha.1`.

Numeric components sort numerically. Alphanumeric components sort alphanumerically. This maximizes flexibility so you can sort versions intuitively, even if they're not strictly semver format!

See the [semi_semantic](https://github.com/pivotal-cf-experimental/semi_semantic) Ruby gem for more details.

## Install

```
npm install semi-semantic
```

## Use

Require:
```
var semi_semantic = require('semi-semantic');
```

Parse:
```
var version_string = '1.2.3-alpha.1+e2da3c7';
var version = semi_semantic.parse(version_string);
console.log(version.release);
// 1.2.3
console.log(version.pre_release);
// alpha.1
console.log(version.post_release);
// e2da3c7
console.log(version);
// 1.2.3-alpha.1+e2da3c7
```

Sort:
```
var versions = [ '1.2.5', '1.2.4', '1.2.3' ];
// parse list
for (var i = 0, len = versions.length; i < len; i++) {
  versions[i] = semi_semantic.parse(versions[i]);
}
// sort
var sorted = versions.sort(semi_semantic.sort);
// toString list
for (var i = 0, len = sorted.length; i < len; i++) {
  sorted[i] = sorted[i].toString();
}
console.log(sorted);
// [ '1.2.3', '1.2.4', '1.2.5' ]
```

## Test

```
npm install
npm test
```
