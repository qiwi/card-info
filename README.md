# card-info
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![buildStatus](https://img.shields.io/travis/qiwi/card-info.svg?maxAge=3600&branch=master)](https://travis-ci.org/qiwi/card-info)
[![coverage](https://img.shields.io/coveralls/qiwi/card-info.svg?maxAge=3600)](https://coveralls.io/github/qiwi/card-info)
[![dependencyStatus](https://img.shields.io/david/qiwi/card-info.svg?maxAge=3600)](https://david-dm.org/qiwi/card-info)
[![devDependencyStatus](https://img.shields.io/david/dev/qiwi/card-info.svg?maxAge=3600)](https://david-dm.org/qiwi/card-info)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/qiwi/card-info)

Complex utility for getting card info by its PAN.
Supported providers:
* preservice (dumb checks on client-side)
* binlist.net
* `<CustomService>`


#### Usage examples

```javascript
    import BinlistnetService from '@qiwi/card-info/service/binlistnet'
    const service = new BinlistnetService({...})


    service.getPaymentSystem('4111111111111111')    // Promise<'Visa'>
    service.getPaymentSystem('1234')                // Promise<null>
```

##### `Promise` and `transport` customization
By default card-info uses native `Promise` and `fetch`. You may replace them with any compatible api. For example, `Bluebird` and `Axios`
```javascript
    import cardInfo from '@qiwi/card-info'
    import bluebird from 'bluebird'
    import axios from 'axios'
    
    cardInfo.Promise = bluebird
    cardInfo.transport = axios // or any polyfill, pull-fetch-iso, etc.
```

##### Service composition
```javascript
    import {composer} from '@qiwi/card-info'
    import {PreService, BinlistnetService} from '@qiwi/card-info/service'
    
    const preService = new PreService()
    const binlistnetService = new BinlistnetService()
    const composed = compose(preService, binlistnetService)
    
    composed.getPaymentSystem('5321 4012 3456 7890')  // 'Mastercard'
    composed.getCardInfo('5321 4012 3456 7890')       // if preService returns null, the request would be processed with binlist.net backend
```

##### `CustomService`
Composer supports any impl of [IService](./src/interface.js), so you're let to create your own class.
```javascript
    import AbstractService from '@qiwi/card-info/service/abstract'

    class CustomService extends AbstractService implements IService {
        getPaymentSystem(pan: string): Promise<?IPaymentSystem> {
            // ...
        }
        getCardInfo(pan: string): Promise<?ICardInfo> {
            // ...
        }
    }
```

##### What's `PreService`
It's client-side implementation of service. The mostly used paysystems and bins are `hardcoded` for performance purposes.


##### Alternatives
* [braintree/credit-card-type](https://github.com/braintree/credit-card-type)
