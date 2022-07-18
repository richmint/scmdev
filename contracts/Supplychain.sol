// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
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
import "hardhat/console.sol";

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
        // address[] distributorID;          // Metamask-Ethereum address of the Distributor
        // uint[] distributorUnits;
        // address retailerID;             // Metamask-Ethereum address of the Retailer
        // address consumerID;             // Metamask-Ethereum address of the Consumer 
    }
    // struct distributorInfo{
    //     address[] distributorID;
    //     uint[] distributorUnits;
    // }

    mapping (uint => Item) public items;
    mapping (address => Item[]) private wareHouseItems;

    mapping (uint => address[]) private distributorID;
    mapping (uint => uint[]) private distributorUnits;
    mapping (uint => uint[]) private distributorCounters;

    mapping (uint => address[]) private retailerID;
    mapping (uint => uint[]) private retailerUnits;
    mapping (uint => uint[]) private retailerCounters;


    event RawMaterialSupplierSuppliesRM(uint _supplyChainId);
    event FactoryBuyRawMaterial(uint _supplyChainId);
    event FactorySellItemToDistributors(uint _supplyChainId);
    event DistributorSellToRetailer(uint _supplyChainId);
    event RetailerSellToCustomer(uint _supplyChainId);
    event valueeeeeeee(uint a,uint b);

    function rawMaterialSupplierSuppliesRM(uint _polyesterAmount, uint _cottonAmount, uint _woolAmount) public
        onlyRawMaterialSupplier()
        {
        uint currentId =supplyChainId.current();
        // address[] memory Darray =new address[](10);
        // uint[] memory Uarray =new uint[](10);
        Item memory item =Item({  
                supplyChainId:currentId,  
                itemState: defaultState,   
                PolyesterAmount: _polyesterAmount,
                CottonAmount:_cottonAmount,
                WoolAmount:_woolAmount,
                totalUnits:0,
                RawMaterialSupplierID: msg.sender,
                warehouseID:address(0),
                factoryID:address(0)
                // distributorID:Darray,
                // distributorUnits:Uarray
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
        SupplyChainToken(supplyChainToken).safeTransferFrom(rawMaterialSupplier,msg.sender,_supplyChainId,1,"0x00",0);
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

            SupplyChainToken(supplyChainToken).mint(msg.sender,_supplyChainId,_units-1);
            uint lastq=0;
            for(uint i=0; i<distributors.length; i++){
                require(isDistributor(distributors[i]),"NOT A VALID DISTRIBUTOR ADDRESS ! PLEASE CONTACT ADMIN");
                distributorID[_supplyChainId].push(distributors[i]);
                distributorUnits[_supplyChainId].push(quantity[i]); 
                distributorCounters[_supplyChainId].push(lastq);
                SupplyChainToken(supplyChainToken).safeTransferFrom(msg.sender,distributors[i],_supplyChainId,quantity[i],"0x00",lastq);
                lastq +=quantity[i];
            }
            items[_supplyChainId] =item;

            uint length =wareHouseItems[item.warehouseID].length ;
            if (length >0){
                for(uint i=0; i<length; i++){
                    if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
                        wareHouseItems[item.warehouseID][i].itemState =State.factorySellItemToDistributors;
                    }
                }
            }   
            emit FactorySellItemToDistributors(_supplyChainId);
    }
    function distributorSellToRetailer(
        uint _supplyChainId
        // address[] memory retailers,
        // uint[] memory quantity 
    ) public onlyDistributor(){
            uint units;
            uint counter;  
            address[] memory distributors =  getDistributors(_supplyChainId);  
            for(uint k=0; k<distributors.length; k++){   
                if(distributors[k]!=address(0) && distributors[k]==msg.sender){ 
                    units = getDistributorUnits(_supplyChainId)[k];  
                    counter = getDistributorCounters(_supplyChainId)[k]; 
                    delete distributorID[_supplyChainId][k];  
                    delete distributorUnits[_supplyChainId][k];  
                    delete distributorCounters[_supplyChainId][k];  
                    break;  
                }  
            } 
            // emit valueeeeeeee(units,counter);
            
            // require(units>0 ,"DISTRIBUTOR INTERNAL ERROR");
            // uint lastq=counter;
            // for(uint i=0; i<retailers.length; i++){
            //     require(isRetailer(retailers[i]),"NOT A VALID RETAILER ADDRESS ! PLEASE CONTACT ADMIN");
            //     retailerID[_supplyChainId].push(retailers[i]);
            //     retailerUnits[_supplyChainId].push(quantity[i]); 
            //     retailerCounters[_supplyChainId].push(lastq);
            //     SupplyChainToken(supplyChainToken).safeTransferFrom(msg.sender,retailers[i],_supplyChainId,quantity[i],"0x00",lastq);
            //     lastq +=quantity[i];
            // }
            emit DistributorSellToRetailer(_supplyChainId);
    }

    function totalBatchs() public view returns(uint256){
        return supplyChainId.current();
    }
    
    function getWarehouseItems(address warehouse) public view returns (Item[] memory){
        return wareHouseItems[warehouse];
    }
    
    function getDistributors(uint _supplychianId) public view returns(address[] memory){
        return distributorID[_supplychianId];
    }

    function getDistributorUnits(uint _supplychianId) public view returns(uint[] memory){
        return distributorUnits[_supplychianId];
    }
    
    function getDistributorCounters(uint _supplychianId) public view returns(uint[] memory){
        return distributorCounters[_supplychianId];
    }

    function getRetailers(uint _supplychianId) public view returns(address[] memory){
        return retailerID[_supplychianId];
    }

    function getRetailersUnits(uint _supplychianId) public view returns(uint[] memory){
        return retailerUnits[_supplychianId];
    }
    
    function getRetailersCounters(uint _supplychianId) public view returns(uint[] memory){
        return retailerCounters[_supplychianId];
    }
}