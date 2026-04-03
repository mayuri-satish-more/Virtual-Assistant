// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import SignUp from './pages/signUp.jsx';
// import SignIn from './pages/signIn.jsx';
// import Customize from './pages/Customize';
// import { useContext } from 'react';
// import { UserDataContext } from './context/UserContext.jsx';
// import Home from './pages/Home';
// import Customize2 from './pages/Customize2.jsx';
// import { useState } from 'react';

// const App = () => {
//   const {userData,setUserData}=useContext(UserDataContext)
//     const [loading, setLoading] = useState(false);
  
// if (!userData) {
//   return <div>Loading...</div>;
// }

//   console.log("userData:", userData); 



//   return (
//     <Routes>
//       <Route path='/' element={(userData?.assistantImage && userData?.assistantName)?<Home/>
//       :<Navigate to={"/customize"}/>}/>

//       <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/customize"} />}></Route>
//       <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"} />}></Route>
//       <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/signup"}/>}></Route>
//       <Route path='/customize2' element={userData?<Customize2/>:<Navigate to={"/signup"}/>}></Route>
      

//     </Routes>
//   );
// }

// export default App;




import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './pages/signUp.jsx';
import SignIn from './pages/signIn.jsx';
import Customize from './pages/Customize';
import Home from './pages/Home';
import Customize2 from './pages/Customize2.jsx';
import { UserDataContext } from './context/UserContext.jsx';

const App = () => {
  const { userData, loading } = useContext(UserDataContext); // ✅ context se lo

  console.log("userData:", userData);

  // ✅ wait until API completes
  if (loading) {
    return <div>Loading...</div>;
  }

  // ✅ clean logic
  const isProfileComplete =
    userData?.assistantName && userData?.assistantImage;

  return (
    <Routes>
      <Route
        path="/"
        element={
          !userData ? (
            <Navigate to="/signin" />
          ) : !isProfileComplete ? (
            <Navigate to="/customize" />
          ) : (
            <Home />
          )
        }
      />

      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />

      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/signup" />}
      />

      <Route
        path="/customize2"
        element={userData ? <Customize2 /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
};

export default App;




