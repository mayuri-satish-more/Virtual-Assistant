import React, { useContext, useEffect,useRef,useState} from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aiImg from "../assets/ai.gif"
import userImg from "../assets/user.gif"
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const[listening,setListening]=useState(false)
  const isSpeakingRef=useRef(false)
  const recognitionRef=useRef(null)
  const isRecognizingRef=useRef(false)
  const synth=window.speechSynthesis
  const[userText,setUserText]=useState(false)
  const[aiText,setAiText]=useState(false)
  const [ham,setHam]=useState(false)
  



  const handleLogOut = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signup");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };




// const speak=(text) => {
//   const utterence = new SpeechSynthesisUtterance(text);
//   window.speechSynthesis.speak(utterence); // ✅ lowercase s
// }; purana vala pehale vala code hai  not usefulll now




// const speak = (text) => {
//   if (!window.speechSynthesis) return;

//   window.speechSynthesis.cancel(); // stop previous speech

//   const utterance = new SpeechSynthesisUtterance(text)
  
//    isSpeakingRef.current=true;
//    utterance.onend=()=>{
//     isSpeakingRef.current=false
//     recognitionRef.current?.start()
//    }
//   utterance.onstart = () => console.log("Speaking...");
//   utterance.onerror = (e) => console.log("Speech error:", e);
//   synth.speak(utterance)

// };  yt kaa hai but gpt use kr rhe hai 


const speak = (text) => {
  if (!window.speechSynthesis) return;

  const synth = window.speechSynthesis;

  // stop previous speech safely
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = 'hi-In';
  const voices = window.speechSynthesis.getVoices()
  const hindiVoice = voices.find(v => v.lang === "hi-In");
    if(hindiVoice){
      utterance.voice = hindiVoice
    }  

  utterance.onstart = () => {
    console.log("Speaking...");
    isSpeakingRef.current = true;

    // 🔥 stop recognition while speaking
    recognitionRef.current?.abort();
  };

  utterance.onend = () => {
    setAiText("")
    console.log("Speech ended");
    isSpeakingRef.current = false;
    

  };

  utterance.onerror = (e) => {
    console.log("Speech error:", e);
    isSpeakingRef.current = false;
  };
  //  synth.cancel()
  synth.speak(utterance);
};


//   useEffect(() => {
//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   const recognition = new SpeechRecognition(); // ✅ correct name
//   recognition.continuous = true;
//   recognition.lang = "en-US";

//   recognition.onresult=async (e)=>{
//     const transcript=e.results[e.results.length-1][0].transcript.trim()
//     console.log("heared : " + transcript)
//     if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
//       let data=await getGeminiResponse(transcript)
//       console.log("Gemini data:", data)
//       speak(data.response || "Sorry, I couldn't understand that.")
//     }
//   }
//   recognition.start();
// }, []);   purana vala pehale vala code hai  not usefull now

  


const handleCommand = (data) => {
  const { type, userInput, response } = data;

  speak(response);

  if (type === "google-search") {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`, "_self");
  }

  else if (type === "calculator-open") {
    window.open(`https://www.google.com/search?q=calculator`, "_self");
  }

  else if (type === "instagram-open") {
    window.open(`https://www.instagram.com/`, "_self");
  }

  else if (type === "facebook-open") {
    window.open(`https://www.facebook.com/`, "_self");
  }

  else if (type === "weather-show") {
    window.open(`https://www.google.com/search?q=weather`, "_self");
  }

  else if (type === "youtube-search" || type === "youtube-play") {
    const query = encodeURIComponent(userInput);
    console.log("Opening YouTube:", query);
   window.open(
  `https://www.youtube.com/results?search_query=${query}`,
  "_self"
);
  }
};



// useEffect(() => {
//   if (!isStarted) return; // 🔥 important

//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   const recognition = new SpeechRecognition();
//   recognition.continuous = true;
//   recognition.lang = "en-US";




//   recognitionRef.current = recognition;
//   const isRecognizing={current:false}
//   const safeRecognition=()=>{
//     if(isSpeakingRef && !isRecognizing){
//       try {
//         recognition.start();
//         console.log("Recognition requested to start");
//       } catch (err) {
//         if(err.name !== "InvalidStateError") {
//           console.error("start error ", err);
//         }
//       }
//     }

//   }
// recognition.onstart = () => {
//   console.log("Recognition started");
//   setListening(true)
// }
// recognition.onend = ()=> {
//   console.log("Recognition ended");
//   isRecognizingRef.current=false;
//   setListening(true)
// }
//  if(!isSpeakingRef.current){
//   setTimeout(() => {
//     safeRecognition()

//   }, 1000)
//  }

//  recognition.onerror = (event) => {
//   console.warn("Recognition error:", event.error)
//   isRecognizingRef.current = false;
//   setListening(false)
//   if(event.error !== "aborted" && !isSpeakingRef.current){
//     setTimeout(()=>{
//       safeRecognition()
//     }, 1000)
//   }
//  }


//   recognition.onresult = async (e) => {
//     const transcript = e.results[e.results.length - 1][0].transcript.trim();
//     console.log("heared : " + transcript);

//     if (
//       transcript
//         .toLowerCase()
//         .includes(userData.assistantName.toLowerCase())
//     ) {
//       recognition.stop()
//       isRecognizingRef.current=false
//       setListening(false)
//       let data = await getGeminiResponse(transcript);
//       console.log("Gemini data:", data);

//       handleCommand(data)
//     }
//   };



//   const fallback=setInterval(()=> {
//     if(!isSpeakingRef.current && !isRecognizingRef.current){
//       safeRecognition()
//     }
//   })

//   return () => {
//     recognition.stop()
//     setListening(false)
//     isRecognizingRef.current=false
//     clearInterval(fallback)
//   }

  
  

  
// }, [10000]);  ye yt ka hai but use gpt ka kar rhe hai 


useEffect(() => {
  if (!isStarted) return;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
 

  recognitionRef.current = recognition;



  const safeRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognition.start();
        isRecognizingRef.current = true;
        console.log("Recognition requested to start")
      } catch (err) {
        if (err.name !== "InvalidStateError") {
          console.error(err);
        }
      }
    }
  };

  recognition.onstart = () => {
    console.log("Recognition started");
    setListening(true);
  };

  recognition.onend = () => {
    console.log("Recognition ended");
    isRecognizingRef.current = false;
    setListening(false);
  };

  recognition.onerror = (event) => {
    console.warn("Error:", event.error);
    isRecognizingRef.current = false;
    setListening(false);

    if (event.error !== "aborted") {
      setTimeout(safeRecognition, 1000);
    }
  };

  recognition.onresult = async (e) => {
    const transcript =
      e.results[e.results.length - 1][0].transcript.trim();

    if (
      transcript
        .toLowerCase()
        .includes(userData.assistantName.toLowerCase())
    ) {
       setAiText("")
      setUserText(transcript)
      recognition.stop();
      isRecognizingRef.current = false;
      setListening(false);

      let data = await getGeminiResponse(transcript);
      if (typeof data === "string") {
  data = JSON.parse(data);
}
      handleCommand(data);
      setAiText(data.response)
      setUserText("")
    }
  };

  const greeting = new SpeechSynthesisUtterance(`hello ${userData.name},
     how can I assist you?`)
     greeting.lang = 'hi-In'
     window.speechSynthesis.speak(greeting)

  const interval = setInterval(safeRecognition, 2000);

  return () => {
    recognition.abort();
    clearInterval(interval);
  };
}, [isStarted]);




  return (
    <div
      className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d]
    flex justify-center items-center flex-col gap-[15px]"
    >

<button
  onClick={() => {
    speak(`${userData?.assistantName} activated`);
    setIsStarted(true);
  }}
  className="px-6 py-2  mb-4 rounded-lg mt-4 font-semibold text-white
           bg-gradient-to-r from-cyan-300 via-blue-500 to-cyan-400
           shadow-[0_0_20px_rgba(0,198,255,0.8)]
           hover:scale-110 hover:shadow-[0_0_40px_rgba(0,198,255,1)]
           active:scale-95
           transition-all duration-300"
  style={{
    textShadow: "0 0 12px rgba(0,198,255,0.9)"
  }}
>
  Start Assistant
</button>
<CgMenuRight className="lg:hidden text-white absolute top-[20px] right-[20px]
w-[25px] h-[25px]"  onClick={()=>setHam(true)}/>

<div className={`absolute top-0 w-full h-full bg-[#00000053] backdrop-blur-lg p-[20px] flex 
flex-col gap-[20px] items-start ${ham?"translate-x-0":"translate-x-full"} transition-transform`}>
  
<RxCross1 className="text-white absolute top-[20px] right-[20px]
w-[25px] h-[25px]" onClick={()=>setHam(false)} />


      <button
        type="submit"
        className="min-w-[150px] h-[60px]  mt-[26px] cursor-pointer  bg-white rounded-full font-semibold
          text-[19px]"
        onClick={handleLogOut}
      >
        Log Out
      </button>

      <button
        type="submit"
        className="min-w-[150px] h-[60px]  mt-[5]px] bg-white rounded-full font-semibold
          text-[19px] px-[20px] py-[10px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant{" "}
      </button>

      <div className="w-full h-[2px] bg-gray-400"></div>
      <h1 className="text-white font-semibold text-[19px]">History</h1>
      
      <div className="w-full h-[60%] gap-[5px] overflow-y-auto flex flex-col ">
        {userData.history?.map((his, index) => (
  <span className="text-gray-200 text-[18px] truncate" key={index}>{his}</span>
))}
      </div>


</div>

      <button
        type="submit"
        className="min-w-[150px] h-[60px] hidden lg:block cursor-pointer mt-[30px] bg-white rounded-full font-semibold
          absolute top-[20px] right-[20px] text-[19px]"
        onClick={handleLogOut}
      >
        Log Out
      </button>

      <button
        type="submit"
        className="min-w-[150px] h-[60px] mt-[30px] hidden lg:block top-[100px] right-[20px] bg-white rounded-full font-semibold
          absolute text-[19px] px-[20px] py-[10px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant{" "}
      </button>

      <div className="w-[300px] h-[400px] flex justify-center shadow-lg items-center overflow-hidden rounded-4xl">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover "
        />
      </div>
      <h1 className="text-white text-[25px] font-bold">
        {" "}
        I'm {userData?.assistantName}
      </h1>
      {!aiText && <img src={userImg} alt="" className="w-[200px]"/>}
      {aiText && <img src={aiImg} alt="" className="w-[200px]"/>}

      <h1 className="text-white text-[20px] font-semi-bold text-wrap">{userText?userText:aiText?aiText:null}</h1>

      
    </div>
  );
};

export default Home;






// import React, { useContext, useEffect, useState } from "react";
// import { UserDataContext } from "../context/UserContext.jsx";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Home = () => {
//   const {
//     userData,
//     serverUrl,
//     setUserData,
//     getGeminiResponse,
//   } = useContext(UserDataContext);

//   const navigate = useNavigate();

//   const [isActivated, setIsActivated] = useState(false);

//   const handleLogOut = async () => {
//     try {
//       await axios.post(`${serverUrl}/api/auth/logout`, {
//         withCredentials: true,
//       });
//       setUserData(null);
//       navigate("/signup");
//     } catch (error) {
//       setUserData(null);
//       console.log(error);
//     }
//   };

//   const speak = (text) => {
//     if (!window.speechSynthesis) return;

//     window.speechSynthesis.cancel(); // stop previous speech

//     const utterance = new SpeechSynthesisUtterance(text);

//     utterance.onstart = () => console.log("Speaking...");
//     utterance.onerror = (e) => console.log("Speech error:", e);

//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     if (!isActivated) return; // 🔥 important

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();

//     recognition.continuous = true;
//     recognition.lang = "en-US";

//     recognition.onresult = async (e) => {
//       const transcript =
//         e.results[e.results.length - 1][0].transcript.trim();

//       console.log("heared : " + transcript);

//       if (
//         transcript
//           .toLowerCase()
//           .includes(userData?.assistantName?.toLowerCase())
//       ) {
//         speak("Yes, I'm listening..."); // 🔥 cool effect

//         let data = await getGeminiResponse(transcript);
//         console.log(data);

//         speak(data.response); // ✅ now it will work
//       }
//     };

//     recognition.start();

//     return () => recognition.stop(); 
//   }, [isActivated]);

//   return (
//     <div
//       className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] 
//       flex justify-center items-center flex-col gap-[15px]"
//     >
//       {/* ✅ NEW BUTTON (IMPORTANT) */}
//       <button
//         onClick={() => {
//           speak("Jarvis activated");
//           setIsActivated(true);
//         }}
//         className="bg-green-500 text-white px-6 py-2 rounded"
//       >
//         Start Jarvis
//       </button>

//       <button
//         className="min-w-[150px] h-[60px] cursor-pointer mt-[30px] bg-white rounded-full font-semibold
//         absolute top-[20px] right-[20px] text-[19px]"
//         onClick={handleLogOut}
//       >
//         Log Out
//       </button>

//       <button
//         className="min-w-[150px] h-[60px] mt-[30px] top-[100px] right-[20px] bg-white rounded-full font-semibold
//         absolute text-[19px] px-[20px] py-[10px] cursor-pointer"
//         onClick={() => navigate("/customize")}
//       >
//         Customize your Assistant
//       </button>

//       <div className="w-[300px] h-[400px] flex justify-center shadow-lg items-center overflow-hidden rounded-4xl">
//         <img
//           src={userData?.assistantImage}
//           alt=""
//           className="h-full object-cover"
//         />
//       </div>

//       <h1 className="text-white text-[25px] font-bold">
//         I'm {userData?.assistantName}
//       </h1>
//     </div>
//   );
// };

// export default Home;


