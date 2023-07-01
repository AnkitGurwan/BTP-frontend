import React from 'react';

function Projectcard(props){
    const {project}=props;
   
    return(
    <div className='projectcardmaindiv'>
            <div class="border-2 rounded-lg bg-gray-100">
                <div class="card-body text-center px-1 py-2 w-full">
                    <h4 class="card-title px-2" style={{"fontSize":"16px"}}>{project.title}</h4>
                    <hr/>
                    <h6 class="card-subtitle pb-2 text-muted" style={{"display":"flex","flexDirection":"column","alignItems":"center","textAlign":"center"}}>{project.co_supervisor}<h6 className='text-sm'>(co-supervisor)</h6></h6>
                    <p class="card-text text-sm flex flex-col text-center px-2">{project.brief_abstract.slice(0,100)}<a href={`mainpage/${project._id}`} className='text-sm font-medium' style={{"textDecoration":"none"}}>...read more</a></p>
                    <p class="card-text flex flex-col py-1 md:py-2 text-center"><h6 className='m-0'>Specialization</h6><div className='text-sm'>{project.specialization}</div></p>
                    <h6 class="card-title text-sm mb-1">{project.creation_date} </h6>
                    <h6 class="card-title text-sm mb-1">{project.creation_time} </h6>   
                </div>
            </div>
    </div>
    )}

export default Projectcard;