import { expect } from "chai";
import { ethers } from "hardhat";

describe("FantomMunks", function () {
  it("should mint two munks", async function () {
    const FantomMunks = await ethers.getContractFactory("FantomMunks");
    const fantomMunks = await FantomMunks.deploy();
    await fantomMunks.deployed();

    const [owner] = await ethers.getSigners();
    await fantomMunks.connect(owner).claim(2, {
      value: ethers.utils.parseEther("2"),
    });

    const balanceOfOwner = await fantomMunks.balanceOf(owner.address);
    expect(balanceOfOwner).to.be.equal("2");
  });
});
