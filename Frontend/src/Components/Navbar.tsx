//320 56   //304 40 //156 40 //156 21  //12 19.1
import ThreeBars from '../Icons/ThreeBars';
import cmclogo from '../images/cmclogo.jpg'


const Navbar = () => {
  return (
    <>
      <div className="w-full h-[8vh]  px-4">
        <div className=" w-full h-full p-2 flex ">
          <div className="w-full h-full flex box-border items-center ">
            <img src={cmclogo} alt="logo" className="w-[12vw] h-full  sm:w-[8vw] lg:w-[6vw]"></img>
            <h1 className=" font-bold text-[#1868DB] mx-4"> ATLASSIAN</h1>
          </div>
          <div className="w-6 h-5 items-center justify-center"><ThreeBars></ThreeBars></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
