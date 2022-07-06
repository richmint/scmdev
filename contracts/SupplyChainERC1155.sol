// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
// import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/utils/Address.sol";
// import "@openzeppelin/contracts/token/ERC1155/../../utils/Context.sol";
// import "@openzeppelin/contracts/token/ERC1155/../../utils/introspection/ERC165.sol";
// import "@openzeppelin/contracts/token/ERC1155/../../utils/introspection/IERC165.sol";


contract ERC1155 is Context {
    using Address for address;
    mapping(uint256 => mapping(address => uint256)) private _balances;

    mapping(address => mapping(address => bool)) private _operatorApprovals;
    uint public totalNFT;
    mapping(address => uint[]) internal mySupplyToken;
    constructor() {}

    function balanceOf(address account, uint256 id) public view virtual returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");
        return _balances[id][account];
    }

    function setApprovalForAll(address operator, bool approved) public virtual {
        _setApprovalForAll(_msgSender(), operator, approved);
    }


    function isApprovedForAll(address account, address operator) public view virtual  returns (bool) {
        return _operatorApprovals[account][operator];
    }

    function safeTransferFrom( address from, address to, uint256 id, uint256 amount, bytes memory data, uint counter) public virtual {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, id, amount, data, counter);
    }


    function _safeTransferFrom( address from, address to, uint256 id, uint256 amount, bytes memory data ,uint counter) internal virtual {
        require(to != address(0), "ERC1155: transfer to the zero address");

        address operator = _msgSender();
        _beforeTokenTransfer(operator, from, to, id, amount, data, counter);

        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }
        _balances[id][to] += amount;

    }


    function _mint( address to, uint256 id, uint256 amount, bytes memory data) internal virtual {
        require(to != address(0), "ERC1155: mint to the zero address");

        address operator = _msgSender();
        _beforeTokenTransfer(operator, address(0), to, id, amount, data, 0);

        _balances[id][to] += amount;
    }


    function _setApprovalForAll(address owner, address operator, bool approved ) internal virtual {
        require(owner != operator, "ERC1155: setting approval status for self");
        _operatorApprovals[owner][operator] = approved;
    }

    function _beforeTokenTransfer( address operator, address from, address to, uint256 ids, uint256 amounts, bytes memory data, uint counter) internal virtual {}

    function _asSingletonArray(uint256 element) private pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }

    function getMySupplyTokens(address owner) public view returns (uint[] memory){
        return mySupplyToken[owner];
    }
}

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
        uint256 id,
        uint256 amount,
        bytes memory data,
        uint counter
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, id, amount, data, counter);
        if (from == address(0)) {    
            _totalSupply[id] += amount;
            
        }
        if (from == address(0) && balanceOf(to, id)==0){
            totalNFT++;
            mySupplyToken[to].push(id);
        }
        // if (to == address(0)) {
        //     for (uint256 i = 0; i < ids.length; ++i) {
        //         uint256 id = ids[i];
        //         uint256 amount = amounts[i];
        //         uint256 supply = _totalSupply[id];
        //         require(
        //             supply >= amount,
        //             "ERC1155: burn amount exceeds totalSupply"
        //         );
        //         unchecked {
        //             _totalSupply[id] = supply - amount;
        //         }
        //     }
        // }
    }
}

contract SupplyChainToken is ERC1155, Ownable, ERC1155Supply {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC1155() {}

    struct Entity {
        address bearer;
        uint256 timestamp;
        uint256 blocknumber;
    }
    //  mapping from tokenId to its shareHolders for each unit
    mapping(uint256 => mapping(uint256 => Entity[])) public entityMap;


    function mint(
        address _account,
        uint256 id,
        uint256 _amount
    ) public {
        // require(msg.sender == owner() || balanceOf(msg.sender,id)>0,"Not a stakeholder");
        require(msg.sender == owner(), "ONLY OWNER CAN MINT");
        _mint(_account, id, _amount, "0x00");
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data,
        uint counter
    ) internal override(ERC1155, ERC1155Supply) {

        if (from == address(0)) {
            if (balanceOf(to, id) == 0) {
                Entity memory entity = Entity({
                    bearer: to,
                    timestamp: block.timestamp,
                    blocknumber: block.number
                });
                entityMap[id][0].push(entity);
            } else {
                Entity[] memory prev_Entity_array = entityMap[id][0];
                for (uint256 i = 1; i <= amount; i++) {
                    for (uint j=0; j<prev_Entity_array.length; j++){
                        entityMap[id][i].push(prev_Entity_array[j]);
                    }
                }
            }
        } else {
            uint i=counter;
            while(amount>0){
                Entity memory entity = Entity({
                    bearer: to,
                    timestamp: block.timestamp,
                    blocknumber: block.number
                });
                entityMap[id][i].push(entity);
                amount--;
                i++;
            }
        }
        super._beforeTokenTransfer(operator, from, to, id, amount, data, counter);
    }
}




