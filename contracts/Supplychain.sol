// SPDX-License-Identifier: UNLICENSED
import "./Roles/Warehouse.sol";
import "./Roles/Factory.sol";
import "./Roles/ISO.sol";
import "./Roles/Distributor.sol";
import "./Roles/RawMaterialSupplier.sol";
import "./Roles/Retailer.sol";
import "./Roles/Customer.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "./SupplyChainERC1155.sol";


pragma solidity ^0.8.4;
contract Supplychain is RawMaterialSupplier,Warehouse, Factory, Distributor, Retailer, Customer{
    using Counters for Counters.Counter;
    address supplyChainToken;
    Counters.Counter private supplyChainId;

    constructor(address _supplychainToken) RawMaterialSupplier() Warehouse() Factory() Distributor() Retailer() Customer(){
        supplyChainToken =_supplychainToken;
    }

    enum State{
        rawMaterialSupplierSuppliesRM,
        factoryBuyRawMaterial,
        factorySellItemToDistributors,
        DistributorSellToRetailer,
        RetailerSellToCustomer
    }  

    State constant defaultState = State.rawMaterialSupplierSuppliesRM;

    struct Item{
        uint supplyChainId;             // Counter for this batch items
        // address entityAddress;               // Metamask-Ethereum address of the current owner (Changes as the product moves through different stages)
        State itemState;                // Product State as represented in the enum above

        uint PolyesterAmount;
        uint CottonAmount;
        uint WoolAmount;
        
        uint totalUnits;
        
        address RawMaterialSupplierID;  // Metamask-Ethereum address of the RawMaterialSupplier
        address warehouseID;            // Metamask-Ethereum address of the warehouse
        address factoryID;              // Metamask-Ethereum address of the factory
        address[] distributorID;          // Metamask-Ethereum address of the Distributor
        uint[] distributorUnits;
        // address retailerID;             // Metamask-Ethereum address of the Retailer
        // address consumerID;             // Metamask-Ethereum address of the Consumer 
    }
    // struct Txblocks {
    //     uint FTD; // blockfarmerToDistributor
    //     uint DTR; // blockDistributorToRetailer
    //     uint RTC; // blockRetailerToConsumer
    // }

    mapping (uint => Item) public items;
    mapping (address => Item[]) public wareHouseItems;
    // mapping (uint => Txblocks) itemsHistory;

    event RawMaterialSupplierSuppliesRM(uint _supplyChainId);
    event FactoryBuyRawMaterial(uint _supplyChainId);
    event FactorySellItemToDistributors(uint _supplyChainId);
    event DistributorSellToRetailer(uint _supplyChainId);
    event RetailerSellToCustomer(uint _supplyChainId);

    function rawMaterialSupplierSuppliesRM(uint _polyesterAmount, uint _cottonAmount, uint _woolAmount) public
        onlyRawMaterialSupplier()
        {
        uint currentId =supplyChainId.current();
        address[] memory Darray =new address[](10);
        uint[] memory Uarray =new uint[](10);
        Item memory item =Item({
                supplyChainId:currentId,
                itemState: defaultState,
                PolyesterAmount: _polyesterAmount,
                CottonAmount:_cottonAmount,
                WoolAmount:_woolAmount,
                totalUnits:0,
                RawMaterialSupplierID: msg.sender,
                warehouseID:address(0),
                factoryID:address(0),
                distributorID:Darray,
                distributorUnits:Uarray
            });
        items[currentId] =item;
        SupplyChainToken(supplyChainToken).mint(msg.sender,currentId,1);
        supplyChainId.increment();
        emit RawMaterialSupplierSuppliesRM(currentId);
    }

    function factoryBuyRawMaterial(uint _supplyChainId, address _warehouse) public onlyFactory() 
    {
        require(isWarehouse(_warehouse),"NOT A VALID WAREHOUSE ADDRESS ! PLEASE CONTACT ADMIN");
        Item memory item =items[_supplyChainId];
        address rawMaterialSupplier =item.RawMaterialSupplierID;

        item.factoryID =msg.sender;
        item.warehouseID=_warehouse;
        item.itemState=  State.factoryBuyRawMaterial;
        items[_supplyChainId] =item;
        
        wareHouseItems[_warehouse].push(item);
        SupplyChainToken(supplyChainToken).safeTransferFrom(rawMaterialSupplier,msg.sender,_supplyChainId,1,"0x00");
        emit FactoryBuyRawMaterial(_supplyChainId);
    }

    function factorySellItemToDistributors(
        uint _supplyChainId,
        uint _units, 
        address[] memory distributors,
        uint[] memory quantity 
        ) public onlyFactory(){
            require(_units>1);
            Item memory item =items[_supplyChainId];
            item.itemState =State.factorySellItemToDistributors;
            item.totalUnits =_units;
            for(uint i=0; i<distributors.length; i++){
                require(isDistributor(distributors[i]),"NOT A VALID DISTRIBUTOR ADDRESS ! PLEASE CONTACT ADMIN");
                item.distributorID[i] =distributors[i];
                item.distributorUnits[i] =quantity[i];
                SupplyChainToken(supplyChainToken).mint(distributors[i],_supplyChainId,quantity[i]);

                SupplyChainToken(supplyChainToken).safeTransferFrom(distributors[i],msg.sender,_supplyChainId,quantity[i],"0x00");
            }
            items[_supplyChainId] =item;
            // uint length =wareHouseItems[item.warehouseID].length ;
            // if (length >0){
            //     for(uint i=0; i<length; i++){
            //         if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
            //             break;
            //         }
            //     }
            // }   
    }

}