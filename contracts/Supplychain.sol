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

// contract Supplychain is RawMaterialSupplier,Warehouse, Factory, Distributor, Retailer, Customer{
contract Supplychain{
    using Counters for Counters.Counter;
    // address supplyChainToken;
    Counters.Counter private supplyChainId;

    // constructor(address _supplychainToken) RawMaterialSupplier() Warehouse() Factory() Distributor() Retailer() Customer(){
    // constructor(address _supplychainToken) {
    //     supplyChainToken =_supplychainToken;
    // }

    enum State
    {
        rawMaterialSupplierSuppliesRM, //  1 July 
        factoryBuyRawMaterial, //  4 july 
        factoryQCRawMaterials,
        factoryCompleteSpinningWaeving,
        factoryCompleteGarmentManufacturing,
        factoryQCFinalItems,
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
        string Description;
        
        address RawMaterialSupplierID;  // Metamask-Ethereum address of the RawMaterialSupplier
        address warehouseID;            // Metamask-Ethereum address of the warehouse
        address factoryID;              // Metamask-Ethereum address of the factory
        address distributorId;          // Metamask-Ethereum address of the distributor
    }

    struct OG{
        uint YarnAmount;     
        string YarnColor;   
        string YarnType;
        uint OGPolyesterAmount;     
        uint OGCottonAmount;   
        uint OGWoolAmount;
        uint OGUnits;
    }

    struct cutomerInfoStruct{
        uint supplychainID;
        address retailer;
        uint quantity;
    }
    mapping(address =>uint[]) private customerSCIds;

    mapping (uint =>OG) public OGDetails;

    mapping (uint =>uint[]) public timeStamps;
    mapping (uint => Item) public items;

    mapping (address => Item[]) private wareHouseItems;

    mapping (uint => address[]) private retailerID;
    mapping (uint => uint[]) private retailerUnits;
    mapping (uint => uint[]) private retailerCounters;

    mapping (address =>mapping (uint =>cutomerInfoStruct)) public customerInfo;


    event RawMaterialSupplierSuppliesRM(uint _supplyChainId);
    event FactoryBuyRawMaterial(uint _supplyChainId);
    event FactorySellItemToDistributors(uint _supplyChainId);
    event DistributorSellToRetailer(uint _supplyChainId);
    event RetailerSellToCustomer(uint _supplyChainId);

    function rawMaterialSupplierSuppliesRM(uint _polyesterAmount, uint _cottonAmount, uint _woolAmount) public
        // onlyRawMaterialSupplier()
        {
        uint currentId =supplyChainId.current();
        Item memory item =Item({  
                supplyChainId:currentId,  
                itemState: defaultState,   
                PolyesterAmount: 0,
                CottonAmount:0,
                WoolAmount:0,
                totalUnits:0,
                Description:"",
                RawMaterialSupplierID: msg.sender,
                warehouseID:address(0),
                factoryID:address(0),
                distributorId:address(0)
            });
        OGDetails[currentId].OGPolyesterAmount =_polyesterAmount;
        OGDetails[currentId].OGCottonAmount=_cottonAmount;
        OGDetails[currentId].OGWoolAmount=_woolAmount;
        items[currentId] =item;
        // SupplyChainToken(supplyChainToken).mint(msg.sender,currentId,1);
        timeStamps[currentId].push(block.timestamp);
        supplyChainId.increment();
        emit RawMaterialSupplierSuppliesRM(currentId);
    }

    function factoryBuyRawMaterial(
        uint _supplyChainId, 
        address _warehouse
    ) public 
    // onlyFactory() 
    {
        // require(isWarehouse(_warehouse),"NOT A VALID WAREHOUSE ADDRESS ! PLEASE CONTACT ADMIN");
        Item memory item =items[_supplyChainId];
        // address rawMaterialSupplier =item.RawMaterialSupplierID;

        item.factoryID =msg.sender;
        item.warehouseID=_warehouse;
        item.itemState=  State.factoryBuyRawMaterial;
        items[_supplyChainId] =item;
        
        wareHouseItems[_warehouse].push(item);
        // SupplyChainToken(supplyChainToken).safeTransferFrom(rawMaterialSupplier,msg.sender,_supplyChainId,1,"0x00",0);
        timeStamps[_supplyChainId].push(block.timestamp);
        emit FactoryBuyRawMaterial(_supplyChainId);
    }

    function factoryQCRawMaterials(
        uint _supplyChainId, 
        uint _polyesterAmount,
        uint _cottonAmount, 
        uint _woolAmount
    ) public 
    // onlyFactory() 
    {
        // require(isWarehouse(_warehouse),"NOT A VALID WAREHOUSE ADDRESS ! PLEASE CONTACT ADMIN");
        Item memory item =items[_supplyChainId];

        item.itemState=  State.factoryQCRawMaterials;
        item.PolyesterAmount =_polyesterAmount;
        item.CottonAmount=_cottonAmount;
        item.WoolAmount=  _woolAmount;
        items[_supplyChainId] =item;
        
        uint length =wareHouseItems[item.warehouseID].length;
        if (length >0){
            for(uint i=0; i<length; i++){
                if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
                    wareHouseItems[item.warehouseID][i].PolyesterAmount =_polyesterAmount;
                    wareHouseItems[item.warehouseID][i].CottonAmount =_cottonAmount;
                    wareHouseItems[item.warehouseID][i].WoolAmount =_woolAmount;
                    wareHouseItems[item.warehouseID][i].itemState =State.factoryQCRawMaterials;
                }
            }
        }   
        timeStamps[_supplyChainId].push(block.timestamp);
    }

    function factoryCompleteSpinningWaeving(uint _supplyChainId, uint _yarnAmount, string memory _yarnColor, string memory _yarnType) 
    public 
    // onlyFactory() 
    {
        Item memory item =items[_supplyChainId];        
        OGDetails[_supplyChainId].YarnAmount =_yarnAmount;
        OGDetails[_supplyChainId].YarnColor=_yarnColor;
        OGDetails[_supplyChainId].YarnType=_yarnType;

        item.itemState=  State.factoryCompleteSpinningWaeving;
        items[_supplyChainId] =item;
        uint length =wareHouseItems[item.warehouseID].length;
        if (length >0){
            for(uint i=0; i<length; i++){
                if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
                    wareHouseItems[item.warehouseID][i].itemState =State.factoryCompleteSpinningWaeving;
                }
            }
        }   
        timeStamps[_supplyChainId].push(block.timestamp);
    }

    function factoryCompleteGarmentManufacturing(uint _supplyChainId, uint _totalUnits, string memory _description) public 
    // onlyFactory() 
    {
        require(_totalUnits>=1,"Units should be greater that 1");
        Item memory item =items[_supplyChainId];
        OGDetails[_supplyChainId].OGUnits =_totalUnits;
        item.Description=_description;

        item.itemState=  State.factoryCompleteGarmentManufacturing;
        items[_supplyChainId] =item;
        uint length =wareHouseItems[item.warehouseID].length;
        if (length >0){
            for(uint i=0; i<length; i++){
                if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
                    wareHouseItems[item.warehouseID][i].itemState =State.factoryCompleteGarmentManufacturing;
                }
            }
        } 
        timeStamps[_supplyChainId].push(block.timestamp);
    }
        
    function factoryQCFinalItems(
        uint _supplyChainId, 
        uint _totalUnits
    ) public 
    // onlyFactory() 
    {
        // require(isWarehouse(_warehouse),"NOT A VALID WAREHOUSE ADDRESS ! PLEASE CONTACT ADMIN");
        Item memory item =items[_supplyChainId];

        item.totalUnits =_totalUnits;
        item.itemState=  State.factoryQCFinalItems;
        items[_supplyChainId] =item;
        uint length =wareHouseItems[item.warehouseID].length;
        if (length >0){
            for(uint i=0; i<length; i++){
                if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
                    wareHouseItems[item.warehouseID][i].itemState =State.factoryQCFinalItems;
                    wareHouseItems[item.warehouseID][i].totalUnits =_totalUnits;
                }
            }
        } 
        
        timeStamps[_supplyChainId].push(block.timestamp);
    }


    function factorySellItemToDistributors(
        uint _supplyChainId,
        address distributor
        ) public 
        // onlyFactory()
        {
            Item memory item =items[_supplyChainId];
            item.itemState =State.factorySellItemToDistributors;
            item.distributorId =distributor;

            // SupplyChainToken(supplyChainToken).safeTransferFrom(msg.sender,distributor,_supplyChainId,1,"0x00",0);
            items[_supplyChainId] =item;
            
            uint length =wareHouseItems[item.warehouseID].length;
            if (length >0){
                for(uint i=0; i<length; i++){
                    if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
                        wareHouseItems[item.warehouseID][i].itemState =State.factorySellItemToDistributors;
                    }
                }
            }   
            timeStamps[_supplyChainId].push(block.timestamp);
            emit FactorySellItemToDistributors(_supplyChainId);
    }


    function distributorSellToRetailer(
        uint _supplyChainId,
        address[] memory retailers,
        uint[] memory quantity 
    ) public 
    // onlyDistributor()
    {
            Item memory item =items[_supplyChainId];
            item.itemState =State.DistributorSellToRetailer;
            // uint units =item.totalUnits;
            // SupplyChainToken(supplyChainToken).mint(msg.sender,_supplyChainId,(units-1));
            items[_supplyChainId] =item;
            uint lastq=0;
            for(uint i=0; i<retailers.length; i++){
                // require(isRetailer(retailers[i]),"NOT A VALID RETAILER ADDRESS ! PLEASE CONTACT ADMIN");
                retailerID[_supplyChainId].push(retailers[i]);
                retailerUnits[_supplyChainId].push(quantity[i]); 
                retailerCounters[_supplyChainId].push(lastq);
                // SupplyChainToken(supplyChainToken).safeTransferFrom(msg.sender,retailers[i],_supplyChainId,quantity[i],"0x00",lastq);
                lastq +=quantity[i];
            }
            timeStamps[_supplyChainId].push(block.timestamp);
            emit DistributorSellToRetailer(_supplyChainId);
    }

    function customerBuyItem(
        uint _supplyChainId,
        address _retailer,
        uint _quantity 
    ) public{
        uint length =retailerID[_supplyChainId].length;
        uint counter1;
        for(uint i=0; i<length; i++){
            if(retailerID[_supplyChainId][i]==_retailer){
                counter1 =i;
                break;
            }
        }       
        require(getRetailersUnits(_supplyChainId)[counter1]>=_quantity,"No More Items left");

        if(customerInfo[msg.sender][_supplyChainId].retailer ==address(0)){
            cutomerInfoStruct memory _cutomerInfoStruct =cutomerInfoStruct({
                supplychainID:_supplyChainId,
                retailer:_retailer,
                quantity:_quantity
            });
            customerInfo[msg.sender][_supplyChainId]=_cutomerInfoStruct;
            customerSCIds[msg.sender].push(_supplyChainId);
            retailerUnits[_supplyChainId][counter1]-=_quantity;
            retailerCounters[_supplyChainId][counter1]+=_quantity;
        }else{
            customerInfo[msg.sender][_supplyChainId].quantity +=_quantity;
            retailerUnits[_supplyChainId][counter1]-=_quantity;
            retailerCounters[_supplyChainId][counter1]+=_quantity;
        }
        
    }

    function totalBatchs() public view returns(uint256){
        return supplyChainId.current();
    }
    
    function getWarehouseItems(address warehouse) public view returns (Item[] memory){
        return wareHouseItems[warehouse];
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

    function getcustomerSCIds(address  _address) public view returns(uint[] memory){
        return customerSCIds[_address];
    }
}