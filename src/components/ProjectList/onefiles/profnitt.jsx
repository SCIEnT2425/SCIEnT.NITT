import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

function Profnitt() {
  const navigate = useNavigate(); 

  useEffect(() => {
    toast.info("No Projects Yet!");

    setTimeout(() => {
      navigate(-1); 
    }, 3000);
  }, [navigate]);

  return (
    <>
      <ToastContainer />
    </>
  );
}

export default Profnitt;