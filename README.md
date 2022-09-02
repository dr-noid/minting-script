# Minting Script for minting ERC721 tokens from compatible Smart Contract

1. Install dependencies, `yarn`

2. Create `.env` like so:

```
CONTRACT_ADDRESS = "0x0"
AMOUNT_TO_MINT = "1"
PAYABLE = "0.000"
```

### note:

- `AMOUNT_TO_MINT` will be passed as the first argument to the mint function
- `PAYABLE` is in Ether

3. Specify private keys in `keys.json` like so:

```
{
    keys: [
        "key1",
        "key2",
    ]
}
```

4. run `npm run mint` or `node mintwallets.js`

5. ???

6. Profit
