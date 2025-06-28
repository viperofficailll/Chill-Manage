import { useNavigate } from "react-router-dom"
const Login = () => {
    const navigate =useNavigate()
  return (
    <div>Login






        dont have a account ?? <button className=" bg-violet-500 p-[3vh] rounded-2xl" onClick={()=>{navigate('/signup')}}>  create account</button>
    </div>


    
  )
}

export default Login