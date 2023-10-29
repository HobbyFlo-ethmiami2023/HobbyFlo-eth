// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract Deal {

// escrow
    uint256 public escrow;

// Buyer and seller state variables
    address public buyer;
    address public seller;

// inspection start date timestamp
    uint256 public inspectionStartDate;

// inspection end date timestamp
    uint256 public inspectionEndDate;

// closing date timestamp
    uint256 public closingDate;

// arbitration flag
    bool public arbitrationFlag;

// jury DAO
    address public daoAddress;

//input is leading 0x followed by a hexadecimal conversion of your hash (SHA256, SHA3, MD5, CRC)
    bytes32 hash2;

// milestones calculated using block.timestamp
    constructor(
        address _buyer,
        address _seller,
        address _daoAddress,
        uint256 _escrow,
        bytes32 _hash2
       
    ) {
        buyer = _buyer;
        seller = _seller;
        escrow = _escrow;
        daoAddress= _daoAddress;
       
        hash2= _hash2;

// Set the milestones based on the current timestamp
        inspectionStartDate = block.timestamp;
        inspectionEndDate = inspectionStartDate + 1209600;
        closingDate = inspectionEndDate + 604800;

// default arbitration to pending
        arbitrationFlag = false;
    }

// escrow deposit
    function deposit() external payable {
        require(msg.sender == buyer, "Only the buyer deposits escrow");
        require(msg.value == escrow, "The deposit must match the escrow amount");
    }

// Close the deal and pay the seller the escrow amount if the closing date has been reached
    function closeDeal() external {
        require(msg.sender == buyer, "Only the buyer can close the deal");
        require(block.timestamp >= closingDate, "The closing date has not been reached");

// Release the escrow funds to the seller
        payable(seller).transfer(escrow);
    }

// Start arbitration
    function startArbitration() external {
        require(msg.sender == buyer || msg.sender == seller, "Only the buyer or seller can start arbitration");
        require(arbitrationFlag == false, "Arbitration is already in progress");

// set the arbitration flag to true
        arbitrationFlag = true;
    }

function handleArbitrationResults(address winner) external {
        require(msg.sender == daoAddress, "Only the DAO can handle arbitration results");
        require(arbitrationFlag == true, "Arbitration is not in progress");

// Calculate the DAO fee
        uint256 daoFee = escrow * 5 / 100;

// Subtract the DAO fee from the escrow amount
        escrow -= daoFee;

// Release the escrow funds to the winner
        payable(winner).transfer(escrow);

// set the arbitration flag to false
        arbitrationFlag = false;
    }
}