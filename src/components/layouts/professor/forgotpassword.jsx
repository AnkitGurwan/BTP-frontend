import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/authentication/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
        const { resetPassword } = useContext(AuthContext);
        const [em, setEm] = useState({ email: "" });
        const onChangeHandler = (e) => {
            setEm({ ...em, [e.target.name]: e.target.value });
        };

        const navigate = useNavigate();

        const redirectToLogin = () => {
            navigate('/login');
        }

        const submit = async (e) => {
            e.preventDefault();
            const x = await resetPassword(em.email);

            if (x === 404) {
            toast.error('Cannot Change Password For This Email', {
                position: toast.POSITION.TOP_CENTER
            });
            } else if (x === 400) {
            toast.error('User not exist', {
                position: toast.POSITION.TOP_CENTER
            });
            } else {
            navigate(`/login`);
            toast.success('Email sent successfully', {
                position: toast.POSITION.TOP_CENTER
            });
            }
        };

        return (
            <div className="flex justify-center mx-4 mt-8 md:mt-0">
                <div className='w-full md:w-1/3 shadow-md rounded-lg border p-2 md:p-3'>
                    <div className='flex w-full py-2 px-2'>
                        <span className='text-center font-medium md:font-bold text-sm md:text-xl mx-1 py-2 w-full bg-blue-400 text-white'>Forgot Password</span>
                        <span className='text-center py-2 text-sm md:text-xl mx-1 cursor-pointer w-full border text-gray-600 font-medium md:font-bold flex items-center justify-center' onClick={redirectToLogin}>Go Back</span>
                    </div>
                    <div className="w-full p-2 flex flex-col justify-center items-center ">
                    <form onSubmit={submit} className='w-full flex flex-col justify-center items-center '>
                        <div className="py-2 md:py-4 w-full">
                        <input
                            type="email"
                            id="email"
                            className="w-full text-xs md:text-sm px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Email (including @gmail.com)"
                            required
                            autoFocus
                            name="name"
                            value={em.email}
                            onChange={onChangeHandler}
                        />
                        </div>
                        <button className='bg-green-600 hover:bg-green-700 w-full mt-4 py-2 my-2 rounded-md font-semibold text-white text-sm md:text-lg' type="submit">Send</button>
                        <div className='px-2 text-center text-red-600 pt-2 md:pt-3'>You will receive an email on this Email account to change your password.</div>
                    </form>
                    </div>
                </div>
            </div>
        );
};

export default ForgotPassword;
