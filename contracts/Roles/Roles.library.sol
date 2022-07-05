// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
library Roles{
    struct Role{
        address[] bearer;
    }
    function isRole(Role storage role, address _address) internal view returns(bool){
        uint length =role.bearer.length;
        for(uint i=0; i<length; i++){
            if(role.bearer[i]==_address) return true; 
        }
        return false;
    }
    function addRole(Role storage role, address _address) internal {
        require(!isRole(role, _address),"ROLE_ALREADY_EXISTS");
        role.bearer.push(_address);
    }
    function removeRole(Role storage role, address _address) internal {
        uint length =role.bearer.length;
        bool temp;
        for(uint i=0; i<length; i++){
            if(temp){
                role.bearer[i-1] =role.bearer[i];
            }
            if(role.bearer[i]==_address){temp=true;}
        }
        role.bearer.pop();
    }
    function getRole(Role storage role) internal view returns(address[] memory){ 
        return role.bearer;
    }

    function totalRole(Role storage role) internal view returns(uint){ 
        return role.bearer.length;
    }
}