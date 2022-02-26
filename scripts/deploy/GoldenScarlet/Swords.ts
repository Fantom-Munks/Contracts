import {ethers} from "hardhat";

async function main() {
  const Swords = await ethers.getContractFactory("GoldenScarletSwords");
  const swords = await Swords.deploy([
    "0x70b70E0658F81d56C30E43b71be3922Ec4aF213E",
    "0xf7159D1E34EF333aB7737607d96d1F30E72a1Bb9",
  ]);

  await swords.deployed();

  console.log("contract deployed to:", swords.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
