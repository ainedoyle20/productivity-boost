import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import TodosPage from "./features/todos/TodosPage";
import ProgressPage from "./features/progress/ProgressPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<LandingPage />} />

        <Route path="auth" element={<AuthPage />} />

        <Route path="todos" element={<TodosPage />} />

        <Route path="progress" element={<ProgressPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  );
}

export default App;
