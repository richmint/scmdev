import React, {useEffect,useState} from 'react';
import Warehouse_abi from '../../artifacts/contracts/Roles/Warehouse.sol/Warehouse.json';
import Factory_abi from '../../artifacts/contracts/Roles/Factory.sol/Factory.json';
import Rowmaterialsupplier_abi from '../../artifacts/contracts/Roles/RawMaterialSupplier.sol/RawMaterialSupplier.json';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { ethers } from 'ethers';
import "./navbar.scss";
const Navbar = (props) =>{
	let whContractAddress = '0x18926be76922dd5c9175288B79213655eD321337';
	let fContractAddress = '0x981CE5226b2FF8E71d54658Ab1Ad37D3Ef3CE468';
	let rmsContractAddress = '0x2bea95d430Ea1a6e8156E37b26f20F67F81f50C9';
 
    const { dispatch,metaMask,warehouseContract,factoryContract,rowmaterialContract } = useContext(DarkModeContext);
	// const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	// const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	// const [currentContractVal, setCurrentContractVal] = useState(null);
	// const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [whContract, setwhContract] = useState(warehouseContract);
	const [fContract, setfContract] = useState(factoryContract);
	const [rmsContract, setrmsContract] = useState(rowmaterialContract);

	useEffect(()=>{
		connectWalletHandler();
	},[]);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				// setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				// setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			// setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		dispatch({ type: "setMetask",data:newAccount })
		
		console.log('accountChangedHandler called ',newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		// setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let warehousetempContract = new ethers.Contract(whContractAddress, Warehouse_abi.abi, tempSigner);
		setwhContract(warehousetempContract);
		dispatch({ type: "updateWarehouse",warehouseContract:warehousetempContract })

		let factorytempContract = new ethers.Contract(fContractAddress, Factory_abi.abi, tempSigner);
		setfContract(factorytempContract);
		dispatch({ type: "updateFactory",factoryContract:factorytempContract })

		let rowmaterialtempContract = new ethers.Contract(rmsContractAddress, Rowmaterialsupplier_abi.abi, tempSigner);
		setrmsContract(rowmaterialtempContract);
		dispatch({ type: "updaterowmaterialsupplier",rowmaterialContract:rowmaterialtempContract })
			
	}
	
	
  const name= signer
 
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
	
			{/* <button onClick={()=>props.alert(name)} >Click Me</button> */}
          { <h3>Address: {defaultAccount}</h3>}
          <button onClick={connectWalletHandler}>Connect Metamask</button>
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
         
          <div className="item">
          
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
