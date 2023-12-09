import React, { useContext,useEffect } from "react";
import { useParams,Link } from 'react-router-dom';
import ItemContext from '../../context/project/ItemContext';
import Projectcardspecific from "./professor/projectcardspecific2";
import { useSelector } from 'react-redux';


const Specificprojectcard=()=> {
    const {allProjects} = useContext(ItemContext);
    const items = useSelector(state => state.allProjects.allProjects);

    const getItem=async ()=>{
        await allProjects();
      }
      useEffect(()=>{
        getItem()
      },[])

    const params=useParams();
    const id=params.id

     return(
        <div className='readmorepage2'>
          <div className="flex fixed ml-1">
            <Link className='goback' to={`/mainpage`}><i class="fa-sharp fa-solid fa-arrow-left fa-lg"></i></Link> 
          </div><div className='allprojectsdivread mt-0 md:mt-12'>{items.filter((project)=>project._id===id).map((projects,i)=>{return (<Projectcardspecific key={i} project={projects}/>)})}</div>
        </div>
    )
};
export default Specificprojectcard