import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("Superpower", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySuperpowerFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const superpower = await hre.viem.deployContract("Superpower", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"], {
      gasPrice: 50000000000,
    });

    const publicClient = await hre.viem.getPublicClient();

    return {
      superpower,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { superpower, owner } = await loadFixture(deploySuperpowerFixture);

      expect(await superpower.read.owner()).to.equal(getAddress(owner.account.address));
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { superpower, otherAccount } = await loadFixture(deploySuperpowerFixture);

        // We retrieve the contract with a different account to send a transaction
        const superpowerAsOtherAccount = await hre.viem.getContractAt(
          "Superpower",
          superpower.address,
          { walletClient: otherAccount }
        );

        const dummyAddress = '0xcd3B766CCDd6AE721141F452C550Ca635964ce71'

        await expect(superpowerAsOtherAccount.write.setAdmin([getAddress(dummyAddress)])).to.be.rejected;
      });

      it("Should revert with the right error if called from another account", async function () {
        const { superpower, otherAccount } = await loadFixture(
          deploySuperpowerFixture
        );

        // We retrieve the contract with a different account to send a transaction
        const superpowerAsOtherAccount = await hre.viem.getContractAt(
          "Superpower",
          superpower.address,
          { walletClient: otherAccount }
        );
        await expect(superpowerAsOtherAccount.write.safeMint([otherAccount.account.address, 'https://dummy.com'])).to.be.rejectedWith(
          "Only admin can call this function"
        );
      });
    });

    // Event をテストしたい時に参考にするテスト
    // describe("Events", function () {
    //   it("Should emit an event on withdrawals", async function () {
    //     const { superpower, publicClient } =
    //       await loadFixture(deploySuperpowerFixture);

    //     const hash = await superpower.write.withdraw();
    //     await publicClient.waitForTransactionReceipt({ hash });

    //     // get the withdrawal events in the latest block
    //     const withdrawalEvents = await superpower.getEvents.Withdrawal()
    //     expect(withdrawalEvents).to.have.lengthOf(1);
    //   });
    // });
  });
});
