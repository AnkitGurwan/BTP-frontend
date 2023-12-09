
import React, { useContext,useEffect, useState } from "react";
import {useParams,Link, useNavigate } from 'react-router-dom';
import ItemContext from '../../../context/project/ItemContext';
import AuthContext from '../../../context/authentication/AuthContext';
import Ownerprojectcard from '../professor/ownerprojectcard'
import Projectcardspecific from "./studentspecificprojectcard";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Specificprojectcard=()=> {
    const {allProjects,details,getSingleProject, getInterestedStudents} = useContext(ItemContext);
    const Navigate = useNavigate();
    const [allowed,setAllowed]=useState(true);
    const [loading,setLoading]=useState(true);
    const params=useParams();
    const id = params.id;

    const studentRegisteredList = useSelector(state => state.allProjects.interestedStudents);
    console.log("list",studentRegisteredList)
   
    const {token} = useContext(AuthContext);
    var idtoken=token;

    const Store = [];  
    Store.push(details);

    const items = useSelector(state => state.allProjects.allProjects);

    const funcAllowed = ()=>{
      if(localStorage.getItem('studRoll'))
      {
        if(210103001 <= localStorage.getItem('studRoll') && localStorage.getItem('studRoll') <= 210103140){
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
          const x = await getInterestedStudents(id);
          if(x === 200)setLoading(false);
          const projectSingle = await getSingleProject(id);
          
        }
        useEffect(()=>{
          getItem();
          // if(studentRegisteredList)setLoading(false);
        },[]);


    
    
     return(
        <div className='studentspecificdiv'>
          {allowed?
          <div>
            <header class="bg-gray-800 text-white py-2 flex items-center justify-center">
            <Link className='goback' to={`/studentallproject`}><i class="fa-sharp fa-solid fa-arrow-left fa-lg pl-2" /></Link>
              
              <div class="container mx-auto px-2">
                <h1 class="text-xl  font-bold mt-2 text-center md:mr-20 font-Manrope">Kindy click on 'Register' if you are interested</h1>
              </div>
            </header>
            
            <div className="flex my-3 w-full">
              <div className="w-full mr-12">
                {Store.map((detail,i)=>{return (<Ownerprojectcard key={i} detail={detail} />)})}
              </div>
            </div>
            
            <div className="flex">
              <div className='w-3/4 justify-center pl-16'>{items.filter((project)=>project._id === id).map((projects,i)=>{return (<Projectcardspecific key={i} project={projects} idtoken={idtoken}/>)})}</div>

              <div className="w-1/4 flex flex-col items-center border-2 rounded-lg ml-4 mr-16 py-2">
                <div>
                  <div className="font-medium text-lg px-3">Currently registered students :</div>
                  {
                    loading
                    ?
                    <div class="h-48 flex items-center justify-center">
                      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                    :
                    <div className={"py-2 grid lowercase mx-2 " + (studentRegisteredList.length>0?"grid-cols-2":"grid-cols-1")}>
                    
                    { studentRegisteredList.length > 0 
                    ?
                    studentRegisteredList.map((individual) => {
                    return <div className="text-center text-xs bg-gray-200">{individual}</div>})
                    :
                    <div className="px-3">No one has registered for this project (Refresh to reflect any changes)</div>}
                  </div>}
                </div>
              </div>
            </div>
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

