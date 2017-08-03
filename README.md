# Semi-Semantic Versioning

Semi-Semantic is similar to semver, but more permissive, allowing arbitrary number of segment components, like `1.2.3.4`.

Semi-Semantic also allows non numeric segment components, like `1.2.alpha`. I don;t recommend that, but it parses and sorts! Numeric components sort numerically. Alphanumeric components sort alphanumerically. This maximizes flexibility so you can version however the hell you want!

See the [semi_semantic](https://github.com/pivotal-cf-experimental/semi_semantic) Ruby gem for more details.
