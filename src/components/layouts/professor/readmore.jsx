import React, { useContext,useEffect, useState } from "react";
import { useParams,Link } from 'react-router-dom';
import ItemContext from '../../../context/project/ItemContext';
import Projectcardspecific from "./projectcardspecific";
import { useSelector } from 'react-redux';


const Specificprojectcard=()=> {
    const {Projectspecific,getInterestedStudents,allotProject,getSingleProject} = useContext(ItemContext);
    const items = useSelector(state => state.allProjects.specificProjects);
    const params=useParams();
    const id=params.id;
    const [loading,setLoading]=useState(true);
    const [alloted,setAlloted]=useState(false);
    var studentRegisteredList = useSelector(state => state.allProjects.interestedStudents);
    var newArray = [];
    for(let i=0;i<studentRegisteredList.length;i++)
    {
      let student1 = studentRegisteredList[i];
      let student2 = studentRegisteredList[i+1];
      let array = [];
      array.push(student1);
      array.push(student2);
      newArray.push(array);
      i++;
    }
    studentRegisteredList = newArray;
    // console.log("jj",newArray)

    const getItem = async () => {        
        await Projectspecific(); 
        const x = await getInterestedStudents(id);
        

        const y = await getSingleProject(id);
        // console.log("x",y)

        if(y){
          // console.log("y",y)
          const isbanned = y.is_banned;
          setAlloted(isbanned);
        }
        // alert("hiii")
        // alert(is_banned)
        // setAlloted(is_banned);

        if(x === 200)setLoading(false);
      };
      // var is_banned = false;

      useEffect(()=>{
          getItem();
      },[]);
 
      
      const clickHandler = async (name1,name2) => {
        setLoading(true);
        const x = await allotProject(id,name1,name2);
          
        if(x === 200){
          setLoading(false);
          setAlloted(true);
        }
      }

     return(
        <div className='readmorepage'>
          <div className="flex ml-1 mt-1">
            <Link className='text-3xl ml-5' to={`/owner`}><i class="fa-sharp fa-solid fa-arrow-left fa-lg"></i></Link>
          </div>

          <div className="flex ">
            <div className='w-1/2 ml-20 mr-4 px-0'>
              { items.filter((project) => project._id===id).map((projects,i) => { 
                return (<Projectcardspecific key={i} project={projects}/>)})}
            </div>

            <div className="w-1/2 flex flex-col items-center border-2 rounded-lg ml-4 mr-16 my-2 py-2 border-4">
                <div>
                  <div className="font-medium text-center text-lg px-4 pb-2">Currently registered students :</div>
                  {
                    loading
                    ?
                    <div class="h-48 flex items-center justify-center">
                      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                    :
                    alloted
                    ?
                    <div className="mt-8 h-32 mx-4 md:mx-0 px-4 flex justify-center items-center bg-green-600 text-white rounded-md text-lg md:text-xl lg:text-2xl font-semibold">Project alloted to a group successfully.</div>
                    :
                    <div className="py-2 grid mx-2 ">
                    
                    { studentRegisteredList.length > 0 
                    ?
                    studentRegisteredList.map((individual) => {
                      return    (<div className="grid grid-cols-3 p-2 mb-4 bg-green-500 rounded-sm text-white">
                                  <div className="px-3 flex flex-col">
                                    <div className="font-semibold lowercase">{individual[0]}</div>
                                    <div>
                                    <div className="text-xs text-white">Grade Card <i class="fa-solid fa-download text-sm"></i></div>
                                    <div className="text-xs text-white">Resume <i class="fa-solid fa-download text-sm"></i></div>
                                    </div>
                                  </div>
                                  <div className="px-3 flex flex-col">
                                    <div className="font-semibold lowercase">{individual[1]}</div>
                                    <div>
                                    <div className="text-xs text-white">Grade Card <i class="fa-solid fa-download text-sm"></i></div>
                                    <div className="text-xs text-white">Resume <i class="fa-solid fa-download text-sm"></i></div>
                                    </div>
                                  </div>
                                  <div onClick={()=>{clickHandler(individual[0],individual[1]);}} className="my-2 mx-4 p-1 flex justify-center items-center font-bold rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer">Approve</div>
                                </div>)
                        // return (<div className="flex flex-col py-2 bg-green-500 border-2 px-4">
                        //       <div className="text-start text-sm text-white font-medium px-1">{individual}</div>
                        //       <div className="flex flex-col items-start w-full">
                        //          <div className="text-xs px-1 text-white">Grade Card <i class="fa-solid fa-download text-sm"></i></div>
                        //          <div className="text-xs px-1 text-white">Resume <i class="fa-solid fa-download text-sm"></i></div></div>
                        //       </div>
                        //     )
                      })
                    :
                    <div className="px-3 normal-case">No one has registered for this project (Refresh to reflect any changes)</div>}
                  </div>}
                </div>
              </div>
          </div>
              
      </div>
    ) 
};
export default Specificprojectcard;