# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0"></a>
# [1.0.0](https://github.com/qiwi/card-info/compare/v0.7.1...v1.0.0) (2018-05-15)



<a name="0.7.1"></a>
## [0.7.1](https://github.com/qiwi/card-info/compare/v0.7.0...v0.7.1) (2018-05-15)



<a name="0.7.0"></a>
# [0.7.0](https://github.com/qiwi/card-info/compare/v0.6.0...v0.7.0) (2018-04-20)


### Features

* **abstractService:** add normalizers for BIN and PAN ([24d643e](https://github.com/qiwi/card-info/commit/24d643e))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/qiwi/card-info/compare/v0.5.0...v0.6.0) (2018-04-19)


### Features

* abstractService get* methods returns Promise<null> instead of exception ([c2f7a4f](https://github.com/qiwi/card-info/commit/c2f7a4f))
* add freebinchecker service ([4e048f1](https://github.com/qiwi/card-info/commit/4e048f1))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/qiwi/card-info/compare/v0.4.0...v0.5.0) (2018-04-18)


### Features

* add braintree service ([0fa5860](https://github.com/qiwi/card-info/commit/0fa5860))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/qiwi/card-info/compare/v0.3.0...v0.4.0) (2018-04-16)


### Features

* pass additional transport props from service to api layer ([a49beb6](https://github.com/qiwi/card-info/commit/a49beb6))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/qiwi/card-info/compare/v0.2.0...v0.3.0) (2018-04-14)


### Bug Fixes

* **preservice:** getPaySys must return the only match ([b5b8f34](https://github.com/qiwi/card-info/commit/b5b8f34))


### Features

* add cardInfo response contract ([bc2702e](https://github.com/qiwi/card-info/commit/bc2702e))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/qiwi/card-info/compare/v0.1.0...v0.2.0) (2018-04-12)


### Features

* **preservice:** add paysys defs for mastercard, amex, mir, maestro, etc. ([c7fc2e3](https://github.com/qiwi/card-info/commit/c7fc2e3))
* add `org` field to paysys definition ([dfa52ae](https://github.com/qiwi/card-info/commit/dfa52ae))



<a name="0.1.0"></a>
# 0.1.0 (2018-04-10)


### Bug Fixes

* **validator:** return false if alg is not supported ([0cd7a88](https://github.com/qiwi/card-info/commit/0cd7a88))


### Features

* add basic ifaces, boilerplate & validators ([2d1ac23](https://github.com/qiwi/card-info/commit/2d1ac23))
* **prelight:** add basic impl ([8347bbf](https://github.com/qiwi/card-info/commit/8347bbf))
* **transport:** add basic impl ([98bc627](https://github.com/qiwi/card-info/commit/98bc627))
* add binlist.net service provider ([980a984](https://github.com/qiwi/card-info/commit/980a984))
* add service composer ([d04ae89](https://github.com/qiwi/card-info/commit/d04ae89))
* Promise and transport customization ([3d759d3](https://github.com/qiwi/card-info/commit/3d759d3))
