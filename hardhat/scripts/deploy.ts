import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";
import hre from "hardhat";
import { FEE, KEY_HASH, LINK_TOKEN, VRF_COORDINATOR } from "../constants";

async function main() {
	const randomWinnerGame = await ethers.getContractFactory("RandomWinnerGame");
	// deploy the contract
	const deployedRandomWinnerGameContract = await randomWinnerGame.deploy(
		VRF_COORDINATOR,
		LINK_TOKEN,
		KEY_HASH,
		FEE
	);

	await deployedRandomWinnerGameContract.deployed();

	// print the address of the deployed contract
	console.log(
		"Verify Contract Address:",
		deployedRandomWinnerGameContract.address
	);

	console.log("Sleeping.....");
	// Wait for etherscan to notice that the contract has been deployed
	await sleep(30000);

	// Verify the contract after deploying
	await hre.run("verify:verify", {
		address: deployedRandomWinnerGameContract.address,
		constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
	});
}

const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
