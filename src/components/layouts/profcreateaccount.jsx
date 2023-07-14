import React,{useState, useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/authentication/AuthContext';

const Createaccount=()=>{

    const {registerUser} = useContext(AuthContext);
    const [user, setUser] = useState({ name: "", email: "" });
    const detectChanges = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    };
    const navigate=useNavigate();

    const submit = async (e)=>{
        console.log("111")
        e.preventDefault();
        const x=await registerUser(user.name, user.email);

        if(x===200){
          toast.success('Email sent successfully', {
            position: toast.POSITION.TOP_CENTER
        });
        navigate('/login');
        }
        else if(x===400){
          toast.warning('Email already exist', {
            position: toast.POSITION.TOP_CENTER
        });
        }
    }
    
    const newfunc=async ()=>{
      navigate('/login');
    }

  return(   
        <div className="centerrr">
            <div className='formshadow'>    
                <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li class="nav-item" role="presentation">
                        <div class="nav-link active" className="newfunc3" id="tab-login" data-mdb-toggle="pill" role="tab"
                        aria-controls="pills-login" aria-selected="true"  onClick={newfunc}>Login</div>
                    </li>
                    <li class="nav-item" role="presentation">
                        <div class="nav-link" className="newfunc4"  id="tab-register" data-mdb-toggle="pill" role="tab"
                        aria-controls="pills-register" aria-selected="false">Register</div>
                    </li>
                </ul>
    
                
                    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" >
                        <form className='formcreateaccount' onSubmit={submit}  >
                            <div class="form-outline mb-2" className="proflogininput">
                                <input className='form-control'  name='name' value={user.name} placeholder="Name" required autoFocus onChange={detectChanges} style={{"width":"100%"}}/>
                            </div>

                            <div class="form-outline mb-2" className="proflogininput">
                                <input className='form-control' name='email' value={user.email} type='email' placeholder="Email" required onChange={detectChanges} />
                            </div>

                            <button class="btn btn-primary btn-block btnlength" type="submit" >Signup</button>
                            <div className='text-red-600 text-center py-2 text-sm'>NOTE : Once you "Signup" you will receive a mail on this Email account.</div>
                        </form>
                    </div>
                
            </div>   
        </div>
        )
}
export default Createaccount;