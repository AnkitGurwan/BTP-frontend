import React, { useContext, useEffect } from 'react';
import Header from '../layouts/interfacePageHeader';
import ItemContext from '../../context/project/ItemContext';
import { Link } from 'react-router-dom';
import '../layouts/styles.css'


const Interfacepage = () => {
    const {allProjects} = useContext(ItemContext);
    const getItem = async ()=>{        
        await allProjects(); 
    };
    useEffect(()=>{
        getItem();
      },[]) 

    return(
        <div style={{"width":"100vw"}}>
            <Header />
            <div className='bodymaindiv'>
            <div className='bodydiv1'><Link to="/login" className='bodya'>Professor</Link></div>
            <div className='bodydiv2'><Link to="/studentlogin" className='bodya'>Student</Link></div>
        </div> 
        </div>
    )
}
export default Interfacepage;