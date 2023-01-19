import React, { Suspense, lazy} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Circles } from "react-loader-spinner"

import Layout from './components/Layout';

const LandingPage = lazy(() => import("./components/LandingPage"));
const AuthPage = lazy(() => import("./components/AuthPage"));
const TodosPage = lazy(() => import("./features/todos/TodosPage"));
const ProgressPage = lazy(() => import("./features/progress/ProgressPage"));
const CalendarPage = lazy(() => import("./components/calendar/CalendarPage"));

const App = () => {
  return (
    <Suspense 
      fallback={
        <div className='suspense_fallback'>
          <Circles
            height="80"
            width="80"
            color="#49fb35"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<LandingPage />} />

          <Route path="auth" element={<AuthPage />} />

          <Route path="todos" element={<TodosPage />} />

          <Route path="progress" element={<ProgressPage />} />

          <Route path="calendar" element={<CalendarPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Route>
      </Routes>
    </Suspense>
    
  );
}

export default App;
