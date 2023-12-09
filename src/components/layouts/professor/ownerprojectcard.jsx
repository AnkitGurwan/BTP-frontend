import React from 'react';

function Ownerprojectcard(props){
    const {detail}=props;
   
    return(
    <div className='w-full font-Raleway'>
        <div class="py-1 flex items-start ml-0 md:ml-16 mr-4 border rounded bg-gray-100">
            <div class="flex flex-col items-start md:flex-row px-4 py-1">
            <h5 class="font-Manrope md:font-bold items-center my-auto md:pr-6">Project Supervisor :-</h5>
            <div class="pr-12 text-muted font-medium flex items-center justify-center text-lg my-auto md:text-xl pr-4 pt-1 md:pt-0 capitalize"><i class="fa-solid fa-user text-md pr-2"></i>{detail.name}</div>
            <div class="text-muted font-medium flex items-center justify-center text-lg my-auto pt-1 md:pt-0"><i class="fa-solid fa-envelope pr-2 pt-1"></i> {detail.email}</div>
            </div>
        </div>
    </div>
)};
export default Ownerprojectcard