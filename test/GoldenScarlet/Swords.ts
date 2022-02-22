import { expect } from "chai";
import { ethers } from "hardhat";

describe("GoldenScarlet - Swords", function () {
  it("should airdrop some swords", async function () {
    const [owner, receiver1, receiver2] = await ethers.getSigners();

    const Swords = await ethers.getContractFactory("GoldenScarletSwords");
    const swords = await Swords.deploy([owner.address]);
    await swords.deployed();

    await swords
      .connect(owner)
      .airdrop([5, 15], [receiver1.address, receiver2.address]);

    const balanceOfReceiver1 = await swords.balanceOf(receiver1.address);
    const balanceOfReceiver2 = await swords.balanceOf(receiver2.address);
    expect(balanceOfReceiver1).to.be.equal("5");
    expect(balanceOfReceiver2).to.be.equal("15");
  });

  it("should airdrop swords to a lot of wallets", async function () {
    const [owner, ...wallets] = await ethers.getSigners();

    const Swords = await ethers.getContractFactory("GoldenScarletSwords");
    const swords = await Swords.deploy([owner.address]);
    await swords.deployed();

    await swords.connect(owner).airdrop(
      wallets.map(() => 100),
      wallets.map((wallet) => wallet.address)
    );

    console.log("WALLETS", wallets.length);
    const balanceOfSomeWallet = await swords.balanceOf(wallets[0].address);
    expect(balanceOfSomeWallet).to.be.equal("100");
  });

  it("should not allow other wallets airdrop", async function () {
    const [owner, hackerman] = await ethers.getSigners();

    const Swords = await ethers.getContractFactory("GoldenScarletSwords");
    const swords = await Swords.deploy([owner.address]);
    await swords.deployed();

    expect(
      swords.connect(hackerman).airdrop([5], [hackerman.address])
    ).to.be.revertedWith("nice try bro");
  });
});
