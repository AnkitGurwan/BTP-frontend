import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allprojects from '../layouts/professor/profallprojects';
import Header from '../layouts/mainPagesHeader'

function ProfallprojectPage(){
    const Navigate=useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('btpToken')){
            Navigate("/login");
            (toast.error('Please login to access', {
                position: toast.POSITION.TOP_CENTER
            }))
        };
        },[]);
     
    return(
        <div>
            <Header/>
            <Allprojects/>
        </div>
    )
}

export default ProfallprojectPage;