import React,{useContext,useEffect,useState} from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemContext from '../../../context/project/ItemContext';
import AuthContext from '../../../context/authentication/AuthContext';

function Projectcard(props){
    const {project}=props;
    const {deleteProject} = useContext(ItemContext);
    const navigate=useNavigate();
    const {user,ownerdetails} = useContext(AuthContext);
    const params=useParams();
    const id=params.id;

    const getItem=async ()=>{
      const x = await ownerdetails(id);
    }
    useEffect(()=>{
      getItem();
    },[])

    
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
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const click=()=>{}

    const clickHandler = async (e)=>{
        e.preventDefault();
        const x=await deleteProject(id);
        if(x===200)
        {
        navigate('/owner');
        toast.success('Deleted successfully', {
          position: toast.POSITION.TOP_CENTER
      });
      }
      else if(x===403)
      {
          navigate('')
        toast.error('You cannot delete projects of others', {
          position: toast.POSITION.TOP_CENTER
      });
      }
      }

    return(
        <div className='w-full py-2 font-Manrope'>    
            <div class="px-6 py-3 rounded-lg border-4 bg-gray-100" style={{"width":"auto","height":"auto"}}>
              <div class="card-body" style={{"display":"flex","flexDirection":"column","alignItems":"start"}}>
                <h4 class="card-title p-2 mb-2 rounded-sm bg-gray-300"><i class="fa-solid fa-book text-md" style={{"backgroundColor":"transparent","paddingRight":"0.5rem"}}></i>{project.title}</h4>
                
                <h4 class="text-muted text-sm mb-0 pb-0" style={{}}><i class="fa-solid fa-user text-sm" style={{"backgroundColor":"transparent","paddingRight":"0.5rem"}}></i>{project.co_supervisor}<h6 className='text-sm'>(co-supervisor)</h6></h4>
                <hr className='w-full'/>
                <p className='text-start text-sm my-0'>{project.brief_abstract}</p>
                <hr className='w-full'/>
                <p class="flex flex-col"><h5 className='flex items-center mb-0'><span class="material-symbols-outlined pr-1">
                school
                </span><div className='text-sm m-0 '>Specialisation</div></h5><div className='text-sm pl-2'>{project.specialization}</div></p>
                <h6 class="card-title text-sm">Created on {project.creation_date} </h6>
                <h6 class="card-title pb-0 text-sm">Created at {project.creation_time} </h6>
                <button id="myBtn" className='projectcardlink22' onclick={click}>Delete</button>
              </div>
            </div>
            {/* modal */}
                
            <div id="myModal" class="modal">
              <div class="modal-content">
                <span class="close">&times;</span>
                <p className='modalp'>Are you sure you want to delete? <Link className='projectcardlink22a' onClick={clickHandler}>Delete</Link></p>
              </div>
            </div>
            
      </div>

)};

export default Projectcard;