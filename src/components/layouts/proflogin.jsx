import React,{useState,useContext} from 'react'
import './styles.css'
import {Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/authentication/AuthContext'

const Body2 = ()=>{

  // state of user loging in
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const {loginUser} = useContext(AuthContext);
    const navigate=useNavigate();

    const onChangeHandler = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const loginSubmitHandler = async (event) => {
        document.getElementById('myButton').classList.add('animate-pulse');
        
        event.preventDefault();
        const x=await loginUser(user.email,user.password)
    
        if(x === 200){
          toast.success('Login Success', {
          position: toast.POSITION.TOP_CENTER
        });
          navigate('/owner');
          setUser({email:"", password:""});  
          document.getElementById('myButton').classList.remove('animate-pulse');
        }
        else {
          toast.error('Invalid email or password', {
          position: toast.POSITION.TOP_CENTER
        });
        document.getElementById('myButton').classList.remove('animate-pulse');
        }
    }
    
    const newfunc=async ()=>{
     navigate('/createaccount');
    }

    return(
          <div className="centerr" >
            <div className='formshadow'>    
              
              <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li class="nav-item " role="presentation" >
                  <div class="nav-link active" className="newfunc1" id="tab-login" data-mdb-toggle="pill" role="tab"
                  aria-controls="pills-login" aria-selected="true" >Login</div>
                </li>
                <li class="nav-item" >
                  <div class="nav-link" className="newfunc2" id="tab-register" data-mdb-toggle="pill"  role="tab"
                  aria-controls="pills-register" aria-selected="false" onClick={newfunc}>Register</div>
                </li>
              </ul>

              <div class="tab-content">
                <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                  
                  <form onSubmit={loginSubmitHandler} >
                    <div class="form-outline mb-4" className='proflogininput' >
                      <input type="email" id="loginName" class="form-control"  placeholder="Email (i.e. 123@gmail.com)" required autoFocus name="email" value={user.email} onChange={onChangeHandler}/>
                    </div>
          
                    <div class="form-outline mb-4" className='proflogininput' >
                      <input type="password" id="loginPassword" class="form-control" placeholder="Password" required   name="password" value={user.password} onChange={onChangeHandler}/>
                    </div>

                    <div class="row mb-4" className='profloginlink'>
                      <div class="col-md-6 d-flex justify-content-start">
                        <Link to="/resetpassword">Forgot password?</Link>
                      </div>
                    </div>

                    <button id='myButton' type="submit" class="btn btn-primary btn-block mb-4 w-full">Sign in</button>
                  
                  </form>
                </div>
              </div>
            </div>     
          </div>
)}
export default Body2;
