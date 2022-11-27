import './App.css';
import Counter from "./Counter";
import CounterHooks from './CounterHooks';
import React, { useState } from 'react';

export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('red');
  return (
    <ThemeContext.Provider value={{ background: theme }}>
      <Counter initialCount={0} />
      <CounterHooks initialCount={1} />
      <button onClick={() => setTheme(prevTheme => {
        return prevTheme === 'red' ? 'blue' : 'red'
      })}>Click Toggler</button>
    </ThemeContext.Provider>
  )
}

export default App;
