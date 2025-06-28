import Navbar from "../Components/Navbar"
import { useNavigate } from "react-router-dom";



const First = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar></Navbar>
   <div className="w-full h-full flex " >

    <button className=" bg-red-600 justify-items-center  items-center mx-[5vw] p-[2vw] rounded-2xl" onClick={()=>{navigate('/login')}}> GET Started</button>
   </div>
    </div>
  );
}

export default First