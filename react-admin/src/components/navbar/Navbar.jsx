import React, {useEffect,useState} from 'react';
import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react"; 
import { ethers } from 'ethers';
import { Link, useNavigate } from "react-router-dom"
import "./navbar.scss";
const Navbar = (props) =>{


	// USer name 
	// const username = localStorage.userName;
	// console.log("User name",username)



	let SupplyChainContractAddress = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0';
 
    const { dispatch,metaMask,supplyChainContract} = useContext(DarkModeContext);
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	// const [currentContractVal, setCurrentContractVal] = useState(null);
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [SCContract, setSCContract] = useState(supplyChainContract);
	

	useEffect(()=>{
		connectWalletHandler();
	},[]);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
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
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let supplyChaintempContract = new ethers.Contract(SupplyChainContractAddress, Supplychain_abi.abi, tempSigner);
		setSCContract(supplyChaintempContract);
		dispatch({ type: "updateSupplyChain",supplyChainContract:supplyChaintempContract })
	
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
          
		  <Link to="/admin/profile"  >
				<img
             	 src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              	alt=""
              	className="avatar"
            	/>
			</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
