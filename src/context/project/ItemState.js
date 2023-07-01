import react, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setSpecificProjects, setAllProjects, delProject, addProject, editProject } from "../../Redux/allProjects/allprojectsSlice";
import { setAllStudents } from "../../Redux/student/studentSlice"
import ItemContext from "./ItemContext";
import { addStudent } from "../../Redux/student/studentSlice";
var _ = require('lodash');



const ItemState=(props)=>{
    // const {token} = useContext(AuthContext);

    const [items,setItems]=useState([]);
    const [itemsspecific,setItemsspecific]=useState([]);
    const [details,setDetails]=useState([]);
    const [single,setSingle]=useState([]);
    const [partner,setPartner]=useState([]);

    const url = process.env.REACT_APP_BACKEND_URL;
    const dispatch = useDispatch();

    
    const allProjects=async()=>{
        const response = await fetch(`${url}/project/allprojects`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token':localStorage.getItem('token')
            }
        });
        const json=await response.json();
        json.map((value)=>{if(value)value.title=_(value.title).capitalize()})
        json.map((value)=>{if(value)value.co_supervisor=_(value.co_supervisor).capitalize()})
        json.map((value)=>{if(value)value.brief_abstract=_(value.brief_abstract).capitalize()})
        json.map((value)=>{if(value)value.specialization=_(value.specialization).capitalize()})
        setItems(json);

        dispatch(setAllProjects(json));

       
        return response.status;
    };

    const Projectspecific=async()=>{  
        const response = await fetch(`${url}/project/projectsposted`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token':localStorage.getItem('token')
            }
        })

        const json=await (response.json())        
        json.map((value)=>{if(value)value.title=_(value.title).capitalize()})
        json.map((value)=>{if(value)value.co_supervisor=_(value.co_supervisor).capitalize()})
        json.map((value)=>{if(value)value.brief_abstract=_(value.brief_abstract).capitalize()})
        json.map((value)=>{if(value)value.specialization=_(value.specialization).capitalize()})
        json.reverse();
        if(json)
        setItemsspecific(json);       

        dispatch(setSpecificProjects(json));
        

        console.log("status",response.status);
        return response.status;
        // for(let i = 0; i < json.length; i++) {
        //     console.log("10")
        //     dispatch(setSpecificProjects(json[i]));
        // }
        //   console.log(json)
        // console.log("useritem:- ",json)
    };

    const createProject = async (title,brief_abstract,co_supervisor,specialization) => {
            const response = await fetch(`${url}/project/newproject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({ title,brief_abstract,co_supervisor,specialization})
            });
            
            const json = await response.json(); 
            const newItem={ title,brief_abstract,co_supervisor,specialization};
            dispatch(addProject(newItem));
            return response.status;
            // setUser(user.concat(json));
    };

    const createStudent = async (userEmail,userName,userRoll) => {
        console.log("step2")
        const response = await fetch(`${url}/project/newstudent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail,userName,userRoll})
        });
        console.log("step6")
        
        const json = await response.json(); 
        console.log("json",json)
        return response.status;
        // setUser(user.concat(json));
};

    const updateProject = async (title,brief_abstract,co_supervisor,specialization,id) => {
            const response = await fetch(`${url}/project/updateproject/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({ title,brief_abstract,co_supervisor,specialization})
            });
            
            const json = await response.json();
            // setUser(user.concat(json));
    };


    const deleteProject=async(id)=>{
            const response = await fetch(`${url}/project/deleteproject/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json",
                    'auth-token':localStorage.getItem('token')
                }
            });
            dispatch(delProject(id));
            return response.status;
    };

    
    const selectproject=async(id,user,email)=>{       
            const response = await fetch(`${url}/project/projectaddition/${id}/${user}/${email}`,  {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            })
            console.log(response)
            
            // const stud={user,email};
            // if(response.status===200)
            // dispatch(addStudent(stud));
            return response.status
    };


    const deselectproject=async(id,user)=>{       
            const response = await fetch(`${url}/project/deselectproject/${id}/${user}`,  {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            })
            return response.status;
    };
        

    const ownerdetails=async(id)=>{          
            const response = await fetch(`${url}/project/ownerdetails/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json",
                        'auth-token':localStorage.getItem('token')
                    }
                })            
            const json=await response.json()
            setDetails(json)    
            return response.status;

            // console.log("useritem:- ",json)
    };


    const getAllStudent=async()=>{     
        console.log("step1")     
            const response = await fetch(`${url}/project/getallstudent`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json"
                    }
                })   
                console.log("step3")         
            const json=await response.json()
            dispatch(setAllStudents(json));
            console.log("json",json)
           return json;
            // console.log("useritem:- ",json)
    };

    const getSingleProject=async(id)=>{
        items.filter((project)=>project._id===id).map((project,i)=>{setSingle(project)  })
    }

    const logout=async()=>{
        
        const tenantID = process.env.MICROSOFT_GRAPH_TENANT_ID;
        const logoutEndpoint = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/logout?post_logout_redirect_uri=https://btp-frontend-chi.vercel.app/`;
        window.location.href = logoutEndpoint;
    }
    
        
    return (
        <ItemContext.Provider value={{details,logout,getAllStudent,allProjects,createStudent,items,createProject,updateProject,deleteProject,selectproject,deselectproject,ownerdetails,Projectspecific,itemsspecific,getSingleProject,single}}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemState;