import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GoldenScarlet - Portals", function () {
  let owner: SignerWithAddress;
  let otherWallets: SignerWithAddress[];
  let portals: Contract;

  this.beforeEach(async () => {
    [owner, ...otherWallets] = await ethers.getSigners();

    const Portals = await ethers.getContractFactory("GoldenScarletPortals");
    portals = await Portals.deploy([owner.address]);
    await portals.deployed();
  });

  describe("Airdrop", () => {
    it("should airdrop some portals", async () => {
      const [receiver1, receiver2] = otherWallets;
      await portals
        .connect(owner)
        .airdrop([5, 15], [receiver1.address, receiver2.address]);

      const balanceOfReceiver1 = await portals.balanceOf(receiver1.address);
      const balanceOfReceiver2 = await portals.balanceOf(receiver2.address);
      expect(balanceOfReceiver1).to.be.equal("5");
      expect(balanceOfReceiver2).to.be.equal("15");
    });

    it("should airdrop portals to a lot of wallets", async () => {
      await portals.connect(owner).airdrop(
        otherWallets.map(() => 100),
        otherWallets.map((wallet) => wallet.address)
      );

      const balanceOfSomeWallet = await portals.balanceOf(
        otherWallets[0].address
      );
      expect(balanceOfSomeWallet).to.be.equal("100");
    });

    it("should not allow other wallets airdrop", async () => {
      const [hackerman] = otherWallets;

      const receipt = await portals
        .connect(hackerman)
        .airdrop([5], [hackerman.address])
        .catch((err: Error) => err.message);

      expect(receipt).to.be.equal(
        "VM Exception while processing transaction: reverted with reason string 'Not part of the MUNKSTAFF'"
      );
      expect(await portals.balanceOf(hackerman.address)).to.be.equal("0");
    });
  });

  describe("TokenURI", () => {
    this.beforeEach(async () => {
      await portals.connect(owner).airdrop([1], [owner.address]);
    });

    it("should provide default tokenURI", async () => {
      const tokenId = 0;
      const tokenUri = await portals.tokenURI(tokenId);

      expect(tokenUri).to.be.equal(
        `https://www.munksnft.com/api/golden-scarlet/portals/${tokenId}.json`
      );
    });

    it("should provide changed tokenURI", async () => {
      const tokenId = 0;

      await portals.connect(owner).setBaseURI("https://test.com/portals/");

      const tokenUri = await portals.tokenURI(tokenId);

      expect(tokenUri).to.be.equal(`https://test.com/portals/${tokenId}.json`);
    });
  });
});
