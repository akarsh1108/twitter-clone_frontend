import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import {AppContext , socket} from './context/appContext';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Home from './pages/Home';
import Post from './pages/Posts';

function App() {
  const [messages,setMessages]=useState([]);
  const [members,setMembers]=useState([]);
  const[follows,setFollows]=useState([]);
  
  const user = useSelector((state)=>state.user);
  
  return (
   <AppContext.Provider value={{socket, setMembers, members,messages,setMessages,setFollows,follows}}>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/post" element={<Post/>}/>
   </Routes>
   </BrowserRouter>
   </AppContext.Provider>
  );
}

export default App;
