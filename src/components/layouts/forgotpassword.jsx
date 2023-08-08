import React,{useState, useContext}  from 'react';
import { useNavigate} from 'react-router-dom';
import AuthContext from '../../context/authentication/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpassword=()=>{

    const {resetPassword} = useContext(AuthContext);
    const [em, setEm] = useState({email:""});
    const detectChanges = (e)=>{
        setEm({...em,[e.target.name]:e.target.value});
    }

    const Navigate=useNavigate();

    const submit = async (e)=>{
        e.preventDefault();
        const x = await resetPassword(em.email);
        
        if(x === 404)
        toast.error('Cannot Change Password For This Email', {
        position: toast.POSITION.TOP_CENTER    
        });
        else if(x === 400)
        toast.error('User not exist', {
        position: toast.POSITION.TOP_CENTER    
        });
        else
        {
            Navigate(`/login`) ;
            toast.success('Email sent successfully', {
            position: toast.POSITION.TOP_CENTER
            });
        }
        }

    return(
            <div className="centerfull">
                <br/>
                <h1>Enter your Gmail</h1>
                <form onSubmit={submit} className='resetform'>
                    <div class="text_field">
                        <input className='resetpasswordinput' type="email" name='email' value={em.email} placeholder="Email  (including @gmail.com)" required onChange={detectChanges}/>
                    </div>
                    <button id='button' type="submit">Send</button>
                    <div className='divnote'>You will receive a mail on this Email account to change your password.</div>
                </form>
            </div>
)
}
export default Forgotpassword;