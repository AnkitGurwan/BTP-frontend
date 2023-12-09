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
        <div className="w-3/4 md:w-1/3 mx-auto text-center">
            <h2 className="font-semibold italic">Click on Login to continue</h2>
            <hr />

            <div className="w-full mx-auto border p-4">
                <button
                    id="myButton"
                    className="bsk-btn w-full md:w-1/2 mx-auto p-3 rounded bsk-btn-default bg-green-600 hover:bg-green-700 text-white flex items-center"
                    onClick={clickHandler}
                >
                    <i className="fa-brands fa-windows text-2xl p-2 my-auto mx-2"></i>
                    <h5 className="p-1 my-auto">Microsoft Login</h5>
                </button>
            </div>
        </div>
    );
};

export default Createaccount;
