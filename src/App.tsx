import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Teams from './pages/Teams.tsx';
import Layout from './component/layout/Layout.tsx';
import Home from './pages/Home.tsx';
import Calendar from './pages/Calendar.tsx';
import Profile from './pages/Profile.tsx';
import Tasks from './pages/Tasks.tsx';
import Feedback from './pages/Feedback.tsx';
import Settings from './pages/Settings.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Home />}></Route>
          <Route path="calendar" element={<Calendar />} />
          <Route path="teams" element={<Teams />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App