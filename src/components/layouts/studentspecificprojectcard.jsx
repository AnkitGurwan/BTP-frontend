import React,{useContext,useEffect,useState} from 'react';
import { Link,useParams } from 'react-router-dom';
import ItemContext from '../../context/project/ItemContext';
import AuthContext from '../../context/authentication/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { upperCase } from 'lodash';


const Projectcard = () =>{
  
    const {selectproject,deselectproject,ownerdetails,details,allProjects,createStudent} = useContext(ItemContext);
    const [itemData, setItemData] = useState({ name:"",partnerId:"",partnerRoll:"",isbanned:false })
    const items = useSelector(state => state.allProjects.allProjects);
    const [studentRegisteredCount,setStudentRegisteredCount]=useState(0);
    const [isRegistered,setIsRegistered]=useState(0);

    const params=useParams();
    const id=params.id;

    const project=items.filter((project)=>project._id===id).map((project,i)=>{return project});


    //check if user has registered for the project or not
   const user=localStorage.getItem('studId');


    const checker =()=>{
      project[0].intrestedPeople.map((emailcheck)=>{setStudentRegisteredCount(studentRegisteredCount+1);if(emailcheck===user)setIsRegistered(1);});
    }
    
    const Store = [];  

    const getItem = async ()=>{
      await ownerdetails(id);
      await allProjects();
      checker();
    }
    
    useEffect(()=>{
      getItem();  
    },[]);
    
    Store.push(details);

    
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    if(btn){
    btn.onclick = function() {
      modal.style.display = "block";
    }}

    // When the user clicks on <span> (x), close the modal
    if(span){
    span.onclick = function() {
      modal.style.display = "none";
    }}

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }


    const click=()=>{}


    const onChangeHandler = (e) => {
      (setItemData({...itemData,[e.target.name]:e.target.value}));
    }

    const user1email=localStorage.getItem('studId');
    const user2email=itemData.partnerId;

    const submit = async (e)=>{
          document.getElementById('myButton').classList.add('animate-pulse');
          e.preventDefault();
          document.getElementById("myBtn").style.width='140px'
          
          if(document.getElementById("myBtn").innerText==="Register"){
          const x=await selectproject(id,user1email,user2email);

          //check
          if(x===200){
            toast.success('Registered Successfully', {
              position: toast.POSITION.TOP_CENTER
          });
            setIsRegistered(1);
            document.getElementById("myBtn").className="projectcardlink2230a";
            document.getElementById("myBtn").innerText="De-Register"; 
            modal.style.display = "none";
            
          }
          else if(x===403)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('Given Id does not exist. Please ask your "Partner" to login to website once before Register.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
            else if(x===350)
            {
              toast.error('Please Select A Partner.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
          else if(x===400)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('Already Registered', {
                position: toast.POSITION.TOP_CENTER
            });
          }

        else if(x===401)
          {
            document.getElementById('myButton').classList.remove('animate-pulse');
            toast.error('You have already Registered for a project', {
              position: toast.POSITION.TOP_CENTER
          });
          }
          }
            //already registered
            else { 
              const x=await deselectproject(id,user);
              //check
              if(x===200){
                document.getElementById('myButton').classList.remove('animate-pulse');
                setIsRegistered(0);
              
                toast.success('De-Registered', {
                  position: toast.POSITION.TOP_CENTER
              });          
                document.getElementById("myBtn").className="projectcardlink223";
                document.getElementById("myBtn").innerText="Register"; 
                modal.style.display = "none"; 
        }
            if(x===400)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('No Project Alloted Yet.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
      
            if(x===401)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('This Project is not alloted to you.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
              }   
      }
   

    return(
        <div className='projectcardmaindivv1'>
          <div class="px-6 py-3 rounded-lg border-4 bg-gray-100" style={{width:"90vw",height:"auto"}}>
            <div class="card-body">
                <h2 class="card-name flex items-center"><i class="fa-solid fa-book text-xl md:text-2xl" style={{"backgroundColor":"transparent","paddingRight":"0.5rem"}}></i>{project[0].title}</h2>
                <h5 class="card-subtitle text-muted ">
                  <div className='flex items-center'><span class="material-symbols-outlined pr-1">
                person
                </span><div className='text-lg md:text-xl'>{project[0].co_supervisor}</div></div><h6 className='text-sm'>(co-supervisor)</h6>
                </h5>
                <hr/>
                <p class="card-text font-sans pl-2 pb-2">{project[0].brief_abstract}</p>
                <hr/>
                <p class="card-text pb-0 md:pb-4"><h5 className='flex items-center pb-0 mb-0'><span class="material-symbols-outlined pr-1">
                school
                </span><div className='font-semibold text-sm md:text-lg '>Specialization</div></h5><div className='pl-0 text-sm pl-1'>{project[0].specialization}</div></p>
                <h6 class="card-name text-sm  flex">Created on {project[0].creation_date} <div className='pl-1 text-xs my-auto'>(day, month, year)</div> </h6>
                <h6 class="card-name text-sm">Created at {project[0].creation_time} </h6>
                  
                {isRegistered===1?(<button id="myBtn" className='projectcardlink2230a mt-4' onclick={click}>De-Register</button>):
                studentRegisteredCount===2?(<div className='mt-4' style={{"textAlign":"center","color":"red","fontSize":"larger","fontWeight":"600"}}>2 Students have already registered for this project.</div>):
                (<button id="myBtn" className='projectcardlink223 mt-4' no-autoFocus onclick={click}>Register</button>)}
                
                

                {/* modal on new project */}
            {isRegistered===1?(<div id="myModal" class="modal">
                    <div class="modal-content">
                    <span class="close">&times;</span>
                    
                    <p id='myButton' className='modalp'>Are you sure you want to De-register? <Link className='projectcardlink222a' onClick={submit}>De-Register</Link></p>
                     </div>
                </div>):(
            <div id="myModal" class="modal2">
                <div class="modal-content3">
                  <span class="close pt-1 " style={{"justify-content":"start","height":"60px"}}>&times;</span>
                  <form class="w-100 mx-auto bg-white px-6 mb-3" onSubmit={submit}>
                    
                    <div class="mb-12 ">
                      <label class="block text-gray-600 text-sm font-bold mb-2 d-flex justify-content-start items-center" for="confirm-password">
                     
                      Partner Outlook id <div class='px-1 font-medium'>(including @iitg.ac.in)</div>
                      </label>
                      <input
                        class="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirm-password"
                        type="email"
                        placeholder="Outlook id"
                        name="partnerId"
                        onChange={onChangeHandler}
                        value={itemData.partnerId}
                        required
                      />
                    </div>
                    
                    <div class="flex items-center justify-center">
                      <button id='myButton' class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-100" type="submit">
                        Register
                      </button>

                    </div>
                  </form>
                </div>
              </div>)}
            </div>
            {/* modal */}      
            
        </div>
    </div>
    )}

export default Projectcard;