# card-info
Complex utility for getting card info by its PAN.
Supported providers:
* preservice (dumb checks on client-side)
* binlist.net


#### Usage examples

```javascript
    import BinlistnetService from '@qiwi/card-info/service/binlistnet'
    const service = new BinlistnetService({...})


    service.getPaymentSystem('4111111111111111')    // Promise<'Visa'>
    service.getPaymentSystem('1234')                // Promise<'null>
```

##### Promise and transport customization
By default card-info uses native `Promise` and `fetch`. You may replace them with any compatible api. For example, `Bluebird` and `Axios`
```javascript
    import cardInfo from '@qiwi/card-info'
    import bluebird from 'bluebird'
    import axios from 'axios'
    
    cardInfo.Promise = bluebird
    cardInfo.transport = axios // or any polyfill, pull-fetch-iso, etc.
```

##### Services may be composed
```javascript
    import {composer} from '@qiwi/card-info'
    import {PreService, BinlistnetService} from '@qiwi/card-info/service'
    const preService = new PreService()
    const binlistnetService = new BinlistnetService()

    const composed = compose(preService, binlistnetService)
    
    composed.getPaymentSystem('5321 4012 3456 7890') // 'Mastercard'
    composed.getCardInfo('5321 4012 3456 7890')       // if preService returns null, the request would be processed with binlist.net backend
```

#### What's `PreService`
It's client-side implementation of service. The mostly used paysystems and bins are `hardcoded` for performance purposes.


##### Alternatives

* [braintree/credit-card-type](https://github.com/braintree/credit-card-type)
