import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const Login = () => {
  const user = ""; // Replace with real user/auth logic
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = (data: any) => {
    console.log(data);
    // Perform login logic
    navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row  items-center justify-center">
        {/* {left side} */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
        <div className="w-full md:max-w-lg max-w-3xl flex flex-col items-center justify-center gap-5"></div>
        
        {/* {right side} */}
        </div>
        <div className=""></div>






      </div>
     
    </div>
  );
};

export default Login;
