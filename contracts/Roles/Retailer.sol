// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "./Roles.library.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Retailer is Ownable{
    using Roles for Roles.Role;
    Roles.Role private retailer; 

    event AddRetailer(address _address);
    event RemoveRetailer(address _address);

    constructor (){
        addRetailer(msg.sender);
    }
    
    modifier onlyRetailer() {
        require(isRetailer(msg.sender));
        _;
    }

    function addRetailer(address _address) public onlyOwner(){
        retailer.addRole(_address);
        emit AddRetailer(_address);
    }

    function removeRetailer(address _address) public onlyOwner(){
        retailer.removeRole(_address);
        emit RemoveRetailer(_address);
    }

    function removeRetailerSelf(address _address) public {
        require(msg.sender==_address,"YOU_CAN_NOT_ROMOVE_THIS_ADDRESS");
        retailer.removeRole(_address);
        emit RemoveRetailer(_address);
    }

    function isRetailer(address _address) view public returns(bool){
        return retailer.isRole(_address);
    }

    function getRetailer() view public returns(address[] memory){
        return retailer.getRole();
    }
}