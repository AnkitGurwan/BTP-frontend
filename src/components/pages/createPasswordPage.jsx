import React from 'react';
import {Link } from 'react-router-dom';
import Header from '../layouts/interfacePageHeader';
import Createpassword from '../layouts/professor/createpassword';

function Createpasswordpage(){
    return(
        <div>
            <Header />
            <Link to={`/`}><i className="bg-blue-200 rounded-full fa-sharp fa-solid fa-arrow-left mx-2 md:mx-4 mt-3 md:mt-5 text-2xl md:text-3xl p-2"/></Link> 
            <Createpassword />
        </div>
   
    )
}
export default Createpasswordpage;