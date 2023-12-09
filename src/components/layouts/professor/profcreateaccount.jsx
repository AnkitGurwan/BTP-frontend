import React, { useState, useContext } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../context/authentication/AuthContext';

const Createaccount = () => {
    const { registerUser } = useContext(AuthContext);
    const [user, setUser] = useState({ name: "", email: "" });

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        console.log("111");
        const x = await registerUser(user.name, user.email);

        if (x === 200) {
            toast.success('Email sent successfully', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate('/login');
        } else if (x === 400) {
            toast.warning('Email already exists', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex justify-center mx-4">
            <div className='w-full md:w-1/3 shadow-md rounded-lg border p-3'>
                <ul className="py-2 px-2 flex justify-center items-center">
                    <li className="w-1/2 flex justify-center items-center">
                        <div className="text-center font-semibold md:font-bold text-lg md:text-xl mx-1 py-2 cursor-pointer w-full border text-gray-600" onClick={redirectToLogin}>Login</div>
                    </li>
                    <li className='w-1/2 flex justify-center items-center'>
                        <div className="text-center py-2 text-lg md:text-xl mx-1 cursor-pointer w-full  font-semibold md:font-bold bg-blue-400 text-white" >Register</div>
                    </li>
                </ul>

                <div className="p-3 md:p-4">
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <input
                                type="name"
                                id="name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                placeholder="Your full name"
                                required
                                autoFocus
                                name="name"
                                value={user.name}
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                placeholder="Email (i.e. 123@gmail.com)"
                                required
                                name="email"
                                value={user.email}
                                onChange={onChangeHandler}
                            />
                        </div>

                        

                        <button
                            id='myButton'
                            type="submit"
                            className="w-full bg-green-700 to-orange-600 text-white mt-3 py-2 rounded-md hover:from-pink-700 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-semibold text-lg"
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Createaccount;
