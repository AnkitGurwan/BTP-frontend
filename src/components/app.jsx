import React from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';

import Interface from './pages/interfacepage';
import Proflogin from './pages/profloginpage';
import Studentlogin from './pages/studentloginpage';
import Profcreateaccountpage from './pages/profcreateaccountpage';
import Createpassword from './pages/createpasswordpage';
import Forgotpassword from './pages/forgotpasswordpage';
import ProfallProjectpage from './pages/profallprojectpage'
import OwnerProjectpage from './pages/ownerprojectpage'
import AuthState from "../context/authentication/AuthState";
import Resetpasswordinterface from './pages/resetpasswordinterfacepage';
import Newprojectpage from './pages/newprojectpage';
import Readmoreproject1 from './pages/readmorepage2';
import Readmoreproject2 from './pages/readmorepage';
import Updateproject from './pages/updateprojectpage';
import Studentallproject from './pages/studentallprojectpage';
import Studentspecificproject from './pages/studentspecificprojectpage';
import StudentFeedback from './pages/studentFeedbackPage';
import ProfFeedback from './pages/profFeedbackPage';
import Newpage from './pages/newpage';
import ItemState from '../context/project/ItemState';


function App(){
    return(
        <AuthState>
            <ItemState>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Interface/>}/>
                        <Route path='/login' element={<Proflogin/>}/>
                        <Route path='/studentlogin' element={<Studentlogin/>}/>
                        <Route path='/createaccount' element={<Profcreateaccountpage/>}/>
                        <Route path='/set-password/:token' element={<Createpassword/>}/>
                        <Route path='/resetpassword' element={<Forgotpassword/>}/>
                        <Route path='/reset-set-password/:email/:token' element={<Resetpasswordinterface/>}/>
                        <Route path='/mainpage' element={<ProfallProjectpage/>}/>
                        <Route path='/owner' element={<OwnerProjectpage/>}/>
                        <Route path='/studentallproject' element={<Studentallproject/>}/>
                        <Route path='/studentallproject/:id' element={<Studentspecificproject/>}/>
                        <Route path='/owner/newproject' element={<Newprojectpage/>}/>
                        <Route path='/mainpage/:id' element={<Readmoreproject1/>}/>
                        <Route path='/owner/:id' element={<Readmoreproject2/>}/>
                        <Route path='/owner/update/:id' element={<Updateproject/>}/>
                        <Route path='/newpage' element={<Newpage/>}/>
                        <Route path='/studfeedback' element={<StudentFeedback/>}/>
                        <Route path='/proffeedback' element={<ProfFeedback/>}/>
                    </Routes>
                </BrowserRouter>
            </ItemState>
              
        </AuthState>
        
        )}
export default App;