import React, { useContext, useEffect } from 'react';
import Header from '../layouts/interfacePageHeader';
import Body from '../layouts/interface';
import ItemContext from '../../context/project/ItemContext';


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
            <Body />
        </div>
    )
}
export default Interfacepage;