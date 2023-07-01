import React from 'react';
import {Link } from 'react-router-dom';
import Header from '../layouts/interfacePageslHeader';
import Forgotpassword from '../layouts/forgotpassword';
import 'react-toastify/dist/ReactToastify.css';

function Resetpasswordfunction(){
    return(
        <div>
            <Header />
          <Link className='goback' to={`/login`}><i class="fa-sharp fa-solid fa-arrow-left text-3xl md:text-4xl" style={{"margin-top":"30px"}}/></Link>

            <Forgotpassword />
        </div>
   
    )
}
export default Resetpasswordfunction;