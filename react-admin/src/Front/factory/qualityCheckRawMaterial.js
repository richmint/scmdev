import React, { useEffect, useState, useContext,useMemo } from 'react';
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { BuyRawMaterialSchema } from '../../Validations/Schema';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QualityCheckRawMaterail = () =>{

  const notify = () => toast("Wow so easy!");
  //const BuyRawMaterial = async (event) => {
const[wareHouseMaterialList,setwareHouseMaterialList] = useState();
let distributeruserrec = '';
  let data = useLocation();
  let materialtype = data.state.materialType;

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, ownSupplyChainAddress } = useContext(DarkModeContext);
 
  useEffect (() =>{
    getWarehouseList()
  },[])
  const listItems = [];
  function getWarehouseList(){
    fetch("http://192.168.1.101:5150/warehouse")
         .then(result=>result.json())
         .then(data => {
          if(data){
            setwareHouseMaterialList(data)
          }
        })
      }
      const SelectList = (props) =>{
        const data = props.val;
        return(
          <option value={data.hashAddress}>{data.name}</option>
        )
      }

    const ConfirmShow = (props) =>{

      const  BuyCotton = () =>{ 

        const qualityCheckCottonMaterialHandler = async (event) => {
          const tx = supplyChainContract.factoryQCRawMaterials(data.state.id, [event.cottonWeight, event.fiberlength, event.fiberStrength, event.cottonMike, event.fqi]);
          //console.log((await tx.wait()));
          if(tx){
             navigate("/availableRawMaterialToWarehouse")
          }
        }
        const [cottonWeight, setCottonWeight] = useState(data.state.rawMaterial1);
        const [fiberlength, setFiberlength] = useState(data.state.rawMaterial2);
        const [fiberStrength, setFiberStrength] = useState(data.state.rawMaterial3);
        const [cottonMike, setCottonMike] = useState(data.state.rawMaterial4);
        const [fqi, setFqi] = useState(data.state.rawMaterial5);
        const [showCottonWeightError, setShowCottonWeightError] = useState();
        const [showFiberlengthError, setShowFiberlengthError] = useState();
        const [showFiberStrengthError, setShowFiberStrengthError] = useState();
        const [showCottonMikeError, setShowCottonMikeError] = useState();
        const [showFqiError, setShowFqiError] = useState();


        const handleSubmit = (e) =>{
          e.preventDefault();
          const data = {
            cottonWeight:cottonWeight,
            fiberlength: fiberlength,
            fiberStrength: fiberStrength,
            cottonMike: cottonMike,
            fqi: fqi,
          }
          qualityCheckCottonMaterialHandler(data)
        }

        useMemo(() => {
          (cottonWeight == '') ? setShowCottonWeightError("Please fill value") :(cottonWeight > data.state.rawMaterial1)?setShowCottonWeightError("Value is greater"):setShowCottonWeightError(false);
        }, [cottonWeight])
        useMemo(() => {
          (fiberlength == '') ? setShowFiberlengthError("Please fill value") :(fiberlength > data.state.rawMaterial2)?setShowFiberlengthError("Value is greater"):setShowFiberlengthError(false);
        }, [fiberlength])
        useMemo(() => {
          (fiberStrength == '') ? setShowFiberStrengthError("Please fill value") :(fiberStrength > data.state.rawMaterial3)?setShowFiberStrengthError("Value is greater"):setShowFiberStrengthError(false);
        }, [fiberStrength])
        useMemo(() => {
          (cottonMike == '') ? setShowCottonMikeError("Please fill value") :(cottonMike > data.state.rawMaterial4)?setShowCottonMikeError("Value is greater"):setShowCottonMikeError(false);
        }, [cottonMike])
        useMemo(() => {
          (fqi == '') ? setShowFqiError("Please fill value") :(fqi > data.state.rawMaterial5)?setShowFqiError("Value is greater"):setShowFqiError(false);
        }, [fqi])
        return(
          <form onSubmit={handleSubmit}>
          <div className='cotton-section'>
            <div className="formInput">
              <label>Weight(kg)</label>
              <input id="cottonWeight" name="cottonWeight" type="text" value={cottonWeight} onChange={(e) => setCottonWeight(e.target.value)} />
              {showCottonWeightError =='' ? '': <span className='error'> {showCottonWeightError}</span> }
            </div>
            <div className="formInput">
              <label>Fibre length(mm)</label>
              <input id="fiberlength" name="fiberlength" type="text" value={fiberlength} onChange={(e) => setFiberlength(e.target.value)} />
              {showFiberlengthError =='' ? '': <span className='error'> {showFiberlengthError}</span> }
            </div>
            <div className="formInput">
              <label>Fibre Strength(g/T)</label>
              <input id="fiberStrength" name="fiberStrength" type="text" value={fiberStrength} onChange={(e) => setFiberStrength(e.target.value)} />
              {showFiberStrengthError =='' ? '': <span className='error'> {showFiberStrengthError}</span> }
            </div>
            <div className="formInput">
              <label>Mike(mm)</label>
              <input id="cottonMike" name="cottonMike" type="text" value={cottonMike} onChange={(e) => setCottonMike(e.target.value)} />
              {showCottonMikeError =='' ? '': <span className='error'> {showCottonMikeError}</span> }
            </div>
            <div className="formInput">
              <label>FQI (Rd)</label>
              <input id="fqi" name="fqi" type="text" value={fqi} onChange={(e) => setFqi(e.target.value)} />
              {showFqiError =='' ? '': <span className='error'> {showFqiError}</span> }
            </div>
          </div>
          <div className='formInput'>
          <button  disabled={!(showFqiError == false && showCottonMikeError == false && showFiberStrengthError == false && showFiberlengthError == false && showCottonWeightError == false)} type={"submit"}> Submit </button>
          </div>   
        </form>
        )
      }
      const  BuyPolyester = () =>{

        const qualityCheckPolyesterMaterialHandler = async (event) => {
          const tx = supplyChainContract.factoryQCRawMaterials(data.state.id, [event.polyesterFmax, event.polyesteremax, event.polyesterNeps, event.polysterCvm, 0]);
          //console.log((await tx.wait()));
          if(tx){
             navigate("/availableRawMaterialToWarehouse")
          }
        }

        const [polyesterFmax, setPolyesterFmax] = useState(data.state.rawMaterial1);
        const [polyesteremax, setPolyesteremax] = useState(data.state.rawMaterial2);
        const [polyesterNeps, setPolyesterNeps] = useState(data.state.rawMaterial3);
        const [polysterCvm, setPolysterCvm] = useState(data.state.rawMaterial4);
        const [showPolyesterFmaxError, setShowPolyesterFmaxError] = useState();
        const [showPolyesteremaxError, setShowPolyesteremaxError] = useState();
        const [showPolyesterNepsError, setShowPolyesterNepsError] = useState();
        const [showPolysterCvmError, setShowpolysterCvmError] = useState();

       

        const handleSubmit = (e) =>{
            e.preventDefault();
            const data = {
                polyesterFmax:polyesterFmax,
                polyesteremax: polyesteremax,
                polyesterNeps: polyesterNeps,
                polysterCvm: polysterCvm,
            }
            qualityCheckPolyesterMaterialHandler(data)
          }

        useMemo(() => {
          (polyesterFmax == '') ? setShowPolyesterFmaxError("Please fill value") :(polyesterFmax > data.state.rawMaterial1)?setShowPolyesterFmaxError("Value is greater"):setShowPolyesterFmaxError(false);
        }, [polyesterFmax])
        useMemo(() => {
          (polyesteremax == '') ? setShowPolyesteremaxError("Please fill value") :(polyesteremax > data.state.rawMaterial2)?setShowPolyesteremaxError("Value is greater"):setShowPolyesteremaxError(false);
        }, [polyesteremax])
        useMemo(() => {
          (polyesterNeps == '') ? setShowPolyesterNepsError("Please fill value") :(polyesterNeps > data.state.rawMaterial3)?setShowPolyesterNepsError("Value is greater"):setShowPolyesterNepsError(false);
        }, [polyesterNeps])
        useMemo(() => {
          (polysterCvm == '') ? setShowpolysterCvmError("Please fill value") :(polysterCvm > data.state.rawMaterial4)?setShowpolysterCvmError("Value is greater"):setShowpolysterCvmError(false);
        }, [polysterCvm])
        
        return(
          <form onSubmit={handleSubmit}>
              <div className='polyester-section'>
                <div className="formInput">
                  <label>FMax (kN)</label> 
                  <input id="polyesterFmax" name="polyesterFmax" type="text" value={polyesterFmax} onChange={(e) => setPolyesterFmax(e.target.value)} />
                  {showPolyesterFmaxError =='' ? '': <span className='error'> {showPolyesterFmaxError}</span> }
                </div>
                <div className="formInput">
                  <label>EMax (%)</label>
                  <input id="polyesteremax" name="polyesteremax" type="text"  value={polyesteremax} onChange={(e) => setPolyesteremax(e.target.value)} />
                  {showPolyesteremaxError =='' ? '': <span className='error'> {showPolyesteremaxError}</span> }
                </div>
                <div className="formInput">
                  <label>Neps (%)</label>
                  <input id="polyesterNeps" name="polyesterNeps" type="text"  value={polyesterNeps} onChange={(e) => setPolyesterNeps(e.target.value)}/>
                  {showPolyesterNepsError =='' ? '': <span className='error'> {showPolyesterNepsError}</span> }
                </div>
                <div className="formInput">
                  <label>CVm (%)</label>
                  <input id="polysterCvm" name="polysterCvm" type="number"  value={polysterCvm} onChange={(e) => setPolysterCvm(e.target.value)} />
                  {showPolysterCvmError =='' ? '': <span className='error'> {showPolysterCvmError}</span> }
                </div>
              </div>
              <div className='formInput'>
              <button disabled={!(showPolyesterFmaxError == false && showPolyesteremaxError == false && showPolyesterNepsError == false && showPolysterCvmError == false)} type={"submit"}> Submit </button>
              </div>          
            </form>
        )
      }
      const  BuyWool = () =>{
        const qualityCheckWoolMaterialHandler = async (event) => {
          const tx = supplyChainContract.factoryQCRawMaterials(data.state.id, [event.woolDialmeter, event.woolStapleLength, event.woolFiberLength, event.woolCrimpiness, 0]);
          //console.log((await tx.wait()));
          if(tx){
             navigate("/availableRawMaterialToWarehouse")
          }
        }

        const [woolDialmeter, setWoolDialmeter] = useState(data.state.rawMaterial1);
        const [woolStapleLength, setWoolStapleLength] = useState(data.state.rawMaterial2);
        const [woolFiberLength, setWoolFiberLength] = useState(data.state.rawMaterial3);
        const [woolCrimpiness, setWoolCrimpiness] = useState(data.state.rawMaterial4);
        const [showWoolDialmeterError, setShowWoolDialmeterError] = useState();
        const [woolStapleLengthError, setShowWoolStapleLengthError] = useState();
        const [showWoolFiberLengthError, setshowWoolFiberLengthError] = useState();
        const [showWoolCrimpinessError, setShowWoolCrimpinessError] = useState();

        const handleSubmit = (e) =>{
            e.preventDefault();
            const data = {
                woolDialmeter:woolDialmeter,
                woolStapleLength: woolStapleLength,
                woolFiberLength: woolFiberLength,
                woolCrimpiness: woolCrimpiness,
            }
            qualityCheckWoolMaterialHandler(data)
          }

        useMemo(() => {
          (woolDialmeter == '') ? setShowWoolDialmeterError("Please fill value") :(woolDialmeter > data.state.rawMaterial1)?setShowWoolDialmeterError("Value is greater"):setShowWoolDialmeterError(false);
        }, [woolDialmeter])
        useMemo(() => {
          (woolStapleLength == '') ? setShowWoolStapleLengthError("Please fill value") :(woolStapleLength > data.state.rawMaterial2)?setShowWoolStapleLengthError("Value is greater"):setShowWoolStapleLengthError(false);
        }, [woolStapleLength])
        useMemo(() => {
          (woolFiberLength == '') ? setshowWoolFiberLengthError("Please fill value") :(woolFiberLength > data.state.rawMaterial3)?setshowWoolFiberLengthError("Value is greater"):setshowWoolFiberLengthError(false);
        }, [woolFiberLength])
        useMemo(() => {
          (woolCrimpiness == '') ? setShowWoolCrimpinessError("Please fill value") :(woolCrimpiness > data.state.rawMaterial4)?setShowWoolCrimpinessError("Value is greater"):setShowWoolCrimpinessError(false);
        }, [woolCrimpiness])
        return(
          <form onSubmit={handleSubmit}>
              <div className='wool-section'>
                <div className="formInput">
                  <label>Fibre diameter or Grade (mm)</label>
                  <input id="woolDialmeter" name="woolDialmeter" type="text" value={woolDialmeter} onChange={(e) => setWoolDialmeter(e.target.value)}/>
                  {showWoolDialmeterError =='' ? '': <span className='error'> {showWoolDialmeterError}</span> }
                </div>
                <div className="formInput">
                  <label>Staple length (mm)</label>
                  <input id="woolStapleLength" name="woolStapleLength" type="text"  value={woolStapleLength} onChange={(e) => setWoolStapleLength(e.target.value)} />
                  {woolStapleLengthError =='' ? '': <span className='error'> {woolStapleLengthError}</span> }
                </div>
                <div className="formInput">
                  <label>Fibre length (mm)</label>
                  <input id="woolFiberLength" name="woolFiberLength" type="text"  value={woolFiberLength} onChange={(e) => setWoolFiberLength(e.target.value)} />
                  {showWoolFiberLengthError =='' ? '': <span className='error'> {showWoolFiberLengthError}</span> }
                </div>
                <div className="formInput">
                  <label>Crimpiness (cm)</label>
                  <input id="woolCrimpiness" name="woolCrimpiness" type="text"  value={woolCrimpiness} onChange={(e) => setWoolCrimpiness(e.target.value)} />
                  {showWoolCrimpinessError =='' ? '': <span className='error'> {showWoolCrimpinessError}</span> }
                </div>
              </div>
              <div className='formInput'>
              <button disabled={!(showWoolDialmeterError == false && woolStapleLengthError == false && showWoolFiberLengthError == false && showWoolCrimpinessError == false)} type={"submit"}> Submit </button>
              </div>          
            </form>
        )
      }
        return(
          <div className="new">
            <div className="newContainer">
              <div className="top">
              <h4>Quality Check Raw Material</h4>
              </div>
              {/* <button onClick={notify}>Notify!</button>
        <ToastContainer /> */}
            <div className="bottom">
            <div className="right">
             
              { materialtype == 1 ?  <BuyCotton /> : '' }
              { materialtype == 2 ?  <BuyPolyester /> : '' }
              { materialtype == 3 ?  <BuyWool /> : '' }
            </div>
          </div>
          </div>
          </div>
        )
    }
    return(
        <div className="new">
            <Sidebar txt={"avlRawMatforWarehouse"} />
            <div className="newContainer">
                <Navbar />
                <ConfirmShow data ={data} />
            </div>
        </div>
    )
}
export default QualityCheckRawMaterail