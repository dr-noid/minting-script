/**
 * This script will fund a number of wallets from a seeder wallet
 */

const { ethers } = require("ethers");
require("dotenv").config();

const mainKey = process.env.PRIVATE_KEY;
const ethToSent = "0.001";

async function main() {
  let seeder = new ethers.Wallet(mainKey);
  const provider = ethers.getDefaultProvider();

  addresses = ["0xbdc16ABf8E52a1b7D8A21e1333BB4aE2a57873F9"];

  addresses.forEach(async (address) => {
    seeder = seeder.connect(provider);

    const tx = {
      to: address,
      from: seeder.address,
      type: null,
      chainId: 1,
      value: ethers.utils.parseEther(ethToSent).toString(),
    };

    let a = await seeder.sendTransaction(tx);

    console.log("a" + a);

    // console.log("jo");
    // const txResponse = await (await signedSeeder.sendTransaction(tx)).hash;
    // console.log(type(txResponse));
  });
}

async function getWallet(privateKey) {
  return new ethers.Wallet(privateKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
