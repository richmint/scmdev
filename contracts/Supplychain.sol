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
    address supplyChainToken;
    Counters.Counter private supplyChainId;

    // constructor(address _supplychainToken) RawMaterialSupplier() Warehouse() Factory() Distributor() Retailer() Customer(){
    constructor(address _supplychainToken) {
        supplyChainToken =_supplychainToken;
    }

    enum State
    {
        rawMaterialSupplierSuppliesRM, //  1 July 
        factoryBuyRawMaterial, //  4 july 
              
        factoryCompleteSpinningWaeving,
        factoryCompleteGarmentManufacturing,
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
    struct Yarn{
        uint YarnAmount;     
        string YarnColor;   
        string YarnType;
    }

    mapping (uint =>Yarn) public YarnDetails;

    mapping (uint =>uint[]) public timeStamps;
    mapping (uint => Item) public items;

    mapping (address => Item[]) private wareHouseItems;

    // mapping (uint => address[]) private distributorID;
    // mapping (uint => uint[]) private distributorUnits;
    // mapping (uint => uint[]) private distributorCounters;

    mapping (uint => address[]) private retailerID;
    mapping (uint => uint[]) private retailerUnits;
    mapping (uint => uint[]) private retailerCounters;

    mapping (uint => address[]) private customerId;
    mapping (uint => uint[]) private customerUnits;
    mapping (uint => uint[]) private customerCounters;




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
                PolyesterAmount: _polyesterAmount,
                CottonAmount:_cottonAmount,
                WoolAmount:_woolAmount,
                totalUnits:0,
                Description:"",
                RawMaterialSupplierID: msg.sender,
                warehouseID:address(0),
                factoryID:address(0),
                distributorId:address(0)
            });
        items[currentId] =item;
        SupplyChainToken(supplyChainToken).mint(msg.sender,currentId,1);
        supplyChainId.increment();
        timeStamps[currentId].push(block.timestamp);
        emit RawMaterialSupplierSuppliesRM(currentId);
    }

    function factoryBuyRawMaterial(
        uint _supplyChainId, 
        address _warehouse,
        uint _polysteramount,
        uint _cottonamount,
        uint _woolamount
    ) public 
    // onlyFactory() 
    {
        // require(isWarehouse(_warehouse),"NOT A VALID WAREHOUSE ADDRESS ! PLEASE CONTACT ADMIN");
        Item memory item =items[_supplyChainId];
        address rawMaterialSupplier =item.RawMaterialSupplierID;

        item.factoryID =msg.sender;
        item.warehouseID=_warehouse;
        item.PolyesterAmount=_polysteramount;
        item.CottonAmount=_cottonamount;
        item.WoolAmount=_woolamount;
        item.itemState=  State.factoryBuyRawMaterial;
        items[_supplyChainId] =item;
        
        wareHouseItems[_warehouse].push(item);
        SupplyChainToken(supplyChainToken).safeTransferFrom(rawMaterialSupplier,msg.sender,_supplyChainId,1,"0x00",0);
        timeStamps[_supplyChainId].push(block.timestamp);
        emit FactoryBuyRawMaterial(_supplyChainId);
    }

    function factoryCompleteSpinningWaeving(uint _supplyChainId, uint _yarnAmount, string memory _yarnColor, string memory _yarnType) 
    public 
    // onlyFactory() 
    {
        Item memory item =items[_supplyChainId];        
        YarnDetails[_supplyChainId].YarnAmount =_yarnAmount;
        YarnDetails[_supplyChainId].YarnColor=_yarnColor;
        YarnDetails[_supplyChainId].YarnType=_yarnType;

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
        item.totalUnits =_totalUnits;
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

    function factorySellItemToDistributors(
        uint _supplyChainId,
        address distributor
        ) public 
        // onlyFactory()
        {
            Item memory item =items[_supplyChainId];
            item.itemState =State.factorySellItemToDistributors;
            item.distributorId =distributor;

            SupplyChainToken(supplyChainToken).safeTransferFrom(msg.sender,distributor,_supplyChainId,1,"0x00",0);
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
            uint units =item.totalUnits;
            SupplyChainToken(supplyChainToken).mint(msg.sender,_supplyChainId,(units-1));
            items[_supplyChainId] =item;
            uint lastq=0;
            for(uint i=0; i<retailers.length; i++){
                // require(isRetailer(retailers[i]),"NOT A VALID RETAILER ADDRESS ! PLEASE CONTACT ADMIN");
                retailerID[_supplyChainId].push(retailers[i]);
                retailerUnits[_supplyChainId].push(quantity[i]); 
                retailerCounters[_supplyChainId].push(lastq);
                SupplyChainToken(supplyChainToken).safeTransferFrom(msg.sender,retailers[i],_supplyChainId,quantity[i],"0x00",lastq);
                lastq +=quantity[i];
            }
            timeStamps[_supplyChainId].push(block.timestamp);
            emit DistributorSellToRetailer(_supplyChainId);
    }

    function customerBuyItem(
        uint _supplyChainId,
        address retailer,
        uint quantity 
    ) public{
        uint length =retailerID[_supplyChainId].length;
        uint counter1;
        uint counter2;
        for(uint i=0; i<length; i++){
            if(retailerID[_supplyChainId][i]==retailer){
                counter1 =i;
                break;
            }
        }       
        require(getRetailersUnits(_supplyChainId)[counter1]>=quantity,"No More Items left");
                                                
        length=customerId[_supplyChainId].length;
        for(uint i=0; i<length; i++){
            if(customerId[_supplyChainId][i]==msg.sender){
                counter2 =i;
                break;
            }   
        }   
        if(counter2==0){
            customerId[_supplyChainId].push(msg.sender);
            customerUnits[_supplyChainId].push(quantity); 
            customerCounters[_supplyChainId].push(retailerCounters[_supplyChainId][counter1]);
            SupplyChainToken(supplyChainToken).safeTransferFrom(retailer,msg.sender,_supplyChainId,quantity,"0x00",retailerCounters[_supplyChainId][counter1]);
        }else{  
            customerUnits[_supplyChainId][counter2]=quantity; 
            customerCounters[_supplyChainId][counter2]=retailerCounters[_supplyChainId][counter1];
            SupplyChainToken(supplyChainToken).safeTransferFrom(retailer,msg.sender,_supplyChainId,quantity,"0x00",retailerCounters[_supplyChainId][counter1]);
        }       

        retailerUnits[_supplyChainId][counter1]-=quantity;
        retailerCounters[_supplyChainId][counter1]+=quantity;
        
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
}