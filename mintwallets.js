const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs");

const rawData = fs.readFileSync("keys.json");

const privateKeys = JSON.parse(rawData).keys;

const abi = ["function mint(uint256 quantity) external payable"];

const contractAddress = process.env.CONTRACT_ADDRESS;
const amountToMint = process.env.AMOUNT_TO_MINT;
const ethToSent = process.env.PAYABLE;

const overrides = { value: ethers.utils.parseEther(ethToSent) };

async function main() {
  const provider = ethers.getDefaultProvider();

  const contract = new ethers.Contract(contractAddress, abi, provider);

  for (let i = 0; i < privateKeys.length; i++) {
    const signer = new ethers.Wallet(privateKeys[i]).connect(provider);
    const signedContract = contract.connect(signer);

    try {
      const a = await signedContract.mint(amountToMint, overrides);
      console.log(`${signer.address} minted succesfully!`);
    } catch (err) {
      console.log(err);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
