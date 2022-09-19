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


contract Supplychain{
    using Counters for Counters.Counter;
    Counters.Counter private supplyChainId;
    Counters.Counter private productId;

    enum State
    {
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

    enum ProductState
    {
        factoryCompleteGarmentManufacturing,
        factoryQCFinalItems,
        factorySellItemToDistributors
    }

    State constant defaultState = State.factoryBuyRawMaterial;

    struct Item{
        uint supplyChainId;             // Counter for this batch items
        address RawMaterialSupplierID;  // Metamask-Ethereum address of the RawMaterialSupplier
        uint timeStamp0;
    }

    struct RawMaterials{
        uint256 rawMaterialType;  
        uint rawMaterial1;    
        uint rawMaterial2;  
        uint rawMaterial3;
        uint rawMaterial4;
        uint rawMaterial5;
        uint YarnAmount;
        string YarnColor;
        string YarnType;
    }

    struct ProductBatch{
        uint productId;
        ProductState productState;
        uint totalUnits;
        uint totalUnitsAfterQC;
        string Description;
        address factory;
        uint timeStamp6;
        uint timeStamp7;
    }   

    struct FactoryDetail{
        State itemState;                // Product State as represented in the enum above
        address factory;
        address warehouse;
        uint timeStamp1;
        uint timeStamp2;
        uint timeStamp3;
        uint timeStamp4;
        uint timeStamp5;
    }


    mapping(uint=> FactoryDetail[]) public IdToFactory;

    mapping(uint =>ProductBatch) public Product;
    mapping(uint =>uint[]) public ProductIds;

    mapping (uint =>RawMaterials) public RawMaterialDetails;
    mapping (uint =>RawMaterials) public RawMaterialSupplierRawMaterial;

    mapping (uint =>mapping (address=>RawMaterials)) public FactoryRawMaterialsORIGIONAL;
    mapping (uint =>mapping (address=>RawMaterials)) public FactoryRawMaterialsAferQC;
    mapping (uint => Item) public items;


    function checkInArray(address _target,FactoryDetail[] memory array) internal pure returns(bool){
        for(uint i=0;i <array.length; i++){
            if(array[i].factory==_target) return true;
        }
        return false;
    }


    function rawMaterialSupplierSuppliesRM(uint256 _rawMaterialType,uint256[] memory _rawMaterials) public{
        require(_rawMaterialType>=1 && _rawMaterialType<=3,"Invalid raw material type");
        uint currentId =supplyChainId.current();
        Item memory item =Item({  
                supplyChainId:currentId,  
                RawMaterialSupplierID: msg.sender,
                timeStamp0:block.timestamp
            }); 
        RawMaterials memory rawMaterial=RawMaterials({
            rawMaterialType :_rawMaterialType,
            rawMaterial1:_rawMaterials[0],
            rawMaterial2:_rawMaterials[1],
            rawMaterial3:_rawMaterials[2],
            rawMaterial4:_rawMaterials[3],
            rawMaterial5:_rawMaterials[4],
            YarnAmount:0,
            YarnColor:"",
            YarnType:""
        });
        RawMaterialDetails[currentId]= rawMaterial;
        RawMaterialSupplierRawMaterial[currentId]= rawMaterial;

        items[currentId] =item;
        supplyChainId.increment();
    }


    function factoryBuyRawMaterial(uint256 _supplyChainId, uint[] memory _rawMaterials) public {
        
        FactoryDetail[] memory a =IdToFactory[_supplyChainId];
        require(!checkInArray(msg.sender,a),"You can't buy same batch twice");
             
        require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial1>=_rawMaterials[0],"Raw material 1 exceeded");         
        require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial2>=_rawMaterials[1],"Raw material 2 exceeded");         
        require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial3>=_rawMaterials[2],"Raw material 3 exceeded");         
        require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial4>=_rawMaterials[3],"Raw material 4 exceeded");         
        require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial5>=_rawMaterials[4],"Raw material 5 exceeded");         

        RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial1-=_rawMaterials[0];
        RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial2-=_rawMaterials[1];
        RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial3-=_rawMaterials[2];
        RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial4-=_rawMaterials[3];
        RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial5-=_rawMaterials[4]; 

        FactoryDetail memory f =FactoryDetail({
            itemState: defaultState,
            factory:msg.sender,
            warehouse:address(0),
            timeStamp1:block.timestamp,
            timeStamp2:0,
            timeStamp3:0,
            timeStamp4:0,
            timeStamp5:0
        });
        IdToFactory[_supplyChainId].push(f);
        FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial1=_rawMaterials[0];
        FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial2=_rawMaterials[1];
        FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial3=_rawMaterials[2];
        FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial4=_rawMaterials[3];
        FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial5=_rawMaterials[4]; 

    }

    function factoryReceiveRawMaterials(uint256 _supplyChainId, address _warehouse) public{
        FactoryDetail[] memory fd =IdToFactory[_supplyChainId];
        for(uint i=0; i<fd.length; i++){
            if(fd[i].factory==msg.sender && fd[i].itemState== State.factoryBuyRawMaterial ){
                fd[i].warehouse =_warehouse;
                fd[i].itemState =State.factoryReceiveRawMaterials;
                fd[i].timeStamp2 =block.timestamp;
                IdToFactory[_supplyChainId][i]=fd[i];
                return;
            }
        }
    }


    function factoryQCRawMaterials(uint _supplyChainId, uint256[] memory _updatedrawmaterials ) public {
        FactoryDetail[] memory fd =IdToFactory[_supplyChainId];
        for(uint i=0; i<fd.length; i++){
            if(fd[i].factory==msg.sender && fd[i].itemState== State.factoryReceiveRawMaterials ){
                fd[i].itemState =State.factoryQCRawMaterials;
                fd[i].timeStamp3 =block.timestamp;
                IdToFactory[_supplyChainId][i]=fd[i];
                break;
            }
        }
        require(_updatedrawmaterials[0] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial1,"CANT BE MORE THEN THE ORIGINAL");
        require(_updatedrawmaterials[1] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial2,"CANT BE MORE THEN THE ORIGINAL");
        require(_updatedrawmaterials[2] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial3,"CANT BE MORE THEN THE ORIGINAL");
        require(_updatedrawmaterials[3] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial4,"CANT BE MORE THEN THE ORIGINAL");
        require(_updatedrawmaterials[4] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial5,"CANT BE MORE THEN THE ORIGINAL");
        
        FactoryRawMaterialsAferQC[_supplyChainId][msg.sender].rawMaterial1= _updatedrawmaterials[0];
        FactoryRawMaterialsAferQC[_supplyChainId][msg.sender].rawMaterial2= _updatedrawmaterials[1];
        FactoryRawMaterialsAferQC[_supplyChainId][msg.sender].rawMaterial3= _updatedrawmaterials[2];
        FactoryRawMaterialsAferQC[_supplyChainId][msg.sender].rawMaterial4= _updatedrawmaterials[3];
        FactoryRawMaterialsAferQC[_supplyChainId][msg.sender].rawMaterial5= _updatedrawmaterials[4];
    }


    function factoryCompleteSpinningWaeving(uint _supplyChainId, uint _yarnAmount, string memory _yarnColor, string memory _yarnType) public {
        FactoryDetail[] memory fd =IdToFactory[_supplyChainId];
        for(uint i=0; i<fd.length; i++){
            if(fd[i].factory==msg.sender && fd[i].itemState== State.factoryQCRawMaterials ){
                fd[i].itemState =State.factoryCompleteSpinningWaeving;
                fd[i].timeStamp4 =block.timestamp;
                IdToFactory[_supplyChainId][i]=fd[i];
                break;
            }
        }
        FactoryRawMaterialsAferQC[_supplyChainId][msg.sender].YarnAmount= _yarnAmount;
        FactoryRawMaterialsAferQC[_supplyChainId][msg.sender].YarnColor= _yarnColor;
        FactoryRawMaterialsAferQC[_supplyChainId][msg.sender].YarnType= _yarnType;
    }


    function factoryCompleteGarmentManufacturing(uint[] memory _supplyChainIds, uint _totalUnits, string memory _description) public {
        require(_totalUnits>=1,"Units should be greater that 1");
        
        for(uint i=0;i<_supplyChainIds.length; i++){
            FactoryDetail[] memory fd =IdToFactory[_supplyChainIds[i]];
            for(uint j=0; i<fd.length; i++){
                if(fd[j].factory==msg.sender && fd[j].itemState== State.factoryCompleteSpinningWaeving ){
                    fd[j].itemState =State.factoryCompleteGarmentManufacturing;
                    IdToFactory[_supplyChainIds[i]][j]=fd[j];
                    break;
                }
            }
        }
        uint currentId =productId.current();
        Product[currentId]=ProductBatch({
            productId:currentId,
            productState:ProductState.factoryCompleteGarmentManufacturing,
            totalUnits:_totalUnits,
            totalUnitsAfterQC:0,
            Description:_description,
            factory:msg.sender,
            timeStamp6:block.timestamp,
            timeStamp7:0
        }); 
        ProductIds[currentId]=_supplyChainIds;
        productId.increment();
    }
        

    function factoryQCFinalItems(uint _productid, uint _totalUnits ) public {

        ProductBatch memory product =Product[_productid];
        product.productState=ProductState.factoryQCFinalItems;
        product.totalUnitsAfterQC=_totalUnits;
        product.timeStamp7=block.timestamp;
        Product[_productid] =product;   

    }


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

    function totalProductBatchs() public view returns(uint256){
        return productId.current();
    }

    // function totalProductLength(uint _productId) public view returns(uint256[] memory){
    //     return ProductIds[_productId];
    // }
    
    // function getWarehouseItems(address warehouse) public view returns (Item[] memory){
    //     return wareHouseItems[warehouse];
    // }

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