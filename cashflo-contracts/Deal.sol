// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract Deal {

    // escrow 
    uint256 public escrow;

    // Buyer and seller state variables
    address public buyer;
    address public seller;

    // Milestones
    enum DealMilestone {
        AgreementRetainer,
        InspectionPeriodOpens,
        InspectionPeriodCloses,
        DealCloses
    }

    // storing results of arbitration
    enum ArbitrationStatus {
        Pending,
        BuyerWins,
        SellerWins
    }
    ArbitrationStatus public arbitrationStatus;

    // jury DAO 
    address public daoAddress;

    // milestones stored on chain
    DealMilestone[] public milestones;

    constructor(
        address _buyer,
        address _seller,
        uint256 _escrow,
        DealMilestone[] memory _milestones
    ) {
        buyer = _buyer;
        seller = _seller;
        escrow = _escrow;
        milestones = _milestones;

        // defaults arbitration to pending
        arbitrationStatus = ArbitrationStatus.Pending;
    }

    // escrow deposit
    function deposit() external payable {
        require(msg.sender == buyer, "Only the buyer deposits escrow");
        require(msg.value == escrow, "The deposit must match the escrow amount");
    }

    function releaseEscrowToSellerAtClosingDate() external {
  require(msg.sender == buyer, "Only the buyer can release escrow to seller at closing date");
  require(arbitrationStatus == ArbitrationStatus.Pending, "Arbitration is in progress");
     // Release the escrow funds to the seller
  payable(seller).transfer(escrow);
}



    // Start arbitration
    function startArbitration() external {
        require(msg.sender == buyer || msg.sender == seller, "Only the buyer or seller can start arbitration");
        require(arbitrationStatus == ArbitrationStatus.Pending, "Arbitration is already in progress");

        //arbitration handled by DAO internally

        // set the arbitration status to pending
        arbitrationStatus = ArbitrationStatus.Pending;
    }
    

    // Handle verdict of arbitration. The DAO calls the function with result of arbitration and winner address as parameters
   function handleArbitrationResults(ArbitrationStatus result, address winner) external {
  require(msg.sender == daoAddress, "Only the DAO can handle arbitration results");

  // Calculate the DAO fee
  uint256 daoFee = escrow * 5 / 100;

  // Subtract the DAO fee from the escrow amount
  escrow -= daoFee;

  // Update the arbitration status
  arbitrationStatus = result;

  // Release the escrow funds to the winner
  if (winner != address(0)) {
    payable(winner).transfer(escrow);
    
  }
}
}