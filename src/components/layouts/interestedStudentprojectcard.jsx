import React,{useContext,useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import ItemContext from '../../context/project/ItemContext';
import Projectcard from './projectcard'

const Createaccount=()=>{
    const {itemsspecific,Projectspecific} = useContext(ItemContext);
    const total=itemsspecific.length;
    const[search,setSearch]=useState("");

    const getItem=async ()=>{        
        await Projectspecific();  
      }
      useEffect(()=>{
        getItem();
      },[]) 

    const detectChanges = async(e)=>{        
    setSearch(e.target.value);   
    }

    
    return(
      <div class="container-fluid1 text-center">    
          <div class="sidenavbar">
          <Link className='myprojectsdivb' to={``}>
            
          <div className='myprojectsdiv1'><i class="fa-solid fa-user fa-xl"></i></div>
          <div className='myprojectsdiv2'>My Projects</div>
            </Link>
          <Link className='myprojectsdiva' to={`/mainpage`}>
          
          <div className='myprojectsdiv2'>All Projects</div>
            </Link>
          
          </div>
          <div class="text-left">
          <div className='totalprojects'>Total Projects : {total}</div> 
          
          
          <div className='allprojectslinkdiv'><Link to='newproject' className='allprojectslink'  ><h1 style={{"padding":"5px"}}>+ </h1>NEW PROJECT</Link></div>
          <div class="input-group" className='searchdiv'>
            <div class="form-outline">
             <input id="search-input" type="search"  class="form-control" name='search' placeholder="Search by Title name" value={search} onChange={detectChanges} />
         </div>
         </div>
          <div className='allprojectsdiv'>{itemsspecific.filter((projects)=>{ return search.toString().toLowerCase()==='' ? projects : projects.title.toLowerCase().includes(search.toLocaleLowerCase())}).map( (project,i)=>{ return (<Projectcard key={i} project={project}/>)})}</div>
          </div>
          
      
      </div>
      
    )
}
export default Createaccount;
