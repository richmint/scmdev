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
        rawMaterialSupplierSuppliesRM, 
        factoryBuyRawMaterial, 
        factoryReceiveRawMaterials,
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
        State itemState;                // Product State as represented in the enum above

        uint totalUnits;
        string Description;
        
        address RawMaterialSupplierID;  // Metamask-Ethereum address of the RawMaterialSupplier
        address warehouseID;            // Metamask-Ethereum address of the warehouse
        address distributorId;          // Metamask-Ethereum address of the distributor
        address factoryID1;              // Metamask-Ethereum address of the factory1
        address factoryID2;              // Metamask-Ethereum address of the factory2
        address factoryID3;              // Metamask-Ethereum address of the factory3

    }

    struct RawMaterials{
        uint256 rawMaterialType;        
        uint rawMaterial1;    
        uint rawMaterial2;  
        uint rawMaterial3;
        uint rawMaterial4;
        uint rawMaterial5;
    }

    // struct cutomerInfoStruct{
    //     uint supplychainID;
    //     address retailer;
    //     uint quantity;
    // }
    // mapping(address =>uint[]) private customerSCIds;

    mapping (uint =>RawMaterials) public RawMaterialDetails;

    mapping (uint =>uint[]) public timeStamps;
    mapping (uint => Item) public items;

    mapping (address => Item[]) private wareHouseItems;
    mapping(address=>mapping(uint=>uint[])) public RawMaterialsBoughtByFactory;
    // mapping (uint => address[]) private retailerID;
    // mapping (uint => uint[]) private retailerUnits;
    // mapping (uint => uint[]) private retailerCounters;

    // mapping (address =>mapping (uint =>cutomerInfoStruct)) public customerInfo;


    function rawMaterialSupplierSuppliesRM(uint256 _rawMaterialType,uint256[] memory _rawMaterials) public{
        require(_rawMaterialType>=1 && _rawMaterialType<=3,"Invalid raw material type");
        uint currentId =supplyChainId.current();
        Item memory item =Item({  
                supplyChainId:currentId,  
                itemState: defaultState,
                totalUnits:0,
                Description:"",
                RawMaterialSupplierID: msg.sender,
                warehouseID:address(0),
                distributorId:address(0),
                factoryID1:address(0),
                factoryID2:address(0),
                factoryID3:address(0)
            }); 
        RawMaterials memory rawMaterial=RawMaterials({
            rawMaterialType :_rawMaterialType,
            rawMaterial1:_rawMaterials[0],
            rawMaterial2:_rawMaterials[1],
            rawMaterial3:_rawMaterials[2],
            rawMaterial4:_rawMaterials[3],
            rawMaterial5:_rawMaterials[4]
        });
        RawMaterialDetails[currentId]= rawMaterial;
        items[currentId] =item;
        timeStamps[currentId].push(block.timestamp);
        supplyChainId.increment();
    }

    function factoryBuyRawMaterial(uint256 _supplyChainId, uint[] memory _rawMaterials) public {
        
        Item memory item =items[_supplyChainId];               
        require(RawMaterialDetails[_supplyChainId].rawMaterial1>=_rawMaterials[0],"Raw material 1 exceeded");         
        require(RawMaterialDetails[_supplyChainId].rawMaterial2>=_rawMaterials[1],"Raw material 2 exceeded");         
        require(RawMaterialDetails[_supplyChainId].rawMaterial3>=_rawMaterials[2],"Raw material 3 exceeded");         
        require(RawMaterialDetails[_supplyChainId].rawMaterial4>=_rawMaterials[3],"Raw material 4 exceeded");         
        require(RawMaterialDetails[_supplyChainId].rawMaterial5>=_rawMaterials[4],"Raw material 5 exceeded");         
                 
        item.itemState=  State.factoryBuyRawMaterial;   

        RawMaterialDetails[_supplyChainId].rawMaterial1-=_rawMaterials[0];
        RawMaterialDetails[_supplyChainId].rawMaterial2-=_rawMaterials[1];
        RawMaterialDetails[_supplyChainId].rawMaterial3-=_rawMaterials[2];
        RawMaterialDetails[_supplyChainId].rawMaterial4-=_rawMaterials[3];
        RawMaterialDetails[_supplyChainId].rawMaterial5-=_rawMaterials[4]; 

        if(item.factoryID1 ==address(0)){
            item.factoryID1=msg.sender;
        }else if(item.factoryID2 ==address(0)){
            item.factoryID2=msg.sender;
        }else if(item.factoryID3 ==address(0)){
            item.factoryID3=msg.sender;
        }else{
            revert("Maximum of three factory can buy a batch");
        }
        items[_supplyChainId] =item;
        RawMaterialsBoughtByFactory[msg.sender][_supplyChainId]=_rawMaterials;
        timeStamps[_supplyChainId].push(block.timestamp);
    }

    function factoryReceiveRawMaterials(uint256 _supplyChainId,address _warehouse) public{
        Item memory item =items[_supplyChainId]; 
        item.warehouseID=_warehouse;                    
        item.itemState=  State.factoryReceiveRawMaterials;   
        items[_supplyChainId] =item;
        wareHouseItems[_warehouse].push(item);
        timeStamps[_supplyChainId].push(block.timestamp);
    }

    function factoryQCRawMaterials(uint _supplyChainId, uint256[] memory _updatedrawmaterials ) public {
        
        Item memory item =items[_supplyChainId];
        item.itemState =State.factoryQCRawMaterials;
        items[_supplyChainId] =item;
        require(RawMaterialsBoughtByFactory[msg.sender][_supplyChainId][0]>=_updatedrawmaterials[0],"Raw material 1 exceeded");         
        require(RawMaterialsBoughtByFactory[msg.sender][_supplyChainId][1]>=_updatedrawmaterials[1],"Raw material 2 exceeded");         
        require(RawMaterialsBoughtByFactory[msg.sender][_supplyChainId][2]>=_updatedrawmaterials[2],"Raw material 3 exceeded");         
        require(RawMaterialsBoughtByFactory[msg.sender][_supplyChainId][3]>=_updatedrawmaterials[3],"Raw material 4 exceeded");       
        require(RawMaterialsBoughtByFactory[msg.sender][_supplyChainId][4]>=_updatedrawmaterials[4],"Raw material 5 exceeded");    
        RawMaterialsBoughtByFactory[msg.sender][_supplyChainId]=_updatedrawmaterials;
        
        // uint length =wareHouseItems[item.warehouseID].length;
        // if (length >0){
        //     for(uint i=0; i<length; i++){
        //         if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
        //             wareHouseItems[item.warehouseID][i].PolyesterAmount =_polyesterAmount;
        //             wareHouseItems[item.warehouseID][i].CottonAmount =_cottonAmount;
        //             wareHouseItems[item.warehouseID][i].WoolAmount =_woolAmount;
        //             wareHouseItems[item.warehouseID][i].itemState =State.factoryQCRawMaterials;
        //         }
        //     }
        // }   
        timeStamps[_supplyChainId].push(block.timestamp);
    }

    // function factoryCompleteSpinningWaeving(uint _supplyChainId, uint _yarnAmount, string memory _yarnColor, string memory _yarnType) 
    // public 
    // // onlyFactory() 
    // {
    //     Item memory item =items[_supplyChainId];        
    //     OGDetails[_supplyChainId].YarnAmount =_yarnAmount;
    //     OGDetails[_supplyChainId].YarnColor=_yarnColor;
    //     OGDetails[_supplyChainId].YarnType=_yarnType;

    //     item.itemState=  State.factoryCompleteSpinningWaeving;
    //     items[_supplyChainId] =item;
    //     uint length =wareHouseItems[item.warehouseID].length;
    //     if (length >0){
    //         for(uint i=0; i<length; i++){
    //             if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
    //                 wareHouseItems[item.warehouseID][i].itemState =State.factoryCompleteSpinningWaeving;
    //             }
    //         }
    //     }   
    //     timeStamps[_supplyChainId].push(block.timestamp);
    // }

    // function factoryCompleteGarmentManufacturing(uint _supplyChainId, uint _totalUnits, string memory _description) public 
    // // onlyFactory() 
    // {
    //     require(_totalUnits>=1,"Units should be greater that 1");
    //     Item memory item =items[_supplyChainId];
    //     OGDetails[_supplyChainId].OGUnits =_totalUnits;
    //     item.Description=_description;

    //     item.itemState=  State.factoryCompleteGarmentManufacturing;
    //     items[_supplyChainId] =item;
    //     uint length =wareHouseItems[item.warehouseID].length;
    //     if (length >0){
    //         for(uint i=0; i<length; i++){
    //             if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
    //                 wareHouseItems[item.warehouseID][i].itemState =State.factoryCompleteGarmentManufacturing;
    //             }
    //         }
    //     } 
    //     timeStamps[_supplyChainId].push(block.timestamp);
    // }
        
    // function factoryQCFinalItems(
    //     uint _supplyChainId, 
    //     uint _totalUnits
    // ) public 
    // // onlyFactory() 
    // {
    //     // require(isWarehouse(_warehouse),"NOT A VALID WAREHOUSE ADDRESS ! PLEASE CONTACT ADMIN");
    //     Item memory item =items[_supplyChainId];

    //     item.totalUnits =_totalUnits;
    //     item.itemState=  State.factoryQCFinalItems;
    //     items[_supplyChainId] =item;
    //     uint length =wareHouseItems[item.warehouseID].length;
    //     if (length >0){
    //         for(uint i=0; i<length; i++){
    //             if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
    //                 wareHouseItems[item.warehouseID][i].itemState =State.factoryQCFinalItems;
    //                 wareHouseItems[item.warehouseID][i].totalUnits =_totalUnits;
    //             }
    //         }
    //     } 
        
    //     timeStamps[_supplyChainId].push(block.timestamp);
    // }


    // function factorySellItemToDistributors(
    //     uint _supplyChainId,
    //     address distributor
    //     ) public 
    //     // onlyFactory()
    //     {
    //         Item memory item =items[_supplyChainId];
    //         item.itemState =State.factorySellItemToDistributors;
    //         item.distributorId =distributor;

    //         // SupplyChainToken(supplyChainToken).safeTransferFrom(msg.sender,distributor,_supplyChainId,1,"0x00",0);
    //         items[_supplyChainId] =item;
            
    //         uint length =wareHouseItems[item.warehouseID].length;
    //         if (length >0){
    //             for(uint i=0; i<length; i++){
    //                 if(wareHouseItems[item.warehouseID][i].supplyChainId == _supplyChainId){
    //                     wareHouseItems[item.warehouseID][i].itemState =State.factorySellItemToDistributors;
    //                 }
    //             }
    //         }   
    //         timeStamps[_supplyChainId].push(block.timestamp);
    //         emit FactorySellItemToDistributors(_supplyChainId);
    // }


    // function distributorSellToRetailer(
    //     uint _supplyChainId,
    //     address[] memory retailers,
    //     uint[] memory quantity 
    // ) public 
    // // onlyDistributor()
    // {
    //         Item memory item =items[_supplyChainId];
    //         item.itemState =State.DistributorSellToRetailer;
    //         // uint units =item.totalUnits;
    //         // SupplyChainToken(supplyChainToken).mint(msg.sender,_supplyChainId,(units-1));
    //         items[_supplyChainId] =item;
    //         uint lastq=0;
    //         for(uint i=0; i<retailers.length; i++){
    //             // require(isRetailer(retailers[i]),"NOT A VALID RETAILER ADDRESS ! PLEASE CONTACT ADMIN");
    //             retailerID[_supplyChainId].push(retailers[i]);
    //             retailerUnits[_supplyChainId].push(quantity[i]); 
    //             retailerCounters[_supplyChainId].push(lastq);
    //             // SupplyChainToken(supplyChainToken).safeTransferFrom(msg.sender,retailers[i],_supplyChainId,quantity[i],"0x00",lastq);
    //             lastq +=quantity[i];
    //         }
    //         timeStamps[_supplyChainId].push(block.timestamp);
    //         emit DistributorSellToRetailer(_supplyChainId);
    // }

    // function customerBuyItem(
    //     uint _supplyChainId,
    //     address _retailer,
    //     uint _quantity 
    // ) public{
    //     uint length =retailerID[_supplyChainId].length;
    //     uint counter1;
    //     for(uint i=0; i<length; i++){
    //         if(retailerID[_supplyChainId][i]==_retailer){
    //             counter1 =i;
    //             break;
    //         }
    //     }       
    //     require(getRetailersUnits(_supplyChainId)[counter1]>=_quantity,"No More Items left");

    //     if(customerInfo[msg.sender][_supplyChainId].retailer ==address(0)){
    //         cutomerInfoStruct memory _cutomerInfoStruct =cutomerInfoStruct({
    //             supplychainID:_supplyChainId,
    //             retailer:_retailer,
    //             quantity:_quantity
    //         });
    //         customerInfo[msg.sender][_supplyChainId]=_cutomerInfoStruct;
    //         customerSCIds[msg.sender].push(_supplyChainId);
    //         retailerUnits[_supplyChainId][counter1]-=_quantity;
    //         retailerCounters[_supplyChainId][counter1]+=_quantity;
    //     }else{
    //         customerInfo[msg.sender][_supplyChainId].quantity +=_quantity;
    //         retailerUnits[_supplyChainId][counter1]-=_quantity;
    //         retailerCounters[_supplyChainId][counter1]+=_quantity;
    //     }
        
    // }

    function totalBatchs() public view returns(uint256){
        return supplyChainId.current();
    }
    
    function getWarehouseItems(address warehouse) public view returns (Item[] memory){
        return wareHouseItems[warehouse];
    }

    // function getRetailers(uint _supplychianId) public view returns(address[] memory){
    //     return retailerID[_supplychianId];
    // }

    // function getRetailersUnits(uint _supplychianId) public view returns(uint[] memory){
    //     return retailerUnits[_supplychianId];
    // }
    
    // function getRetailersCounters(uint _supplychianId) public view returns(uint[] memory){
    //     return retailerCounters[_supplychianId];
    // }

    // function getcustomerSCIds(address  _address) public view returns(uint[] memory){
    //     return customerSCIds[_address];
    // }
}