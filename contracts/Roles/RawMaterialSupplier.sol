// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "./Roles.library.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RawMaterialSupplier is Ownable{
    using Roles for Roles.Role;
    Roles.Role private rawMaterialSupplier; 

    event AddRawMaterialSupplier(address _address);
    event RemoveRawMaterialSupplier(address _address);

    constructor (){
        addRawMaterialSupplier(msg.sender);
    }
    
    modifier onlyRawMaterialSupplier() {
        require(isRawMaterialSupplier(msg.sender),"Not a Raw Material Supplier");
        _;
    }

    function addRawMaterialSupplier(address _address) public onlyOwner(){
        rawMaterialSupplier.addRole(_address);
        emit AddRawMaterialSupplier(_address);
    }

    function removeRawMaterialSupplier(address _address) public onlyOwner(){
        rawMaterialSupplier.removeRole(_address);
        emit RemoveRawMaterialSupplier(_address);
    }

    function removeRawMaterialSupplierSelf(address _address) public {
        require(msg.sender==_address,"YOU_CAN_NOT_ROMOVE_THIS_ADDRESS");
        rawMaterialSupplier.removeRole(_address);
        emit RemoveRawMaterialSupplier(_address);
    }

    function isRawMaterialSupplier(address _address) view public returns(bool){
        return rawMaterialSupplier.isRole(_address);
    }

    function getRawMaterialSupplier() view public returns(address[] memory){
        return rawMaterialSupplier.getRole();
    }
}