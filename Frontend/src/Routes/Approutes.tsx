import { Route, Routes } from "react-router-dom"
import First from "../Pages/First"


const Approutes = () => {
  return (
    <Routes>
<Route path="/" element={<First></First>}></Route>




    </Routes>
  )
}

export default Approutes