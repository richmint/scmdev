import React, { useEffect, useState } from 'react';
import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
import Date_abi from '../../artifacts/contracts/Helper.sol/DateTime.json';
import SupplychainToken_abi from '../../artifacts/contracts/SupplyChainERC1155.sol/SupplyChainToken.json';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { ethers } from 'ethers';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "./navbar.scss";
const Navbar = (props) => {

	const userName = localStorage.userName;
	const userRole = localStorage.userRole;

	let supplyChainTokenAddress = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788';
	let supplyChainAddress = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e';
	let dateAddress = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0';

	const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownerSupplyChainAddress,dateContract } = useContext(DarkModeContext);
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [currentContractVal, setCurrentContractVal] = useState(null);
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [SChainContract, setSChainContract] = useState(supplyChainContract);
	const [CreatedDateContract, setCreatedDateContract] = useState(dateContract);
	const [SChainTokenContract, setSChainTokenContract] = useState(supplyChainTokenContract);
	const [OwnSupplyChainAddress, setOwnSupplyChainAddress] = useState(ownerSupplyChainAddress);

	useEffect(() => {
		connectWalletHandler();
	}, []);
	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts' })
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
		dispatch({ type: "setMetask", data: newAccount })

		setOwnSupplyChainAddress(newAccount);
		dispatch({ type: "updatOwnSupplyChainAddress", ownSupplyChainAddress: newAccount })

		console.log('accountChangedHandler called ', newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = async () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let supplychaintempContract = new ethers.Contract(supplyChainAddress, Supplychain_abi.abi, tempSigner);
		setSChainContract(supplychaintempContract);
		// console.log("supplychaintempContract",supplychaintempContract);
		dispatch({ type: "updateSupplychain", supplyChainContract: supplychaintempContract })
		// console.log(await supplychaintempContract.totalBatchs());
  
		let supplychaintokentempContract = new ethers.Contract(supplyChainTokenAddress, SupplychainToken_abi.abi, tempSigner);
		setSChainTokenContract(supplychaintokentempContract);
		dispatch({ type: "updateSupplychainToken", supplyChainTokenContract: supplychaintokentempContract })
		// console.log("supplychaintokentempContract",supplychaintokentempContract);

		let datetempContract = new ethers.Contract(dateAddress, Date_abi.abi, tempSigner);
		setCreatedDateContract(datetempContract);
		// console.log("datetempContract",datetempContract); 
		dispatch({ type: "updateDate", dateContract: datetempContract })
		// console.log(await datetempContract.totalBatchs());
		
	}
	return (
		<div className="navbar">
			<div className="wrapper">
				<div className="search">
					
				</div>
				<div className="items">
					<div className="item">

						{<h3>{userName}({userRole}){defaultAccount}	</h3>}
						<Button variant="outline-success" onClick={connectWalletHandler}>Connect Metamask</Button>
					</div>
					<div className="item">
						<DarkModeOutlinedIcon
							className="icon"
							onClick={() => dispatch({ type: "TOGGLE" })}
						/>
					</div>
					<div className="item">

					<Link to="/profile"  >
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
