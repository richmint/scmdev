// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "./Roles.library.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable{
    using Roles for Roles.Role;
    Roles.Role private factory; 

    event AddFactory(address _address);
    event RemoveFactory(address _address);

    constructor (){
        addFactory(msg.sender);
    }
    
    modifier onlyFactory() {
        require(isFactory(msg.sender));
        _;
    }

    function addFactory(address _address) public onlyOwner(){
        factory.addRole(_address);
        emit AddFactory(_address);
    }

    function removeFactory(address _address) public onlyOwner(){
        factory.removeRole(_address);
        emit RemoveFactory(_address);
    }

    function removeFactorySelf(address _address) public {
        require(msg.sender==_address,"YOU_CAN_NOT_ROMOVE_THIS_ADDRESS");
        factory.removeRole(_address);
        emit RemoveFactory(_address);
    }

    function isFactory(address _address) view public returns(bool){
        return factory.isRole(_address);
    }

    function getFactory() view public returns(address[] memory){
        return factory.getRole();
    }
}