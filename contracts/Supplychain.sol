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
        factoryCompleteGarmentManufacturing
    }  

    enum ProductState
    {
        factoryCompleteGarmentManufacturing,
        factoryQCFinalItems
    }
    enum DistributorState
    {
        factorySellProductToDistributor,
        distributorReceivesProduct
    }

    enum RetailerState
    {
        distributorSellToRetailer,
        retailerReceivesProduct
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

    struct ProductBatch{
        uint productId;
        ProductState productState;
        uint totalUnits;
        uint leftUnits;
        uint totalUnitsAfterQC;
        string Description;
        address factory;
        uint timeStamp6;
        uint timeStamp7;
    }   

    struct DistributorDetail{
        DistributorState distributorState;
        address distributor;
        uint quantity;
        uint quantityLeft;
        uint timeStamp8;
        uint timeStamp9;
    }

    struct RetailerDetail{
        RetailerState retailerState;
        address retailer;
        address distributor;
        uint quantity;
        uint quantityLeft;
        uint timeStamp10;
        uint timeStamp11;
    }

    struct CustomerDetail{
        address distributor;    
        address retailer;
        address customer;
        uint quantity;
        uint timeStamp12;
    }


    mapping(uint=> FactoryDetail[]) public IdToFactory;
    mapping(uint=> DistributorDetail[]) public ProductIdToDistributor;
    mapping(uint=> RetailerDetail[]) public ProductIdToRetailer;
    mapping(uint=> CustomerDetail[]) public ProductIdToCustomer;

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

    function checkInDArray(address _target,DistributorDetail[] memory array) internal pure returns(bool){
        for(uint i=0;i <array.length; i++){
            if(array[i].distributor==_target) return true;
        }
        return false;
    }

    function checkInRArray(address _target,RetailerDetail[] memory array) internal pure returns(bool){
        for(uint i=0;i <array.length; i++){
            if(array[i].retailer==_target) return true;
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
             
        // require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial1>=_rawMaterials[0],"Raw material 1 exceeded");         
        // require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial2>=_rawMaterials[1],"Raw material 2 exceeded");         
        // require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial3>=_rawMaterials[2],"Raw material 3 exceeded");         
        // require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial4>=_rawMaterials[3],"Raw material 4 exceeded");         
        // require(RawMaterialSupplierRawMaterial[_supplyChainId].rawMaterial5>=_rawMaterials[4],"Raw material 5 exceeded");         

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
        // require(_updatedrawmaterials[0] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial1,"CANT BE MORE THEN THE ORIGINAL");
        // require(_updatedrawmaterials[1] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial2,"CANT BE MORE THEN THE ORIGINAL");
        // require(_updatedrawmaterials[2] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial3,"CANT BE MORE THEN THE ORIGINAL");
        // require(_updatedrawmaterials[3] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial4,"CANT BE MORE THEN THE ORIGINAL");
        // require(_updatedrawmaterials[4] <=FactoryRawMaterialsORIGIONAL[_supplyChainId][msg.sender].rawMaterial5,"CANT BE MORE THEN THE ORIGINAL");
        
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
            leftUnits:_totalUnits,
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
        product.leftUnits=_totalUnits;
        product.totalUnitsAfterQC=_totalUnits;
        product.timeStamp7=block.timestamp;
        Product[_productid] =product;   
    }


    function factorySellItemToDistributor(uint _productId, address distributor,uint quantity) public {
        DistributorDetail[] memory a =ProductIdToDistributor[_productId];
        require(!checkInDArray(distributor,a),"You can't send the same product batch twice to the same distributor");
         
        require(Product[_productId].leftUnits>=quantity,"Insufficient quantity for this product left");
        Product[_productId].leftUnits-=quantity;

        DistributorDetail memory d =DistributorDetail({
            distributorState: DistributorState.factorySellProductToDistributor,
            distributor:distributor,
            quantity :quantity,
            quantityLeft:quantity,
            timeStamp8:block.timestamp,
            timeStamp9:0
        });
        ProductIdToDistributor[_productId].push(d);
    }


    function distributorReceivesProductBatch(uint _productId) public {
        DistributorDetail[] memory d =ProductIdToDistributor[_productId];
        for(uint i=0; i<d.length; i++){
            if(d[i].distributor==msg.sender && d[i].distributorState== DistributorState.factorySellProductToDistributor ){
                d[i].distributorState =DistributorState.distributorReceivesProduct;
                d[i].timeStamp9 =block.timestamp;
                ProductIdToDistributor[_productId][i]=d[i];
                return;
            }
        }
    }

    function distributorSellsToRetailer(uint _productId, address _retailer,uint _quantity) public{   
        RetailerDetail[] memory a =ProductIdToRetailer[_productId];
        require(!checkInRArray(_retailer,a),"You can't send the same product batch twice to the same retailer");
        DistributorDetail[] memory d =ProductIdToDistributor[_productId];
        for(uint i=0; i<d.length; i++){
            if(d[i].distributor==msg.sender){
                require(d[i].quantityLeft>=_quantity,"Insufficient quantity for this product left");
                ProductIdToDistributor[_productId][i].quantityLeft-=_quantity;
                RetailerDetail memory r =RetailerDetail({
                    retailerState: RetailerState.distributorSellToRetailer,
                    retailer:_retailer,
                    distributor:msg.sender,
                    quantity:_quantity,
                    quantityLeft:_quantity,
                    timeStamp10:block.timestamp,
                    timeStamp11:0
                });
                ProductIdToRetailer[_productId].push(r);
                return;
            }
        }
    }


    function retailerReceivesProductBatch(uint _productId) public {
        RetailerDetail[] memory r =ProductIdToRetailer[_productId];
        for(uint i=0; i<r.length; i++){
            if(r[i].retailer==msg.sender && r[i].retailerState== RetailerState.distributorSellToRetailer ){
                r[i].retailerState =RetailerState.retailerReceivesProduct;
                r[i].timeStamp11 =block.timestamp;
                ProductIdToRetailer[_productId][i]=r[i];
                return;
            }
        }
    }


    function retailerSellToCustomer(uint _productId,address _customer, uint _quantity) public{
        RetailerDetail[] memory r =ProductIdToRetailer[_productId];
        for(uint i=0; i<r.length; i++){
            if(r[i].retailer==msg.sender){
                require(r[i].quantityLeft>=_quantity,"Insufficient quantity for this product left");
                ProductIdToRetailer[_productId][i].quantityLeft-=_quantity;
                CustomerDetail memory c =CustomerDetail({
                    distributor:r[i].distributor,
                    retailer:msg.sender,
                    customer:_customer,
                    quantity:_quantity,
                    timeStamp12:block.timestamp
                });
                ProductIdToCustomer[_productId].push(c);
                return;
            }
        }
    }


    function totalBatchs() public view returns(uint256){
        return supplyChainId.current();
    }

    function totalProductBatchs() public view returns(uint256){
        return productId.current();
    }

}