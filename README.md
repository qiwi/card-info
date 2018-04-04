# card-info
Complex utility for getting card info by its PAN

##### Usage examples

```javascript
    import {Api} from '@qiwi/card-info'
    const api = new Api('binlist')              // 'qiwi'

    api.getPaymentSystem('4111111111111111')    // 'VISA'
    api.getPaymentSystem('1234')                // null
```

##### Alternatives

* [braintree/credit-card-type](https://github.com/braintree/credit-card-type)
