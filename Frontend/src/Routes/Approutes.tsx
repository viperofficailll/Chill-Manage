import { Route, Routes } from "react-router-dom"
import First from "../Pages/First"
import Login from "../Pages/Login"
import Register from "../Pages/Register"


const Approutes = () => {
  return (
    <Routes>
<Route path="/" element={<First></First>}></Route>
<Route path="/login" element={<Login></Login>}></Route>
<Route path="/signup" element={<Register></Register>}></Route>




    </Routes>
  )
}

export default Approutes