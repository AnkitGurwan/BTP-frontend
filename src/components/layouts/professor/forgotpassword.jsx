import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/authentication/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpassword = () => {
    const { resetPassword } = useContext(AuthContext);
    const [em, setEm] = useState({ email: "" });
    const onChangeHandler = (e) => {
        setEm({ ...em, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

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
        <div className="flex flex-col justify-center items-center ">
            <div className='w-full md:w-1/3 shadow-md rounded-lg border p-3 flex flex-col justify-center items-center '>
            <div className='my-2 text-3xl font-bold'>Enter your Gmail</div>
            {/* <form onSubmit={submit} className='resetform'>
                <div className="text_field">
                    <input className='resetpasswordinput' type="email" name='email' value={em.email} placeholder="Email  (including @gmail.com)" required onChange={detectChanges} />
                </div>
                <button type="submit">Send</button>
                <div className='divnote'>You will receive an email on this Email account to change your password.</div>
            </form> */}
            <div className="p-3 md:p-4 flex flex-col justify-center items-center ">
            <form onSubmit={submit} className='flex flex-col justify-center items-center '>
                        <div className="py-3 px-5 w-full">
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                placeholder="Email (including @gmail.com)"
                                required
                                autoFocus
                                name="name"
                                value={em.email}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <button className='bg-green-600 w-1/3 py-2 my-2 rounded-md font-semibold text-white text-xl' type="submit">Send</button>
                    <div className='px-6 text-center text-red-600 pt-3'>You will receive an email on this Email account to change your password.</div>
            </form>
            </div>
            </div>
        </div>
    );
};

export default Forgotpassword;
