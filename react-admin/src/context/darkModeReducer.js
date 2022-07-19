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
    case "updateSupplyChain":{
      return {
        ...state,
        supplyChainContract: action.supplyChainContract,
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
    case "updateSupplychainToken":{
      return {
        ...state,
        supplyChainTokenContract: action.supplyChainTokenContract,
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
    default:
      return state;
  }
};

export default DarkModeReducer;
