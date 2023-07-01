import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/interfacePageslHeader';
import Profcreateaccount from '../layouts/profcreateaccount';

function Accountpage(){
    return(
        <div>
            <Header />
            <div className='body2div'>
                <Link className='goback' to={`/`}><i class="fa-sharp fa-solid fa-arrow-left text-3xl md:text-4xl my-4 md:my-2 ml-2"/></Link>
                <Profcreateaccount />
            </div>
        </div>
   
    )
}
export default Accountpage;