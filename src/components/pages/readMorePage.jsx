import React, { useEffect } from 'react';
import Specificproject from '../layouts/professor/readmore';
import Header from '../layouts/mainPagesHeader'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProjectPage(){
    const Navigate = useNavigate();
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
            <Specificproject/>
            
        </div>
    )
}

export default ProjectPage;