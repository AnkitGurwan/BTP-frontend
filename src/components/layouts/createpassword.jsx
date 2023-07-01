import React,{useState, useContext} from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/authentication/AuthContext';

const Createpassword = () => {

    const {confirmEmail} = useContext(AuthContext);
    const params = useParams();
    const token = params.token;

    const [user, setUser] = useState({ password: "", repassword: "" });

    const detectChanges = async(e)=>{
        setUser({...user,[e.target.name]:e.target.value});   
    }

    const input=document.getElementById('passwordmatch');
    
    if(user.password===user.repassword)
    {
        if(input)
        input.className='passwordmatch'
    }
    else {if(input)input.className='passwordnotmatch'}
    
    const navigate=useNavigate();

    const submit=(e)=>{
        e.preventDefault();
        confirmEmail(user.password,token);
        navigate('/mainpage');

        toast.success('Password created successfully', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    
    return(
        <div className="center">
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
            </form>
        </div>
)
}

export default Createpassword;