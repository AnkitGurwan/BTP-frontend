
import React, { useContext,useEffect, useState } from "react";
import {useParams,Link, useNavigate } from 'react-router-dom';
import ItemContext from '../../context/project/ItemContext';
import AuthContext from '../../context/authentication/AuthContext';
import Ownerprojectcard from './ownerprojectcard'
import Projectcardspecific from "./studentspecificprojectcard";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Specificprojectcard=()=> {
    const {allProjects,details} = useContext(ItemContext);
    const Navigate = useNavigate();
    const [allowed,setAllowed]=useState(false);
   
    const {token} = useContext(AuthContext);
    var idtoken=token;

    const Store = [];  
    Store.push(details);

    const items = useSelector(state => state.allProjects.allProjects);

    const funcAllowed = ()=>{
      if(localStorage.getItem('studRoll'))
      {
        if(210103000 < localStorage.getItem('studRoll') && localStorage.getItem('studRoll') < 210103140){
            setAllowed(true);
        }
        else setAllowed(false);
      }
      else 
      {
          Navigate("/studentlogin");
          (toast.error('Please login to access', {
            position: toast.POSITION.TOP_CENTER
        }));
      } 
    }

    const getItem=async ()=>{
          funcAllowed();
          await allProjects();
          
        }
        useEffect(()=>{
          getItem();
        },[]);


    const params=useParams();
    const id=params.id
    
     return(
        <div className='studentspecificdiv'>
          {allowed?
          <div>
            <header class="bg-gray-800 text-white py-2 flex items-center justify-center">
            <Link className='goback' to={`/studentallproject`}><i class="fa-sharp fa-solid fa-arrow-left fa-lg pl-2" /></Link>
              
              <div class="container mx-auto px-2">
                <h1 class="text-xl md:text-2xl font-bold mt-2 text-center">Kindy click on Register if you are ineterested</h1>
              </div>
            </header>
            <br/>
            
            <div className="flex mb-3">
              <div className="w-3/4 md:w-2/3 mx-auto md:mx-0">
                {Store.map((detail,i)=>{return (<Ownerprojectcard key={i} detail={detail} />)})}
              </div>
            </div>
            

            <div className='allprojectsdiv2'>{items.filter((project)=>project._id===id).map((projects,i)=>{return (<Projectcardspecific key={i} project={projects} idtoken={idtoken}/>)})}</div>
          </div>
          :
          <div class="centerrrr">
            <div class="max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 class="text-3xl font-bold mb-4">404</h1>
                <p class="text-lg text-gray-700 mb-6">Oops! The page you're looking for could not be accessed by you.</p>
                <div class="bg-blue-500 text-center text-white text-xl font-bold py-2 px-4 rounded">
                    You are not part of this Course.
                </div>
            </div>
        </div>
    }
        </div>
    )
}
export default Specificprojectcard;

