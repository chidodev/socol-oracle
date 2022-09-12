import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, waffle } from "hardhat";
import { TemperatureOracle } from "../typechain-types";

describe("Temperature Oracle", () => {
    let TemperatureOracle: TemperatureOracle;
    let deployer: SignerWithAddress;
    let stakeholder1: SignerWithAddress;
    let stakeholder2: SignerWithAddress;
    let stakeholder3: SignerWithAddress;
    let outlier: SignerWithAddress;

    const fixture = async () => {
        [deployer, stakeholder1, stakeholder2, stakeholder3, outlier] = await ethers.getSigners();
        
        const TemperatureOracleFactory = await ethers.getContractFactory(
            "TemperatureOracle"
        );
        return (await TemperatureOracleFactory.deploy(stakeholder1.address, stakeholder2.address, stakeholder3.address)) as TemperatureOracle;
    };

    beforeEach(async () => {
        TemperatureOracle = await waffle.loadFixture(fixture);
        
    });

    describe("#getter", () => {
        it("should be zero initially", async () => {
            expect(await TemperatureOracle.getTemperature())
                .emit(TemperatureOracle, 'GetRequest')
                .withArgs(0, 2);
        });
    });

    describe("#setter", () => {
        const TEMPERATURE = BigNumber.from(3600);
        
        it("detect outlier", async () => {
            await TemperatureOracle.connect(outlier).setTemperature(TEMPERATURE)

            expect(await TemperatureOracle.getTemperature())
                .emit(TemperatureOracle, 'GetRequest')
                .withArgs(0, 2);
        });

        it("works for stakeholder", async () => {
            await TemperatureOracle.connect(stakeholder1).setTemperature(TEMPERATURE)

            expect(await TemperatureOracle.getTemperature())
                .emit(TemperatureOracle, 'GetRequest')
                .withArgs(3600, 2);
        });
    });
});
