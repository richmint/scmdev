const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT": {
      return {
        ...state,
        darkMode: false,
      };
    }
    case "DARK": {
      return {
        ...state,
        darkMode: true,
      };
    }
    case "TOGGLE": {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    }
    case "setMetask":{
      return {
        ...state,
        metaMask: action.data,
      };
    }
    case "updateWarehouse":{
      return {
        ...state,
        warehouseContract: action.warehouseContract,
      };
    }
    case "updateFactory":{
      return {
        ...state,
        factoryContract: action.factoryContract,
      };
    }
    case "updaterowmaterialsupplier":{
      return {
        ...state,
        rowmaterialContract: action.rowmaterialContract,
      };
    }
    case "updateSupplychain":{
      return {
        ...state,
        supplyChainContract: action.supplyChainContract,
      };
    }
    case "updateApproveToken":{
      return {
        ...state,
        approveTokenContract: action.approveTokenContract,
      };
    }
    case "updatOwnSupplyChainAddress":{
      return {
        ...state,
        ownSupplyChainAddress: action.ownSupplyChainAddress,
      };
    }
    case "updateDate":{
      return {
        ...state,
        dateContract: action.dateContract,
      };
    } 
    default:
      return state;
  }
};

export default DarkModeReducer;
