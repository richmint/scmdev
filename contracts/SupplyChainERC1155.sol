// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

abstract contract ERC1155Supply is ERC1155 {
    mapping(uint256 => uint256) private _totalSupply;

    /**
     * @dev Total amount of tokens in with a given id.
     */
    function totalSupply(uint256 id) public view virtual returns (uint256) {
        return _totalSupply[id];
    }

    /**
     * @dev Indicates whether any token exist with a given id, or not.
     */
    function exists(uint256 id) public view virtual returns (bool) {
        return ERC1155Supply.totalSupply(id) > 0;
    }

    /**
     * @dev See {ERC1155-_beforeTokenTransfer}.
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; ++i) {
            _totalSupply[ids[i]] += amounts[i];
        }

        if (to == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                uint256 id = ids[i];
                uint256 amount = amounts[i];
                uint256 supply = _totalSupply[id];
                require(supply >= amount, "ERC1155: burn amount exceeds totalSupply");
                unchecked {
                    _totalSupply[id] = supply - amount;
                }
            }
        }
    }
}
contract SupplyChainToken is ERC1155, Ownable, ERC1155Supply {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() ERC1155("") {}
    struct Entity{
        address bearer;
        uint timestamp;
        uint blocknumber;
    }
    //  mapping from tokenId to its shareHolders
    mapping(uint =>Entity[]) public entityMap; 
    
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address _account ,uint id,uint _amount) public {
        // require(msg.sender == owner() || balanceOf(msg.sender,id)>0,"Not a stakeholder");
        require(msg.sender == owner() ,"ONLY OWNER CAN MINT");
        _mint(_account, id, _amount, "0x00");
    } 

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        if(from!=address(0)){
            Entity memory entity = Entity({
                bearer:operator, 
                timestamp: block.timestamp, 
                blocknumber: block.number
                });
            entityMap[ids[0]].push(entity);
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
