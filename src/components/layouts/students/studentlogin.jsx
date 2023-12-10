import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/authentication/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const Createaccount = () => {
    const { studentDetails } = useContext(AuthContext);
    const navigate = useNavigate();

    const clickHandler = async () => {
        document.getElementById('myButton').classList.add('animate-pulse');
        await studentDetails();
    };

    return (
        <div className="mt-16 mx-2 md:m-0 md:w-1/3 text-center border shadow-md p-3">
            <h2 className="font-semibold italic underline">Click on Login to continue</h2>
            <br/>
            <div className="w-full flex justify-center p-3">
                <button
                    id="myButton"
                    className="bsk-btn w-3/4 md:w-2/3 flex justify-center p-2 rounded bsk-btn-default bg-green-600 hover:bg-green-700 text-white flex items-center"
                    onClick={clickHandler}
                >
                    <i className="fa-brands fa-windows text-2xl p-2 my-auto mx-2"></i>
                    <h5 className="p-1 my-auto text-center">Microsoft Login</h5>
                </button>
            </div>
        </div>
    );
};

export default Createaccount;
