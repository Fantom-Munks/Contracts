# Fantom Munks Contracts

This is the repository where all contracts from MUNKVERSE will live (everything here is thinking about Fantom Network).

## About the contracts

FantomMunks.sol is the first collection of the MUNKVERSE, it have a total supply of 10000
and the mint price 1 FTM. 

GoldenScarlet/Swords.sol is the second one. We decided to make an airdrop 1:1 to the Munk Holders.
The contract is kinda different from FantomMunks.sol, once the Swords will be only airdropped, we 
use the [ERC721A](https://github.com/chiru-labs/ERC721A) as an alternative to @openzeppelin's ERC721 to decrease fees in batch mint.


## Did you find an error?

Please open an issue so we can work to improve these contracts.

## How to run?

Just clone the repository, install the dependencies and you are ready to go!
```bash
git clone git@github.com:LeonardsonCC/fantom-munks-contracts.git

cd fantom-munks-contracts
npm install
```

To run the tests:
```bash
npm test
```

## Can I copy the code to use for my collection?

Of course, you can! But we are not responsible if there are any errors or problems. Do it with that in mind.

## Deployed Contracts

- **FantomMunks**: [0x7e72f05b8cd0860a83a6b27d3d80bd3b3e440c27](https://ftmscan.com/token/0x7e72f05b8cd0860a83a6b27d3d80bd3b3e440c27)
- **Golden Scarlet**:
  - **Swords**: [0x12acd3e7c1a58794bfad2b6cfdb766da6462687a](https://ftmscan.com/token/0x12acd3e7c1a58794bfad2b6cfdb766da6462687a)


## Thanks for reading this!
If you have any other questions, feel free DM me on [twitter](https://twitter.com/leonardsoncc);
