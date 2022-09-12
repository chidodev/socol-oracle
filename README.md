## Requirements

Design a simple oracle smart contract that tracks the current temperature, up to 2 decimal places.
1. Provide a setter for the temperature
2. Provide a getter for the temperature

### Note
1. How to ensure we are decentralized and without a single point fo failure?
2. How do we determine who can submit the temperature?
3. How can we make sure no one is submitting wrong values?
4. How do we detect outliers?

## Explanation

This shows only oracle smart contract implementation, not included off-chain part of oracle.
Many variables are hardcoded for simplicity.
Oracle networks consist of many oracle nodes.
Here assumed only 3 oracles.
1. get function will be called outside of oracle, mainly by client smart contract.
2. set function will be called by oracle nodes. 
3. oracles are whitelisted to determine who can submit and detect outliers.
4. temperature is determined by threshold.

## Test
1. Install packages
```shell
npm install
```
2. test
```shell
npm run test
```

## License
ISC
