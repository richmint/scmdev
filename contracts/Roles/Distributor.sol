// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "./Roles.library.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Distributor  is Ownable{
    using Roles for Roles.Role;
    Roles.Role private distributor; 

    event AddDistributor(address _address);
    event RemoveDistributor(address _address);

    constructor (){
        addDistributor(msg.sender);
    }
    
    modifier onlyDistributor() {
        require(isDistributor(msg.sender));
        _;
    }

    function addDistributor(address _address) public onlyOwner(){
        distributor.addRole(_address);
        emit AddDistributor(_address);
    }

    function removeDistributor(address _address) public onlyOwner(){
        distributor.removeRole(_address);
        emit RemoveDistributor(_address);
    }

    function removeDistributorSelf(address _address) public {
        require(msg.sender==_address,"YOU_CAN_NOT_ROMOVE_THIS_ADDRESS");
        distributor.removeRole(_address);
        emit RemoveDistributor(_address);
    }

    function isDistributor(address _address) view public returns(bool){
        return distributor.isRole(_address);
    }

    function getDistributor() view public returns(address[] memory){
        return distributor.getRole();
    }
}