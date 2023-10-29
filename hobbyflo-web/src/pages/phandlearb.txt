import React from 'react';
import { useConnect } from '@wagmi/core';

const phandlearb: React.FC = () => {
  const connect = useConnect();

  const abi = [
    { "inputs": [ { "internalType": "address", "name": "_buyer", "type": "address" }, { "internalType": "address", "name": "_seller", "type": "address" }, { "internalType": "address", "name": "_daoAddress", "type": "address" }, { "internalType": "uint256", "name": "_escrow", "type": "uint256" }, { "internalType": "bytes32", "name": "_hash2", "type": "bytes32" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "arbitrationFlag", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyer", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "closeDeal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "closingDate", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "escrow", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "winner", "type": "address" } ], "name": "handleArbitrationResults", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "inspectionEndDate", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "inspectionStartDate", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "seller", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "startArbitration", "outputs": [], "stateMutability": "nonpayable", "type": "function" } 
 ];
 
 const contract_address = "0x03ab0d2cc20863e6ff92e9fda28d21de73c0fc7e";
 const escrowAmount = useContract.escrow();

   const { contract } = useContract({
     abi,
     address: contract_address,
     escrow: escrowAmount
   });

  const onHandleArbitrationResults = async () => {
    // Get the user's wallet address
    const walletAddress = await connect();



    // Get the arbitration results
    const winner = await contract.handleArbitrationResults();

    // Release the escrow funds to the winner
    await contract.handleArbitrationResults(winner);
  };

  return (
    <button onClick={onHandleArbitrationResults}>Handle Arbitration Results</button>
  );
};

export default phandlearb;