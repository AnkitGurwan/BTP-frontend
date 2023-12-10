import React from 'react';

function Header(){
    return(
            <header className='flex p-1 items-center' style={{'backgroundColor':'#10A19D'}}>
                <img className='headerimage' src='https://iitg.ac.in/mech/static/images/logo.png'/>
                <div className='headerdiv'>
                    <div className='text-white text-xs md:text-3xl font-bold'>
                    Department of Mechanical Engineering
                    </div>
                    <div className='text-xs md:text-2xl text-gray-200 font-medium tracking-normal leading-wide'>Indian Institute of Technology Guwahati</div>
                </div>
                <a href='https://iitg.ac.in/mech/academics/undergraduate/latest/sem-5/btp-phase-i/' className='text-white no-underline text-xs md:text-xl sm:mx-2 md:mx-6 font-normal md:font-medium'>BTP Phase 1</a>
                <a href='https://iitg.ac.in/mech/academics/undergraduate/latest/sem-5/' className='text-white no-underline text-xs md:text-xl mx-2 md:mx-4 font-normal md:font-medium'>Sem 5</a>
            </header>
    )
}

export default Header;