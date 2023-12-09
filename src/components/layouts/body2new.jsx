import React, { useState, useContext } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authentication/AuthContext';

const Body2 = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { loginUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const loginSubmitHandler = async (event) => {
        event.preventDefault();
        const x = await loginUser(user.email, user.password);

        if (x === 200) {
            // Removed unnecessary console.log and organized the code
            alert('Login Successfully');
            navigate('/mainpage');
            setUser({ email: '', password: '' });
        } else {
            alert('Invalid id or password');
        }
    };

    return (
        <div className="center">
            <div className="formshadow">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <div className="nav-link active newfunc3" id="tab-login" data-mdb-toggle="pill" role="tab" aria-controls="pills-login" aria-selected="true">
                            Login
                        </div>
                    </li>
                    <li className="nav-item" role="presentation">
                        <div className="nav-link newfunc4" id="tab-register" data-mdb-toggle="pill" role="tab" aria-controls="pills-register" aria-selected="false">
                            Register
                        </div>
                    </li>
                </ul>

                <div className="tab-content">
                    {/* Commented out registration form section */}
                    <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                        <form>
                            <div className="form-outline mb-2">
                                <input type="text" id="registerUsername" className="form-control" />
                                <label className="form-label" htmlFor="registerUsername">
                                    Username
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="email" id="registerEmail" className="form-control" />
                                <label className="form-label" htmlFor="registerEmail">
                                    Email
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-6">
                                Create Account
                            </button>
                        </form>
                    </div>
                   
                </div>
            </div>
            {/* <form onSubmit={loginSubmitHandler}>
                <div className="text_field">
                    <input type="email" required placeholder="User email" className="body2input" name="email" value={user.email} onChange={onChangeHandler} />
                </div>

                <div className="text_field">
                    <input type="password" required placeholder="Password" className="body2input" name="password" value={user.password} onChange={onChangeHandler} />
                </div>
                <br />
                <Link to="/resetpassword" className="pass">
                    Forgot password?
                </Link>
                <br />
                <button className="body2button1" type="submit" id="proflogin">
                    Login
                </button>
                <br />

                <div className="signup_link">
                    Not a member? <Link to="/createaccount">Signup</Link>
                </div>
            </form> */}
        </div>
    );
};

export default Body2;
