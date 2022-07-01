// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "./Roles.library.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ISO is Ownable{
    using Roles for Roles.Role;
    Roles.Role private iso; 

    event AddISO(address _address);
    event RemoveISO(address _address);

    constructor (){
        addISO(msg.sender);
    }
    
    modifier onlyISO() {
        require(isISO(msg.sender));
        _;
    }

    function addISO(address _address) public onlyOwner(){
        iso.addRole(_address);
        emit AddISO(_address);
    }

    function removeISO(address _address) public onlyOwner(){
        iso.removeRole(_address);
        emit RemoveISO(_address);
    }
    function removeISOSelf(address _address) public {
        require(msg.sender==_address,"YOU_CAN_NOT_ROMOVE_THIS_ADDRESS");
        iso.removeRole(_address);
        emit RemoveISO(_address);
    }

    function isISO(address _address) view public returns(bool){
        return iso.isRole(_address);
    }

    function getISO() view public returns(address[] memory){
        return iso.getRole();
    }
}