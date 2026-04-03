// import React from 'react';
// import { useContext } from 'react';
// import { useState } from 'react';
// import { UserDataContext } from '../context/UserContext.jsx';

// const Customize2 = () => {
//   const {userData,setUserData} = useContext(UserDataContext);
//   const [assistantName,setAssistantName]=useState(userData?.AssistantName || "");
//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center
//      items-center flex-col p-[20px] '>
//       <h1 className='text-white text-[30px] mb-[40px] text-center'>Enter Your 
//         <span className='text-blue-200'> Assistant Name</span></h1>
//         <input
//           type="text"
//           placeholder="eg. shifra"
//           className="w-full max-w-[600px] h-[60px] px-5
//              text-lg outline-none border-2 border-white bg-transparent text-white
//               placeholder:text-gray-300 rounded-full"
//           required onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}
//         />
//         {assistantName && 
//         <button className="min-w-[300px] h-[60px] mt-[30px] bg-white rounded-full
//        font-semibold cursor-pointer text-[19px]"
//         onClick={() => navigate('/customize2')}>
//       Finally Create Your Assistant</button>}

      
//     </div>
//   );
// }

// export default Customize2;




import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { UserDataContext } from '../context/UserContext.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";


const Customize2 = () => {
  const {userData,setUserData, backendImage,selectedImage,serverUrl} = useContext(UserDataContext);
  const [assistantName,setAssistantName]=useState(userData?.assistantName || "");
    const [loading, setLoading] = useState(false);
  
  

  
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    setLoading(true);
  try {
    const formData = new FormData();
    formData.append("assistantName", assistantName);

    if (selectedImage instanceof File) {
      formData.append("assistantImage", selectedImage); // send file
    } else if (typeof selectedImage === "string") {
      formData.append("imageUrl", selectedImage);       // send URL
    } else {
      throw new Error("No image selected");
    }

    const result = await axios.post(
      `${serverUrl}/api/user/update`,
      formData,
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
    );

    setLoading(false)

    console.log(result.data);
    setUserData(result.data);

    navigate("/")
  } catch (error) {
    console.error("Error updating assistant:", error);
    setLoading(false);
  }
};

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center
     items-center flex-col p-[20px] relative'>

      <MdKeyboardBackspace  className='absolute top-[30px] left-[30px]
       text-white w-[25px] h-[25px] cursor-pointer'onClick={()=>navigate("/customize")}/>
      <h1 className='text-white text-[30px] mb-[40px] text-center'>Enter Your 
        <span className='text-blue-200'> Assistant Name</span></h1>
        <input
          type="text"
          placeholder="eg. shifra"
          className="w-full max-w-[600px] h-[60px] px-5
             text-lg outline-none border-2 border-white bg-transparent text-white
              placeholder:text-gray-300 rounded-full"
          required onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}
        />
        {assistantName && 
        <button className="min-w-[300px] h-[60px] mt-[30px] bg-white rounded-full
       font-semibold cursor-pointer text-[19px]"  disabled={loading}
        onClick={ async () => {
          console.log("selectedImage:", selectedImage);
             await handleUpdateAssistant();
              
          }}>
      {!loading ? "Finally Create Your Assistant": "Loading..."}</button>}

      
    </div>
  );
}

export default Customize2;


