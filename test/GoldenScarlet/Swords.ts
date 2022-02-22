import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GoldenScarlet - Swords", function () {
  let owner: SignerWithAddress;
  let otherWallets: SignerWithAddress[];
  let swords: Contract;

  this.beforeEach(async () => {
    [owner, ...otherWallets] = await ethers.getSigners();

    const Swords = await ethers.getContractFactory("GoldenScarletSwords");
    swords = await Swords.deploy([owner.address]);
    await swords.deployed();
  });

  describe("Airdrop", () => {
    it("should airdrop some swords", async () => {
      const [receiver1, receiver2] = otherWallets;
      await swords
        .connect(owner)
        .airdrop([5, 15], [receiver1.address, receiver2.address]);

      const balanceOfReceiver1 = await swords.balanceOf(receiver1.address);
      const balanceOfReceiver2 = await swords.balanceOf(receiver2.address);
      expect(balanceOfReceiver1).to.be.equal("5");
      expect(balanceOfReceiver2).to.be.equal("15");
    });

    it("should airdrop swords to a lot of wallets", async () => {
      await swords.connect(owner).airdrop(
        otherWallets.map(() => 100),
        otherWallets.map((wallet) => wallet.address)
      );

      const balanceOfSomeWallet = await swords.balanceOf(
        otherWallets[0].address
      );
      expect(balanceOfSomeWallet).to.be.equal("100");
    });

    it("should not allow other wallets airdrop", async () => {
      const [hackerman] = otherWallets;

      const receipt = await swords
        .connect(hackerman)
        .airdrop([5], [hackerman.address])
        .catch((err: Error) => err.message);

      expect(receipt).to.be.equal(
        "VM Exception while processing transaction: reverted with reason string 'Not part of the MUNKSTAFF'"
      );
      expect(await swords.balanceOf(hackerman.address)).to.be.equal("0");
    });
  });

  describe("TokenURI", () => {
    this.beforeEach(async () => {
      await swords.connect(owner).airdrop([1], [owner.address]);
    });

    it("should provide default tokenURI", async () => {
      const tokenId = 0;
      const tokenUri = await swords.tokenURI(tokenId);

      expect(tokenUri).to.be.equal(
        `https://www.munksnft.com/api/swords/${tokenId}.json`
      );
    });

    it("should provide changed tokenURI", async () => {
      const tokenId = 0;

      await swords.connect(owner).setBaseURI("https://test.com/swords/");

      const tokenUri = await swords.tokenURI(tokenId);

      expect(tokenUri).to.be.equal(`https://test.com/swords/${tokenId}.json`);
    });
  });
});
