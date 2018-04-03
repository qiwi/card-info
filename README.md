# card-info
Complex utility for getting card info by its PAN

##### Usage examples

```javascript
    import {getPaymentSystem} from '@qiwi/card-info'
    
    getPaymentSystem('4111111111111111')  // 'VISA'
    getPaymentSystem('1234') // null
```

##### Alternatives
* [braintree/credit-card-type](https://github.com/braintree/credit-card-type)
