import React,{ useContext}  from 'react';
import {useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authentication/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const Createaccount=()=>{
    const {studentDetails}=useContext(AuthContext);

    const clickhandler=async ()=> {
      document.getElementById('myButton').classList.add('animate-pulse');
      await studentDetails();
    }

    return(
        <div class="w-3/4 md:w:1/3 mx-auto text-center">  
          <h2 className='font-semibold'>Click to login to your account</h2>
          <hr/>

          <div class="bsk-container w-3/4 md:1/2 mx-auto">
            <button id='myButton' class="bsk-btn w-full md:w-1/3 mx-auto p-2 rounded bsk-btn-default bg-gray-700 hover:bg-gray-800 text-white flex items-center" onClick={clickhandler}>
            <i class="fa-brands fa-windows text-2xl p-2 my-auto mx-2"></i>
            <h5 className='p-1 my-auto'>Microsoft Login</h5></button>
          </div>
        </div>
)
}
export default Createaccount;