import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../context/authentication/AuthContext';

const Createpassword = () => {
    const { confirmEmail } = useContext(AuthContext);
    const params = useParams();
    const token = params.token;
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [user, setUser] = useState({ password: '', repassword: '' });

    const detectChanges = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validatePassword = (event) => {
        event.preventDefault();

        if (user.password.length === 0 || user.repassword.length === 0) {
            toast.error('Password cannot be empty', {
                position: toast.POSITION.TOP_CENTER,
            });
        } else if (user.password !== user.repassword) {
            toast.error('Passwords do not match', {
                position: toast.POSITION.TOP_CENTER,
            });
        } else {
            setPasswordMatch(false);
        }
    };

    const navigate = useNavigate();

    const submit = (e) => {
        if (user.password !== user.repassword) {
            toast.error('Password does not match', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        if (user.password.length < 8) {
            toast.error('Password must have at least 8 characters', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        e.preventDefault();
        confirmEmail(user.password, token);
        navigate('/login');

        toast.success('Password created successfully', {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    return (
        <div className="mx-4 mt-4 flex flex-col">
            <br />
            <div className="text-xl md:text-2xl font-medium pb-3 text-center">Reset Password for your account</div>
            <div className="formshadow mx-auto w-full mx-4 md:mx-0 md:w-1/3">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form className="formcreateaccount flex flex-col justify-center" onSubmit={submit}>
                        <div className="form-outline mb-3 px-4">
                            <input
                                className="form-control"
                                onKeyUp={validatePassword}
                                type="password"
                                name="password"
                                value={user.password}
                                placeholder="New Password"
                                required
                                autoFocus
                                onChange={detectChanges}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div className="form-outline mb-3 px-4">
                            <input
                                className="form-control"
                                onKeyUp={validatePassword}
                                name="repassword"
                                value={user.repassword}
                                type="password"
                                placeholder="Confirm Password"
                                required
                                onChange={detectChanges}
                            />
                            {passwordMatch ? (
                                <div className="text-sm text-red-600 mt-1">Passwords do not match</div>
                            ) : (
                                ''
                            )}
                        </div>

                        <button
                            className="bg-green-600 text-white text-center font-semibold py-2 rounded-md text-xl w-1/2 md:w-1/3 mx-auto mt-2 mb-4"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Createpassword;
