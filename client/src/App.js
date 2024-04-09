import { Route, Routes } from 'react-router-dom';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';


// import Login from './Login_register/login';
// import Register from './Login_register/register';
import Home from './Components/UserComp/home';
import LoginDemo from './Login_register/aaa';
import UserList from './Components/AdminComp/User/userList';
import AdminHome from './Components/AdminComp/adminHome';
import LessonList from './Components/AdminComp/Lesson/lessonList';


import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import AddLesson from './Components/AdminComp/Lesson/addLesson';
import ListWordOfLesson from './Components/AdminComp/Word/listWordOfLesson';
import AddWord from './Components/AdminComp/Word/addWord';
import ChooseByLevel from './Components/UserComp/Lesson/chooseByLevel';
import LessonsByLevel from './Components/UserComp/Lesson/lessonsByLevel';
import WordByLesson from './Components/UserComp/Word/wordByLesson';
import Register from './Login_register/register';
import AddUser from './Components/AdminComp/User/addUser';
import ListQestionOfLesson from './Components/AdminComp/Question/listQuestionOfLesson';
import AddQuestion from './Components/AdminComp/Question/addQuestion';
import QuestionList from './Components/UserComp/Question/questionLIst';


function App() {
  return(
    <>
    {/* <Login /> */}
    {/* <Register /> 
    <Login /> */}

    <Routes>
    <Route path='/' element={<LoginDemo />} />
    <Route path='/register' element={<Register />} />
   {/*  <Route path='/login' element={<Login />} /> */}
    <Route path='/user' element={<Home />} >
    <Route path='/user/lesson' element={<ChooseByLevel />} />
    <Route path='/user/lessonByLevel/:level' element={<LessonsByLevel />} />
    <Route path='/user/wordsByLesson/:idLess' element={<WordByLesson />} />
    <Route path='/user/questionsByLesson/:idLess' element={<QuestionList />} />
    </Route>
    <Route path='/admin' element={<AdminHome />} >
    <Route path='/admin/user' element={<UserList />} />
    <Route path='/admin/learn' element={<LessonList />} />
    <Route path='/admin/addlesson' element={<AddLesson />} />
    <Route path='/admin/addUser' element={<AddUser/>} />
    <Route path='/admin/listWordOfLesson/:idLess' element={<ListWordOfLesson />} />
    <Route path='/admin/addWord/:idLess' element={<AddWord />} />
    <Route path='/admin/listQuestionOfLesson/:idLess' element={<ListQestionOfLesson />} />
    <Route path='/admin/addQuestion/:idLess' element={<AddQuestion/>} />

    </Route>
    </Routes>
    </>
  )
}

export default App;
