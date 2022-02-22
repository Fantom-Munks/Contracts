import { expect } from "chai";
import { ethers } from "hardhat";

describe("FantomMunks", function () {
  it("should mint one munk", async function () {
    const FantomMunks = await ethers.getContractFactory("FantomMunks");
    const fantomMunks = await FantomMunks.deploy();
    await fantomMunks.deployed();

    const [owner] = await ethers.getSigners();
    await fantomMunks.connect(owner).claim(1, {
      value: ethers.utils.parseEther("1"),
    });

    const balanceOfOwner = await fantomMunks.balanceOf(owner.address);
    expect(balanceOfOwner).to.be.equal("1");
  });

  it("should mint ten munks", async function () {
    const FantomMunks = await ethers.getContractFactory("FantomMunks");
    const fantomMunks = await FantomMunks.deploy();
    await fantomMunks.deployed();

    const [owner] = await ethers.getSigners();
    await fantomMunks.connect(owner).claim(10, {
      value: ethers.utils.parseEther("10"),
    });

    const balanceOfOwner = await fantomMunks.balanceOf(owner.address);
    expect(balanceOfOwner).to.be.equal("10");
  });
});
