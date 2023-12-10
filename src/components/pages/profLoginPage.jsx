import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../layouts/interfacePageHeader';
import Proflogin from '../layouts/professor/profLogin';

const Mainlogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('btpToken')) {
            navigate(`/owner`);
        }
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div>
            <Header />
            <div>
                <Link to={`/`}><i className="bg-blue-200 rounded-full fa-sharp fa-solid fa-arrow-left mx-2 md:mx-4 mt-3 md:mt-5 text-2xl md:text-3xl p-2"/></Link>
                <Proflogin />
            </div>
        </div>
    );
};

export default Mainlogin;
