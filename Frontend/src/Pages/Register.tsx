
import axios from 'axios'
import { useState } from 'react';
const Register = async() => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    try {
        const response = await axios.post("/api/v1/user/signup", formData); // Post request to login endpoint
        console.log(response);}
     catch (error) {
        console.log(error) }// Log response for debugging
  return (
    <div>Register</div>
  )
}

export default Register