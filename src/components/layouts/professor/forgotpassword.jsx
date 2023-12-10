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
    <div className="flex flex-col justify-center items-center mx-4 md:mx-0 mt-8 md:mt-0">
      <div className='w-full  shadow-md rounded-lg border p-2 md:p-3 flex flex-col justify-center items-center '>
        <div className='my-1 md:my-2 text-3xl italic font-semibold'>Enter your Gmail</div>
        <div className="w-full p-2 md:p-4 flex flex-col justify-center items-center ">
          <form onSubmit={submit} className='w-full flex flex-col justify-center items-center '>
            <div className="py-2 md:py-3 px-2 w-full">
              <input
                type="email"
                id="email"
                className="w-full text-sm md:text-lg px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Email (including @gmail.com)"
                required
                autoFocus
                name="name"
                value={em.email}
                onChange={onChangeHandler}
              />
            </div>
            <button className='bg-green-600 w-1/2 md:w-1/3 py-2 my-2 rounded-md font-semibold text-white text-lg md:text-xl' type="submit">Send</button>
            <div className='px-2 text-center text-red-600 pt-3'>You will receive an email on this Email account to change your password.</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
