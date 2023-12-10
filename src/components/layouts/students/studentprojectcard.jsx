import React from 'react';
import { Link } from 'react-router-dom';


const Projectcard = (props) => {
    const {project}=props;
    const idtoken=props.idtoken;
   
    return(
    <div className='mx-auto projectcardmaindiv' style={{'fontFamily':'Raleway'}}>
        
            <div class="border-2 rounded-lg bg-gray-100">
            <div class="card-body  text-center py-3 w-full ">
                <div class="px-2 break-words text-sm font-semibold md:text-lg tracking-normal leading-4 md:leading-5">{project.title.slice(0,40)}...</div>
                <hr/>
                <h5 class="card-subtitle text-xs md:text-sm text-muted" style={{"text-align":"center"}}>{project.co_supervisor}<h6 className='text-xs md:text-sm' style={{"text-align":"center"}}>(co-supervisor)</h6></h5>
                
                <p class="card-text pb-0 md:pb-4 text-xs md:text-sm px-2 pt-2" style={{"text-align":"center"}}>{project.brief_abstract.slice(0,120)}<Link to={project._id} className='no-underline px-1 font-medium'>...read more</Link></p>
                <p class="card-text text-xs md:text-sm pb-1" style={{"display":"flex","flexDirection":"column","alignItems":"center"}}><h6 className='m-0 text-xs md:text-sm font-medium'>Specialization</h6><div className='text-xs md:text-sm pb-0'>{project.specialization}</div></p>
                <h6 class="card-title text-xs md:text-sm pb-1" style={{"text-align":"center"}}>{project.creation_date} </h6>
                <h6 class="card-title text-xs md:text-sm pb-1" style={{"text-align":"center"}}>{project.creation_time} </h6>
                <div className='projectcardupdate'>
                <Link className='projectcardlink1 mr-3 mt-1' to={project._id} state={{idtoken:idtoken}} >
                    <span class="material-symbols-outlined">group_add</span>
                </Link>
                </div>                
            </div>
        </div>
    </div>
    )}

export default Projectcard;