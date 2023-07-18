import React,{useState, useContext} from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/authentication/AuthContext';

const Createpassword = () => {

    const {confirmEmail} = useContext(AuthContext);
    const params = useParams();
    const token = params.token;
    const [passwordMatch,setPasswordMatch] = useState(false);
    const [user, setUser] = useState({ password: "", repassword: "" });

    const detectChanges = async(e)=>{
        setUser({...user,[e.target.name]:e.target.value});  
    }

    const validate_password = (event) => {
        event.preventDefault();
    
        if(user.password.length > 0 && user.repassword.length > 0 && user.password != user.repassword)
        {
          setPasswordMatch(true);
        }
        else setPasswordMatch(false);
      }
    
    
    const navigate=useNavigate();

    const submit=(e)=>{
        if(user.password != user.repassword)
        {
            toast.error('Password does not match', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        if(user.password.length < 8)
        {
            toast.error('Password must have atleast 8 characters.', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        e.preventDefault();
        confirmEmail(user.password,token);
        navigate('/login');

        toast.success('Password created successfully', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    
    return(
        <div className="mx-4 mt-4 flex flex-col">
            <Link className=' ml-0' to={`/login`}><i class="fa-sharp fa-solid fa-arrow-left text-3xl md:text-4xl"/></Link>
            <br/>
            <div className='text-xl md:text-2xl font-medium pb-3 text-center'>Create Password for your account</div>
            <div className='formshadow mx-auto w-3/4 md:w-1/3'>        
                <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" >
                    <form className='formcreateaccount flex flex-col justify-center' onSubmit={submit}  >
                        <div class="form-outline mb-2" className="proflogininput">
                            <input className='form-control' onKeyUp={validate_password} type='password' name='password' value={user.password} placeholder="Password" required autoFocus onChange={detectChanges} style={{"width":"100%"}}/>
                        </div>

                        <div class="form-outline mb-2" className="proflogininput">
                            <input className='form-control' onKeyUp={validate_password} name='repassword' value={user.repassword} type='password' placeholder="Confirm Password" required onChange={detectChanges} />
                            {passwordMatch?<div className='text-sm text-red-600 mt-1'>Password not matched</div>:""}
                        </div>

                        <button class="btn btn-primary btn-block btn-length w-1/2 md:w-1/3 mx-auto mt-2 mb-4" type="submit" >Submit</button>
                        
                    </form>
                </div>
                
            </div>   
        
        {/* <div className="center">
            <Link className='goback' to={`/owner`}><i class="fa-sharp fa-solid fa-arrow-left text-3xl md:text-4xl"/></Link>
            <br/>
            <h1>Create Password for your account</h1>
            <form onSubmit={submit} className='cardform' >
                <div className="text_field">
                    <input className='body2input' name='password' value={user.password} type="password" placeholder="password" required onChange={detectChanges}/>
                </div>
                <div id='passwordmatch' className='passwordmatch'>Password does not match</div>
                <div class="text_field">
                    <input className='body2input' name='repassword' value={user.repassword} type="password" placeholder="confirm password" required onChange={detectChanges}/>
                </div>
                <br/>
                <br/>
                <button className='cardbutton1' type="submit" >Confirm</button>
                <div className='divnote'>Use this password to login in to your account on BTP portal.</div>
            </form> */}
        </div>
)
}

export default Createpassword;