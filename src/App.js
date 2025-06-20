import React, { useContext } from 'react';
import JobApplicationForm from './components/JobApplicationForm';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import './App.css';

function AppWrapper() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="App">
      <button className="toggle" onClick={toggleTheme}>
        Switch to {dark ? 'Light' : 'Dark'} Mode
      </button>
      <h1>🧑‍💼 Job Application Form</h1>
      <JobApplicationForm />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  );
}
