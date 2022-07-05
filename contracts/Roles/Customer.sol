// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "./Roles.library.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Customer is Ownable{
    using Roles for Roles.Role;
    Roles.Role private customer; 

    event AddCustomer(address _address);
    event RemoveCustomer(address _address);

    constructor (){
        addCustomer(msg.sender);
    }
    
    modifier onlyCustomer() {
        require(isCustomer(msg.sender));
        _;
    }

    function addCustomer(address _address) public onlyOwner(){
        customer.addRole(_address);
        emit AddCustomer(_address);
    }

    function removeCustomer(address _address) public onlyOwner(){
        customer.removeRole(_address);
        emit RemoveCustomer(_address);
    }
    
    function removeCustomerSelf(address _address) public{
        require(msg.sender==_address,"YOU_CAN_NOT_ROMOVE_THIS_ADDRESS");
        customer.removeRole(_address);
        emit RemoveCustomer(_address);
    }

    function isCustomer(address _address) view public returns(bool){
        return customer.isRole(_address);
    }

    function getCustomer() view public returns(address[] memory){
        return customer.getRole();
    }
}