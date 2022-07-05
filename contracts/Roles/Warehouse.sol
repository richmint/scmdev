// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "./Roles.library.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 

contract Warehouse is Ownable{
    using Roles for Roles.Role;
    Roles.Role private warehouse; 

    event AddWarehouse(address _address);
    event RemoveWarehouse(address _address);

    constructor (){
        addWarehouse(msg.sender);
    }
    
    modifier onlyWarehouse() {
        require(isWarehouse(msg.sender));
        _;
    }

    function addWarehouse(address _address) public onlyOwner(){
        warehouse.addRole(_address);
        emit AddWarehouse(_address);
    }

    function removeWarehouse(address _address) public onlyOwner(){
        warehouse.removeRole(_address);
        emit RemoveWarehouse(_address);
    }
    
    function removeSelfWarehouse(address _address) public{
        require(msg.sender==_address,"YOU_CAN_NOT_ROMOVE_THIS_ADDRESS");
        warehouse.removeRole(_address);
        emit RemoveWarehouse(_address);
    }

    function isWarehouse(address _address) view public returns(bool){
        return warehouse.isRole(_address);
    }

    function getWarehouse() view public returns(address[] memory){
        return warehouse.getRole();
    }
}