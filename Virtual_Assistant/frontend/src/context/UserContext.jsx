import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"

export const UserDataContext=createContext()
function UserContext({children}) {
  const serverUrl="https://virtual-assistant-jyvh.onrender.com"
  const [frontendImage,setFrontendImage]=useState(null)
  const [backendImage,setBackendImage]=useState(null)
  const [userData,setUserData]=useState(null)
  const[selectedImage,setSelectedImage]=useState(null)
  const [loading, setLoading] = useState(true);
  
  const handleCurrentUser=async ()=> {
    try {
      const result=await axios.get(`${serverUrl}/api/user/current`,
        {withCredentials:true}
      )
      setUserData(result.data)
      console.log(result.data)
      
      setLoading(false); 
    } catch (error) {
      console.log(error)
      setUserData(null);
      setLoading(false);
      
    }
  }


//   const handleCurrentUser = async () => {
//   console.log("API call start");

//   try {
//     const result = await axios.get(`${serverUrl}/api/user/current`, {
//       withCredentials: true
//     });

//     console.log("API success"); // 👈 ye aa raha hai kya?
//     setUserData(result.data);

//   } catch (error) {
//     console.log("API error", error);
//   } finally {
//     console.log("API finished"); // 👈 IMPORTANT
//     setLoading(false);
//   }
// };



const getGeminiResponse = async (command) => {
  try {
    const result = await axios.post(
      `${serverUrl}/api/user/askToAssistant`,
      { command },
      { withCredentials: true } // ✅ must
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


  useEffect(()=> {
  handleCurrentUser()
},[])


  const value={
    serverUrl,userData,setUserData, frontendImage,setFrontendImage,backendImage,setBackendImage,
    setSelectedImage, selectedImage, loading, getGeminiResponse
  }
  return (
    
      <UserDataContext.Provider value={value}>
        {children}

      </UserDataContext.Provider>
      
    

  )
}
export default UserContext;
