import React, { useState, useContext } from 'react';
import { ThemeContext } from './App';

export default function CounterHooks({ initialCount }) {
    const [count, setCount] = useState(initialCount);
    const theme = useContext(ThemeContext)
    return (
        <div style={theme}>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <span>{count}</span>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button >
        </div>
    )
}
