import React, { useContext } from "react";
import AuthContext from '../../../context/authentication/AuthContext';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const Test = () => {
    const { downloadDetails } = useContext(AuthContext);
    const email = "riyehok530@razuz.com";

    const download = async (e) => {
        e.preventDefault();
        await downloadDetails(email);
    }

    return (
        <div>
            <form onSubmit={download}>
                <div>hii</div>
                <button type="submit">Download</button>
            </form>
            
            {/* <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={interest.current}
            >
                <button> Export excel </button>
            </DownloadTableExcel>

            <table ref={interest}>
                <tbody>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Age</th>
                    </tr>
                    <tr>
                        <td>Edison</td>
                        <td>Padilla</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>Alberto</td>
                        <td>Lopez</td>
                        <td>94</td>
                    </tr>
                </tbody>
            </table>
            */}
        </div>
    );
}

export default Test;
