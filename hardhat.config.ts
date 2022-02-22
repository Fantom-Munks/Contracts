import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

console.log(`0x${process.env.WALLET_DEPLOY}`);
const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    testnet: {
      chainId: 4002,
      url: "https://rpc.testnet.fantom.network/",
      accounts: [`0x${process.env.DEPLOY_WALLET}`],
    },
    mainnet: {
      chainId: 250,
      url: "https://rpc.ftm.tools/",
      accounts: [`0x${process.env.DEPLOY_WALLET}`],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    token: "FTM",
    gasPriceApi: "https://api.ftmscan.com/api?module=proxy&action=eth_gasPrice",
    coinmarketcap: process.env.COINMARKETCAP_APIKEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
