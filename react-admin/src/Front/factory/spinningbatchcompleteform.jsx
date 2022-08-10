import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/new.scss'

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { SpinningbatchcompleteformSchema } from '../../Validations/Schema';

const Spinningbatchcompleteform = () => {
  let data = useLocation();
  data = data.state.i;
  //console.log("Coming data is ",data);

  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: {
      yarnamount: '',
      yarncolor: '',
      yarntype:'',
    },
    resolver: yupResolver(SpinningbatchcompleteformSchema),
  })

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
  const [SChainContract, setSChainContract] = useState(supplyChainContract);

  const spinningcompleteHandler = async (event) => {
    //event.preventDefault();
    //console.log("batchid", SChainContract);

    const tx = SChainContract.factoryCompleteSpinningWaeving(data, event.yarnamount, event.yarncolor, event.yarntype);
    //console.log((await tx.wait()));
    if (tx) {
      navigate("/spinningWaevingMaterial")
    }
  }

  const DataTable = (props) => {
    const data = props.data;
    return (
      <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit(spinningcompleteHandler)}>
            <div className="formInput">
              <label>Yarn Amount</label>
              <input id="yarnamount" type="text" name="yarnamount" {...register("yarnamount", { required: true })}></input>
              {errors.yarnamount && <span className='error'> {console.log(errors)} {errors?.yarnamount?.message}</span>}

            </div>
            <div className="formInput">
              <label>Yarn Color</label>
              <input id="yarncolor" name="yarncolor" type="text" {...register("yarncolor", { required: true })}></input>
              {errors.yarncolor && <span className='error'> {console.log(errors)} {errors?.yarncolor?.message}</span>}

            </div>
            <div className="formInput ">
              <label>Yarn Type </label>
              <input id="yarntype" name="yarntype" type="text" {...register("yarntype", { required: true })}></input>
              {errors.yarntype && <span className='error'> {console.log(errors)} {errors?.yarntype?.message}</span>}

            </div>
            <div className='formInput'>
              <button type={"submit"}> Submit </button>
            </div>
          </form>

        </div>
      </div>
    )
  }
  return (
    <div className="new">
      <Sidebar txt={"facSpinningWeaving"} />
      <div className="newContainer">
        <Navbar />
        <DataTable data={data} />
      </div>
    </div>
  )
}

export default Spinningbatchcompleteform