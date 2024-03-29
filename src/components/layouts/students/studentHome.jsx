import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import ItemContext from '../../../context/project/ItemContext';
import Projectcard from './studentprojectcard';
import AuthContext from '../../../context/authentication/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Header from './navbarStudent'
import { toast } from 'react-toastify';
import '../styles.css'

const Createaccount = (req, res) => {
  const {
    allProjects,
    getAllStudent,
    createStudent,
    checkRegisteredFunc,
    logout
  } = useContext(ItemContext);
  const { getToken } = useContext(AuthContext);
  const students = useSelector((state) => state.student.allStudents);
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkRegistered, setCheckRegistered] = useState(false);
  const Navigate = useNavigate();
  const [count,setCount] = useState('');

  var items = useSelector((state) => state.allProjects.allProjects);

  const [searchParams, setSearchParams] = useSearchParams();
  const pId = students.filter((student) => student.email === localStorage.getItem('studId')).map((student, i) => {
    return student._id;
  });

  var flag = false;
  const partner = students
    .filter((student) => student.partner === pId[0])
    .map((student, i) => {
      flag = true;
      return student;
    });

  //check student allowed or not to access the page
  const funcAllowed = () => {
    // alert('true')
    if (localStorage.getItem('studRoll')) {
      if (
        `${process.env.REACT_APP_ROLL_LOW}` <= localStorage.getItem('studRoll') &&
        localStorage.getItem('studRoll') <= `${process.env.REACT_APP_ROLL_HIGH}`
      ) {
        setAllowed(true);
        setLoading(false);
      } else {
        setLoading(false);
        setAllowed(true);
      }
    } else {
      Navigate('/studentlogin');
      toast.error('Please login to access', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    // setAllowed(true)
    // setLoading(false)
  };

  
  const userName = localStorage.getItem('studName');
  const userId = localStorage.getItem('studId');
  

  const getItem = async () => {
    const code = searchParams.get('code');
    

    await allProjects();

    if (localStorage.getItem('studName') === null && code)
      await getToken(code);

    const accessToken = localStorage.getItem('accessToken');
    // alert(accessToken)
    const x = await checkRegisteredFunc(accessToken);
    // console.log("x",x)

    if (x[0] === 200) {
      setCount(x[1]);
      setCheckRegistered(true);
    }
    else if( x===400) setCheckRegistered(false);
    else if(x===401)
    {
      localStorage.clear('studName', 'studId', 'studRoll', 'studJob','accessToken');
      await logout();
      toast.success('Session Expired, Please Login again', {
          position: toast.POSITION.TOP_CENTER
      });
    }

    await getAllStudent();

    if (localStorage.getItem('studName'))
      await createStudent(
        localStorage.getItem('studId'),
        localStorage.getItem('studName'),
        localStorage.getItem('studRoll')
      );

    funcAllowed();
  };

  useEffect(() => {
    getItem();
    document.body.classList.add('disable-scrolling');
  }, []);

  const [search, setSearch] = useState('');
  const detectChanges = async (e) => {
    setSearch(e.target.value);
  };



  return (
    <div>
      {/* different header for student */}
      <Header/>
  
      {loading ? (
        <div class="flex items-center justify-center h-screen">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          {allowed ? (
            <div className=''>
              <nav class="bg-gray-800 py-1 pr-0 md:pr-12">
                <div class="max-w-7xl mx-auto px-0 lg:px-200">
                  <div class="relative flex items-center justify-between h-12">
                    <div class="flex items-center justify-start ml-2 md:ml-12">
                      <div class="input-group" className='searchdiv1'>
                        <i
                          class="fas fa-search text-xl"
                          style={{
                            color: "white",
                            paddingRight: "15px",
                            height: "100%",
                          }}
                        ></i>
                        <div class="form-outline">
                          <input
                            id="search-input"
                            type="search"
                            class="form-control border-none"
                            name='search'
                            placeholder="Search by Title name"
                            value={search}
                            onChange={detectChanges}
                            style={{
                              width: "30vw",
                              textAlign: "start",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center">
                      {!checkRegistered ? (
                        <div
                          className='text-xs md:text-lg p-1 bg-red-600 font-medium text-center text-white rounded-md mr-4'
                        >
                          Not Alloted
                        </div>
                      ) : (
                        <div
                          className='text-xs md:text-lg p-1 bg-green-600 font-medium text-center text-white rounded-md mr-4'
                        >
                          Alloted
                        </div>
                      )}
  
                      {!checkRegistered ? (
                        <div className='hidden md:flex'>
                          <div
                            class="text-gray-500 px-3 py-2 rounded-md text-xl font-x-large"
                            style={{ textDecoration: "none" }}
                          >
                            <i
                              class="fa-solid fa-book text-md"
                              style={{
                                backgroundColor: "transparent",
                                paddingRight: "0.5rem",
                              }}
                            ></i>
                            My Project
                          </div>
                          <div
                            class="text-gray-500  px-3 py-2 rounded-md text-xl font-x-large"
                            style={{ textDecoration: "none" }}
                          >
                            <i
                              class="fa-solid fa-userId text-md"
                              style={{
                                backgroundColor: "transparent",
                                paddingRight: "0.5rem",
                              }}
                            ></i>
                            My Partner
                          </div>
                        </div>
                      ) : (
                        <div className='hidden md:flex'>
                          <Link
                            to={`/studentallproject/${count}`}
                            class="text-gray-400 hover:text-white px-3 py-2 rounded-md text-lg font-x-large"
                            style={{ textDecoration: "none" }}
                          >
                            <i
                              class="fa-solid fa-book text-md"
                              style={{
                                backgroundColor: "transparent",
                                paddingRight: "0.5rem",
                              }}
                            ></i>
                            My Project
                          </Link>
                          <a
                            href='#partner'
                            class="text-gray-400 hover:text-white px-3 no-underline py-2 rounded-md text-lg font-x-large z-10"
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            <i
                              class="fa-solid fa-userId text-md"
                              style={{
                                backgroundColor: "transparent",
                                paddingRight: "0.5rem",
                              }}
                            ></i>
                            My Partner
                          </a>
                        </div>
                      )}
                      <a
                        href='#course'
                        class="hidden md:flex text-gray-400 hover:text-white px-2 md:px-3 py-2 rounded-md text-xs  md:text-lg "
                        style={{ textDecoration: "none" }}
                      >
                        About Course
                      </a>
  
                      {mobileMenu ? (
                        <div
                          className='flex md:hidden'
                          onClick={() => setMobileMenu(false)}
                        >
                          <span class="material-symbols-outlined text-white text-xl ml-12 mr-2">
                            cancel
                          </span>
                        </div>
                      ) : (
                        <div
                          className='flex md:hidden'
                          onClick={() => setMobileMenu(true)}
                        >
                          <span class="material-symbols-outlined text-white text-xl md:ml-12 mr-2">
                            menu_open
                          </span>
                        </div>
                      )}
  
                      {mobileMenu && (
                        <div className='flex flex-col md:hidden mt-12 z-10 border bg-white px-4 top-4 rounded-sm fixed right-8 cursor-pointer '>
                          <a
                            href={`/studentallproject/${count}`}
                            className='text-gray-600 no-underline hover:text-gray-700 py-2 border-b'
                          >
                            My Project
                          </a>
                          <a
                            href='#partner'
                            className='text-gray-600 hover:text-gray-700 py-2 border-b no-underline'
                            onClick={() => setMobileMenu(false)}
                          >
                            My Partner
                          </a>
                          <a
                            href='#course'
                            className='text-gray-600 no-underline hover:text-gray-700 py-2 border-b'
                          >
                            About Course
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </nav>
  
              <div class="split px-8 py-2 bg-gray-800 text-white">
                <div>
                  <h1 class="heading  light text-2xl md:text-3xl">Welcome,</h1>
                  <h1 class="heading bold light text-2xl md:text-3xl">
                    {userName}
                  </h1>
                  <p class="text-sm md:text-lg">B.Tech. in Mechanical Engineering</p>
                </div>
              </div>
  
              {/* description */}
              <div class="container card w3-white" style={{ marginTop: "3vh",'fontFamily':'Manrope'}}>
                <br />
                <h2 class=" ">
                  <i class="fa fa-book fa-fw"></i> BTP Phase I
                </h2>
                <hr />
                <h6 class="text-muted"> Description: </h6>
                <p>No description provided.</p>
                <div class="container"></div>
              </div>
              <div class="roundbox sidebox borderTopRound rounded-md mt-4 ml-4 md:p-2 md:ml-12 w-2/3 md:w-1/3 bg-gray-300 p-2" style={{'fontFamily':'Manrope'}}>
                <div class="caption titled text-sm md:text-lg font-bold">
                  → Pay attention
                  <div class="top-links"></div>
                </div>
                <div>
                  <div style={{ textAlign: "center" }}>
                    <div class="text-sm md:text-lg">
                      Deadline to Register is 31 January, 2024 EOD
                    </div>
                    <br />
                  </div>
                </div>
              </div>
  
              <div className='grid grid-cols-2 gap-0 mt-16 mx-2 md:mx-6 md:grid-cols-3 lg:grid-cols-5'>
                {items
                  .filter((projects) => {
                    return search.toString().toLowerCase() === ""
                      ? projects
                      : projects.title.toLowerCase().includes(search.toLocaleLowerCase());
                  })
                  .map((project, i) => {
                    return <Projectcard key={i} project={project} />;
                  })}
              </div>
  
              <div id='partner' class="container mx-auto pt-24 pb-12">
                <div class="max-w-md mx-auto shadow-md rounded-md bg-gray-200">
                  <div class="p-4">
                    <h2 class="text-2xl font-bold mb-2">Partner Details</h2>
                    <hr class="my-4" />
                    <div class="grid grid-cols-2 gap-x-20 md:gap-x-2 gap-y-2">
                      <div>
                        <label class="text-sm md:text-lg font-medium text-gray-700">Name:</label>
                        <p class="text-sm md:text-lg  font-semibold font-mono tracking-tighter md:tracking-tight">
                          {flag ? partner[0].name : "N/A"}
                        </p>
                      </div>
                      <div>
                        <label class="text-sm md:text-lg font-medium text-gray-700 pl-5 md:pl-12">
                          Roll No:
                        </label>
                        <p class="text-sm md:text-lg font-semibold font-mono pl-5 md:pl-12">
                          {flag ? partner[0].rollNum : "N/A"}
                        </p>
                      </div>
                      <div>
                        <label class="text-sm md:text-lg font-medium text-gray-700 ">Email:</label>
                        <p class="text-sm md:text-lg font-semibold font-mono tracking-tighter md:tracking-tight">
                          {flag ? partner[0].email : "N/A"}
                        </p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-700 pl-5 md:pl-12">
                          Job:
                        </label>
                        <p class="text-sm md:text-lg font-semibold font-mono pl-5 md:pl-12 tracking-tighter md:tracking-tight">
                          BTech
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div
                id='course'
                class="col-sm-12 col-lg-4"
                style={{ margin: "auto", marginTop: "5vh" }}
              >
                <div class="w3-white w3-text-grey card">
                  <div>
                    <img
                      src="https://iitg.ac.in/mech/static/images/placeholdercourse.jpg"
                      width="100%"
                      height="300"
                      alt=""
                      class=""
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div class="container text-dark font-weight-bold pt-2">
                    <h4>About this course: </h4>
                    <hr />
                    <div class="text-center">
                      <ul style={{ fontWeight: "600" }}>
                        <li>Course Name: BTP Phase I</li>
                        <li>Course Code: ME 398</li>
                        <li>L-T-P-C : 0-0-3-3</li>
                        <li>Syllabus: NaN </li>
                        <li>Course Type: Core course</li>
                      </ul>
                      <hr />
                    </div>
                  </div>
                </div>
                <br />
              </div>
  
              <div
                class="_feedback_container_1ob32_125 pl-4 md:pl-24 lg:pl-48 bg-gray-400"
                style={{
                  height: "15vh",
                  width: "100vw",
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  style={{ height: "30px", paddingRight: "10px" }}
                  class="MuiSvgIcon-root _add__comment_1ob32_146"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-2 13.17L18.83 16H4V4h16v13.17zM13 5h-2v4H7v2h4v4h2v-4h4V9h-4z"
                  ></path>
                </svg>
                <p
                  class="_para__feedback_1ob32_130 text-xs md:text-sm lg:text-lg flex-wrap"
                  style={{
                    marginBottom: "0.5vw",
                    display: "flex",
                    alignContent: "center",
                  }}
                  hover={{ textDecoration: "underline" }}
                >
                  We value your opinion, please take a moment to fill out our{" "}
                  <Link
                    className='px-1 '
                    to={`/studfeedback`}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    feedback form{" "}
                  </Link>{" "}
                  to help us improve.
                </p>
              </div>
            </div>
          )
          :

          <div class="centerrrr">
              <div class="max-w-md bg-white rounded-lg shadow-md p-8">
                  <h1 class="text-3xl font-bold mb-4">404</h1>
                  <p class="text-lg text-gray-700 mb-6">Oops! The page you're looking for could not be accessed by you.</p>
                  <div class="bg-blue-500 text-center text-white text-xl font-bold py-2 px-4 rounded">
                      You are not part of this Course.
                  </div>
              </div>
          </div>
          }
        </div>)}
      </div>
    )
}
export default Createaccount;
