// // SPDX-License-Identifier: UNLICENSED      
// pragma solidity ^0.8.4;                     
// import "hardhat/console.sol";   

// contract Supplychain2{
// function mint(
//         address _account,
//         uint256 id,
//         uint256 _amount
//     ) public {
//         // require(msg.sender == owner() || balanceOf(msg.sender,id)>0,"Not a stakeholder");
//         require(msg.sender == owner(), "ONLY OWNER CAN MINT");
//         _mint(_account, id, _amount, "0x00");
//     }

//     function _beforeTokenTransfer(
//         address operator,
//         address from,
//         address to,
//         uint256 id,
//         uint256 amount,
//         bytes memory data,
//         uint counter
//     ) internal override(ERC1155, ERC1155Supply) {

//         if (from == address(0)) {
//             if (balanceOf(to, id) == 0) {
//                 Entity memory entity = Entity({
//                     bearer: to,
//                     timestamp: block.timestamp,
//                     blocknumber: block.number
//                 });
//                 entityMap[id][0].push(entity);
//             } else {
//                 Entity[] memory prev_Entity_array = entityMap[id][0];
//                 for (uint256 i = 1; i <= amount; i++) {
//                     for (uint j=0; j<prev_Entity_array.length; j++){
//                         entityMap[id][i].push(prev_Entity_array[j]);
//                     }
//                 }
//             }
//         } else {
//             uint i=counter;
//             while(amount>0){
//                 Entity memory entity = Entity({
//                     bearer: to,
//                     timestamp: block.timestamp,
//                     blocknumber: block.number
//                 });
//                 entityMap[id][i].push(entity);
//                 amount--;
//                 i++;
//             }
//         }
//         super._beforeTokenTransfer(operator, from, to, id, amount, data, counter);
//     }
// }