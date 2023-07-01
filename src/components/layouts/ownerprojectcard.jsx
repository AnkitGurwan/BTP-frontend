import React from 'react';

function Ownerprojectcard(props){
    const {detail}=props;
   
    return(
    <div className='w-full'>
        <div class="w-full flex items-center ml-0 md:ml-16 border rounded bg-gray-100">
            <div class="flex flex-col items-start md:flex-row px-4 py-2">
            <h4 class="font-semibold md:font-bold items-center my-auto md:pr-6">Posted by :-</h4>
            <h5 class="pr-4 text-muted flex items-center justify-center text-lg my-auto md:text-xl pr-4 pt-1 md:pt-0"><i class="fa-solid fa-user text-md pr-2"></i> {detail.name}</h5>
            <h5 class="text-muted flex items-center justify-center text-lg my-auto pt-1 md:pt-0"><i class="fa-solid fa-envelope pr-2"></i> {detail.email}</h5>
            </div>
        </div>
    </div>
)};
export default Ownerprojectcard