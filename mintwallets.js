const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs");

const rawData = fs.readFileSync("keys.json");

const privateKeys = JSON.parse(rawData).keys;

console.log("Private keys length: " + privateKeys.length);

const abi = ["function mint(uint256 quantity) external payable"];

const contractAddress = process.env.CONTRACT_ADDRESS;
const amountToMint = process.env.AMOUNT_TO_MINT;
const ethToSent = process.env.PAYABLE;
const NETWORK = process.env.TESTNET.toLowerCase() === "true" ? "goerli" : "homestead";

const overrides = { value: ethers.utils.parseEther(ethToSent) };

async function main() {
  console.log(`contract address: ${contractAddress} on: ${NETWORK}`);
  const provider = ethers.getDefaultProvider(NETWORK, {
    etherscan: process.env.ETHERSCAN_API_KEY,
    alchemy: process.env.ALCHEMY_API_KEY,
  });

  const contract = new ethers.Contract(contractAddress, abi, provider);

  for (let i = 0; i < privateKeys.length; i++) {
    const signer = new ethers.Wallet(privateKeys[i]).connect(provider);
    const signedContract = contract.connect(signer);

    let tx;
    const balanceInEth = ethers.utils.formatEther(await signer.getBalance());

    console.log(`Wallet: ${signer.address}, balance: ${balanceInEth}`);

    try {
      tx = await signedContract.mint(amountToMint, overrides);
    } catch (err) {
      if (err.code === "INSUFFICIENT_FUNDS") {
        console.log(`   failed to mint, insufficient funds`);
      }

      if (err.code === "UNPREDICTABLE_GAS_LIMIT") {
        console.log(`    failed to mint, unpredictable gas limit balance`);
      }
    }

    if (tx !== undefined) {
      console.log(tx);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
