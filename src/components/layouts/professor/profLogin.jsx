import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../context/authentication/AuthContext';

const Body2 = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const loginSubmitHandler = async (event) => {
        const myButton = document.getElementById('myButton');
        myButton.classList.add('animate-pulse');

        event.preventDefault();
        const response = await loginUser(user.email, user.password);

        if (response === 200) {
            toast.success('Login Success', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate('/owner');
            setUser({ email: "", password: "" });
        } else {
            toast.error('Invalid email or password', {
                position: toast.POSITION.TOP_CENTER
            });
        }

        myButton.classList.remove('animate-pulse');
    }

    const redirectToRegister = () => {
        navigate('/createaccount');
    }

    return (
        <div className="flex justify-center mx-4 mt-8 md:mt-0">
            <div className='w-full md:w-1/3 shadow-md rounded-lg border p-2 md:p-3'>
                <ul className="py-2 px-2 flex justify-center items-center">
                    <li className="w-1/2 flex justify-center items-center">
                        <div className="text-center font-medium md:font-bold text-sm md:text-xl mx-1 py-2 w-full bg-blue-400 text-white">Login</div>
                    </li>
                    <li className='w-1/2 flex justify-center items-center'>
                        <div className="text-center py-2 text-sm md:text-xl mx-1 cursor-pointer w-full border text-gray-600 font-medium md:font-bold" onClick={redirectToRegister}>Register</div>
                    </li>
                </ul>

                <div className="p-2 md:p-4">
                    <form onSubmit={loginSubmitHandler}>
                        <div className="mb-3">
                            <input
                                type="email"
                                id="loginName"
                                className="w-full px-3 md:px-4 py-2 text-xs md:text-sm border rounded-md focus:outline-none focus:border-indigo-500"
                                placeholder="Email (i.e. 123@gmail.com)"
                                required
                                autoFocus
                                name="email"
                                value={user.email}
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div className="mb-4 md:mb-3">
                            <input
                                type="password"
                                id="loginPassword"
                                className="w-full px-3 md:px-4 py-2 text-xs md:text-sm border rounded-md focus:outline-none focus:border-indigo-500"
                                placeholder="Password"
                                required
                                name="password"
                                value={user.password}
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-start">
                                <Link to="/resetpassword" className="text-blue-500 px-1 text-sm md:text-lg">Forgot password?</Link>
                            </div>
                        </div>

                        <button
                            id='myButton'
                            type="submit"
                            className="w-full font-semibold text-lg bg-green-700 to-orange-600 text-white py-2 rounded-md hover:from-pink-700 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Body2;
