# card-info
Complex utility for getting card info by its PAN.
Supported providers:
* preservice (dumb checks on client-side)
* binlist.net
* freebinchecker.com
* <NDA>
* <Custom>


#### Usage examples

```javascript
    import BinlistService from '@qiwi/card-info/service/binlistnet'
    const service = new BinlistService({...})


    service.getPaymentSystem('4111111111111111')    // Promise<'Visa'>
    service.getPaymentSystem('1234')                // Promise<'null>
```

##### Promise & transport customisation
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
    import {PrelightSevice, BinlistSevice} from '@qiwi/card-info'
    const prelightService = new PrelightSevice()
    const binlistService = new BinlistSevice()

    const api = new Api(prelightService, binlistService)
    
    api.getPaymentSystem('5321 4012 3456 7890') // 'Mastercard'
    api.getBinInfo('5321 4012 3456 7890')       // if prelight returns null, the request would be processed with binlist.net backend
```

#### What's `PrelightService`
It's client-side implementation of service. The mostly used paysystems and bins are `hardcoded` for performance purposes.


##### Alternatives

* [braintree/credit-card-type](https://github.com/braintree/credit-card-type)
