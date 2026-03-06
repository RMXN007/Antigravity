import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialTime = 0) => {
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isActive && timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive]);

    const start = () => setIsActive(true);
    const stop = () => setIsActive(false);
    const reset = () => {
        setIsActive(false);
        setTime(initialTime);
    };

    const formattedTime = new Date(time * 1000).toISOString().substring(14, 19);

    return { time, formattedTime, isActive, start, stop, reset };
};
