import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import ItemContext from '../../../context/project/ItemContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var _ = require('lodash');

const NewProject = () => {
    const { createProject } = useContext(ItemContext);
    const [itemData, setItemData] = useState({ title: "", abstract: "", cosupervisor: "", specialization: "", date: "", time: "", isbanned: false })

    const onChangeHandler = (e) => {
        setItemData({ ...itemData, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const x = await createProject(itemData.title, itemData.abstract, itemData.cosupervisor, itemData.specialization, itemData.date, itemData.time, itemData.isbanned);

        if (x === 200) {
            navigate('/owner');
            toast.success('Project created successfully', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return (
        <div className="py-4" style={{ "position": "absolute", "width": "100vw", "top": "15vh", "left": "0", }}>
            <Link className='goback' to={`/owner`}><i className="fa-sharp fa-solid fa-arrow-left fa-2xl" /></Link>
            <div className="cardheaddiv">Create New Project</div>
            <form className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={submit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                        Project Title
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Enter project title"
                        name="title"
                        autoFocus
                        onChange={onChangeHandler}
                        value={itemData.title}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Brief Abstract:
                    </label>
                    <textarea
                        id="message"
                        rows="5"
                        className="block w-full text-m text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3 py-2"
                        placeholder="Write project details..."
                        name="abstract"
                        onChange={onChangeHandler}
                        value={itemData.abstract}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="confirm-password">
                        Co-Supervisor
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirm-password"
                        type="text"
                        placeholder="Name of Co-Supervisor"
                        name="cosupervisor"
                        onChange={onChangeHandler}
                        value={itemData.cosupervisor}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Specialization:
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter the specialization"
                        name="specialization"
                        onChange={onChangeHandler}
                        value={itemData.specialization}
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewProject;
