import React from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';

import Interface from './pages/interFacePage.jsx';
import Proflogin from './pages/profLoginPage';
import Studentlogin from './pages/studentLoginPage';
import Profcreateaccountpage from './pages/profcreateAccountPage';
import Createpassword from './pages/createPasswordPage';
import Forgotpassword from './pages/forgotPasswordPage';
import ProfallProjectpage from './pages/profallProjectPage'
import OwnerProjectpage from './pages/ownerProjectPage'
import AuthState from "../context/authentication/AuthState";
import Resetpasswordinterface from './pages/resetPasswordInterfacePage';
import Newprojectpage from './pages/newProjectPage';
import Readmoreproject1 from './pages/readMorePage2';
import Readmoreproject2 from './pages/readMorePage';
import Updateproject from './pages/updateProjectPage';
import Studentallproject from './pages/studentallProjectPage';
import Studentspecificproject from './pages/studentSpecificProjectPage';
import StudentFeedback from './pages/studentFeedbackPage';
import ProfFeedback from './pages/profFeedbackPage';
// import Newpage from './pages/newpage';
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
                        {/* <Route path='/newpage' element={<Newpage/>}/> */}
                        <Route path='/studfeedback' element={<StudentFeedback/>}/>
                        <Route path='/proffeedback' element={<ProfFeedback/>}/>
                    </Routes>
                </BrowserRouter>
            </ItemState>
              
        </AuthState>
        
        )}
export default App;