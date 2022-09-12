import { ethers } from "hardhat";

async function main() {
  const Oracle = await ethers.getContractFactory("TemperatureOracle");
  const oracle = await Oracle.deploy(
    '0x904125fefec7e9357d0161bb4ac6c65a3287052f',
    '0x1400d86ffdb14f6dc821412fbb7bca3d6205493b',
    '0xd916def9bcd3c36e3fe4e5be889d5104b086d692'
  );

  await oracle.deployed();

  console.log(`oracle deployed to ${oracle.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
