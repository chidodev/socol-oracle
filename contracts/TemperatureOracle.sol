// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract TemperatureOracle {
    uint private temperature; // temperature variable as integer    
    uint8 private constant DECIMAL = 2; // temperature decimal value

    // oracle nodes info
    uint private threshold = 2; // minium node count for consensus to determine temperature
    uint private totalOracleCount = 3; // total count of nodes

    mapping(uint => address) private stakeholders; // oracles which submit temprature
    mapping(address => uint) private temperatures; // temperatures submitted by oracles

    // trigger this event when client SC requests temperature
    event GetRequest(
        uint temperature, 
        uint8 decimal
    );

    // trigger this event when oracle nodes set temprature when there is a consensus
    event SetRequest(
        uint temperature, 
        uint8 decimal
    );

    // whitelist stakeholders
    constructor(address stakeholder1, address stakeholder2, address stakeholder3) {
        stakeholders[0] = stakeholder1;
        stakeholders[1] = stakeholder2;
        stakeholders[2] = stakeholder3;
    }

    // called outside of oracle
    function getTemperature() public {
        emit GetRequest(temperature, DECIMAL);
    }

    // called by oracle
    function setTemprature(uint _temperature) public {
        // check if the node is whitelisted. here detect outliers
        bool whitelisted = false;
        uint index = 0;
        while(!whitelisted && index < totalOracleCount) {
            if(stakeholders[index] == msg.sender) {
                whitelisted = true;
            }
            index ++;
        }

        if(whitelisted) {
            // update temperature mapping
            temperatures[msg.sender] = _temperature;

            // count same values
            uint count = 0;
            
            // iterate through stakeholder list and check if enough oracles have submitted same value
            for (uint i; i < totalOracleCount; i++) {
                if(temperatures[stakeholders[i]] == _temperature) {
                    count++;
                }
                // if count exceeds threshold then update temperature and emit event
                if(count >= threshold) {
                    temperature = _temperature;
                    emit SetRequest(_temperature, DECIMAL);
                    break;
                }
            }
        }
    }
}
