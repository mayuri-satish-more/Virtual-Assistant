// import React from 'react';
// import Card from '../components/Card';
// import image3 from '../assets/authBg.png'
// import image1 from '../assets/image1.png'
// import image2 from '../assets/image2.jpg'
// import image4 from '../assets/image4.png'
// import image5 from '../assets/image5.png'
// import image6 from '../assets/image6.jpeg'
// import image7 from '../assets/image7.jpeg'
// import { RiImageAddLine } from "react-icons/ri";
// import { useState } from 'react';
// import { useRef } from 'react';
// import { useContext } from 'react';
// import { UserDataContext } from '../context/UserContext.jsx';
// import { useNavigate } from 'react-router-dom';


// const Customize = () => {
//   const {serverUrl,userData,setUserData, frontendImage,setFrontendImage,backendImage,setBackendImage,
//     selectedImage, setSelectedImage}=useContext(UserDataContext)
//     const navigate=useNavigate()
  
//     const inputImage=useRef()
//     const handleImage=(e)=>{
//       const file = e.target.files[0];
//       setBackendImage(file)
//       setFrontendImage(URL.createObjectURL(file))
//     }

//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center
//      items-center flex-col p-[20px] '>

//       <h1 className='text-white text-[30px] mb-[40px] text-center'>Select your
//          <span className='text-blue-200'> Assistant Image</span></h1>

//       <div className='w-[90%] max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>


//         <Card image={image1}/>
//         <Card image={image2}/>
//         <Card image={image3}/>
//         <Card image={image4}/>
//         <Card image={image5}/>
//         <Card image={image6}/>
//         <Card image={image7}/>


//     <div
//   className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] 
//   border-2 border-[#0000ff66] rounded-2xl overflow-hidden
//   hover:shadow-2xl hover:shadow-blue-950 transition-all duration-300 cursor-pointer
//   flex items-center justify-center

//   ${
//     selectedImage === "input"
//       ? "border-white shadow-2xl shadow-blue-950"
//       : "hover:border-white"
//   }`}



    
//     onClick={()=>{
//       inputImage.current.click()
//       setSelectedImage("input")}}>

//       {!frontendImage && <RiImageAddLine  className='text-white w-[25px] h-[25px] '/>
// }
// {frontendImage && <img src={frontendImage}  className='w-full h-full object-cover'/>}
//     </div>

//     <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>

//       </div>

//       {selectedImage && <button className="min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full
//        font-semibold cursor-pointer text-[19px]"
//         onClick={() => navigate('/customize2')}>
//       Next</button>}
      
      
//     </div>
//   );
// }

// export default Customize;   just for future use not usefull



import React, { useContext, useState, useRef } from 'react';
import Card from '../components/Card';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/authBg.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.jpeg';
import image7 from '../assets/image7.jpeg';
import { RiImageAddLine } from "react-icons/ri";
import { UserDataContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";


const Customize = () => {
  const {
    frontendImage, setFrontendImage,
    backendImage, setBackendImage,
    selectedImage, setSelectedImage
  } = useContext(UserDataContext);

  const navigate = useNavigate();
  const inputImage = useRef();

  // Handle file selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file); // Save actual file for upload
    setFrontendImage(URL.createObjectURL(file)); // For preview
    setSelectedImage(file); // Important! Save the file, not "input"
  };

  
  const handlePredefinedImage = (imgUrl) => {
    setSelectedImage(imgUrl); // Save URL of asset
    setFrontendImage(imgUrl);
    setBackendImage(null); // Clear file
  };

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] 
    flex justify-center items-center flex-col p-[20px]'>
      <MdKeyboardBackspace  className='absolute top-[30px] left-[30px]
             text-white w-[25px] h-[25px] cursor-pointer'onClick={()=>navigate("/")}/>

      <h1 className='text-white text-[30px] mb-[40px] text-center'>
        Select your <span className='text-blue-200'>Assistant Image</span>
      </h1>

      <div className='w-[90%] max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>

        {/* Predefined images */}
        {[image1, image2, image3, image4, image5, image6, image7].map((img, i) => (
          <Card key={i} image={img} onClick={() => handlePredefinedImage(img)} />
        ))}

        {/* Custom upload */}
        <div
          className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] border-2 border-[#0000ff66] rounded-2xl overflow-hidden
            hover:shadow-2xl hover:shadow-blue-950 transition-all duration-300 cursor-pointer
            flex items-center justify-center ${selectedImage instanceof File ? "border-white shadow-2xl shadow-blue-950" : "hover:border-white"}`}
          onClick={() => inputImage.current.click()}
        >
          {!frontendImage && <RiImageAddLine className='text-white w-[25px] h-[25px]' />}
          {frontendImage && <img src={frontendImage} className='w-full h-full object-cover' />}
        </div>

        <input
          type="file"
          accept='image/*'
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {/* Next button */}
      {selectedImage && (
        <button
          className="min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full font-semibold cursor-pointer text-[19px]"
          onClick={() => navigate('/customize2')}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;


 