import React from 'react';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext.jsx';

const Card = ({image}) => {
  const {serverUrl,userData,setUserData, frontendImage,setFrontendImage,backendImage,setBackendImage,
      selectedImage, setSelectedImage}=useContext(UserDataContext)
      
    
  return (
  
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden
cursor-pointer transition-all duration-300
hover:shadow-2xl hover:shadow-blue-950 hover:border-4 hover:border-white
${selectedImage === image ? "border-4 border-white shadow-2xl shadow-blue-950" :null}`}
    
    onClick={()=>
    {setSelectedImage(image)
      setFrontendImage(null)
      setBackendImage(null)
    }}>
      <img src={image} className='h-full w-full object-cover'/>
    </div>
  );
}

export default Card;







