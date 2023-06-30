import { useState } from "react";
import AuthContext from "./AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";


const AuthState = (props) => {
    const [user,setUser]=useState([])
    const [token,setToken]=useState()
    const [interest,setInterest]=useState([])

    const url = process.env.REACT_APP_BACKEND_URL;

    const registerUser = async (name, email) => {
        const response = await fetch(`${url}/user/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        });
        
        const json = await response.json();
        
        return response.status
        // setUser(user.concat(json));
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
        
        // setUser(user.concat(json));
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
        return response.status
       
        // setUser(user.concat(json));
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
        
        // setUser(user.concat(json));
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
    
        // console.log("useritem:- ",json)
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
            setInterest(json)
            
        
            // console.log("useritem:- ",json)
            }


    const downloadDetails = async(email)=>{
        console.log("Download1");

        const response = await fetch(`${url}/project/intrestedpeople/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            }
        })

        console.log("Download2");
        const json=await response.json();
        console.log(json)
       
        }

    
    
    // const SigninStudent = async ()=> {
    // var x=100;
    // const msalConfig = {
    //     auth: {
    //       clientId: "9ea87694-877c-4d59-b65e-c4a3fd12799c",
    //       authority: "https://login.microsoftonline.com/common",
    //       redirectUri: "http://localhost:3000/studentallproject",
    //     },
    //     cache: {
    //       cacheLocation: "localStorage", // This configures where your cache will be stored
    //       storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    //     }
    //   };  
        
    //   // Add here the scopes to request when obtaining an access token for MS Graph API
    //   // for more, visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/docs/scopes.md
    //   const loginRequest = {
    //     scopes: ["openid", "profile", "User.Read"]
    //   };
      
    //   // Add here scopes for access token to be used at MS Graph API endpoints.
    //   const tokenRequest = {
    //     scopes: ["Mail.Read"]
    //   };
    
    // const myMSALObj = new Msal.UserAgentApplication(msalConfig);

    // await myMSALObj.loginPopup(loginRequest)
    //       .then(loginResponse => {
            
    //         // console.log('id_token acquired at: ' + new Date().toString());
            
    //         if (myMSALObj.getAccount()) {
    //          setToken(loginResponse.idToken)
    //          x=200;
             
    //         }
    //       }).catch(error => {
           
    //         console.log(error);
    //       });

    //       return x;
    //   }


      const studentDetails = async()=>{
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/microsoft`;
        // window.location.href = "http://localhost:5000/auth/microsoft";
        
    }

      const getToken = async(code)=>{
        console.log("step11")
        // console.log(codeSub)
        // const code=codeSub.substring(0, codeSub.indexOf("&"));
        // console.log("code",code)
        const response = await fetch(`${url}/auth/microsoft/getToken`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Code': code
            }
        });

        const json=await response.json();

        console.log(json)
        console.log(json.studInformation)
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