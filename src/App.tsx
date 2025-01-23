import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Teams from './pages/Teams.tsx';
import Layout from './component/layout/Layout.tsx';
import Home from './pages/Home.tsx';
import Profile from './pages/Profile.tsx';
import Tasks from './pages/Tasks.tsx';

import Settings from './pages/Settings.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="teams" element={<Teams />} />
          <Route path="tasks" element={<Tasks />} />
          
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

