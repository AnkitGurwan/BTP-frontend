import { useState } from "react";
import AuthContext from "./AuthContext";
import 'react-toastify/dist/ReactToastify.css';


const AuthState = (props) => {
    const [user,setUser]=useState([])
    const [token,setToken]=useState()
    const [interest,setInterest]=useState([])

    const url = "https://btp-6ona.onrender.com"


    const registerUser = async (name, email) => {
        const response = await fetch(`${url}/user/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        });
        
        const json = await response.json();
        return response.status;
    }

    const loginUser = async (email,password) => {
        const response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const json = await response.json();
        localStorage.setItem('token', json.token);
        return response.status;
    }

    const confirmEmail = async (password,token) => {
        const response = await fetch(`${url}/user/confirm-email/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password })
        });
        
        const json = await response.json();
        console.log(json);
    }

    const resetPassword = async (email) => {
        const response = await fetch(`${url}/user/resetpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const json = await response.json();
        return response.status;
    }

    const resetpasswordconfirmEmail = async (email,password,token) => {
        const response = await fetch(`${url}/user/resettingpassword/${email}/${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password })
        });
        
        const json = await response.json();
        return response.status;
    }

    const loginStudent = async (email, password)=>{
        const response = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        return (response.status);
    }

    const ownerdetails = async(id)=>{
        const response = await fetch(`${url}/project/ownerdetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token':localStorage.getItem('token')
            }
        })

        const json=await response.json();
        setUser(json);
        return response.status;
        }

    const projectdetails = async(id)=>{
    
        const response = await fetch(`${url}/project/projectdetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token':localStorage.getItem('token')
            }
        })

        const json=await response.json();
        setInterest(json);
        return response.status;
        }


    const downloadDetails = async(email)=>{
        const response = await fetch(`${url}/project/intrestedpeople/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            }
        })

        const json=await response.json();
        return response.status;
        }

      const studentDetails = async()=>{
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/microsoft`;
    }

      const getToken = async(code)=>{
        const response = await fetch(`${url}/auth/microsoft/getToken`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Code': code
            }
        });

        const json=await response.json();
        localStorage.setItem('name',json.studInformation.givenName);
        localStorage.setItem('id',json.studInformation.mail);
        localStorage.setItem('roll',json.studInformation.surname);
        localStorage.setItem('job',json.studInformation.jobTitle);
    }
    

    return (<AuthContext.Provider value={{registerUser,getToken,loginUser,confirmEmail,resetPassword,resetpasswordconfirmEmail,loginStudent,ownerdetails,user,token,downloadDetails,interest,projectdetails,studentDetails}}>
        {props.children}
    </AuthContext.Provider>
    )
}
export default AuthState;