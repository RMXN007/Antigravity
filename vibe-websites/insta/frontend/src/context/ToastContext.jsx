import React, { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 z-[200]">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium shadow-lg animate-slide-in-up min-w-[300px] justify-between
                            ${toast.type === 'success' ? 'bg-[#58c322] text-white' : ''}
                            ${toast.type === 'error' ? 'bg-[#ed4956] text-white' : ''}
                            ${toast.type === 'info' ? 'bg-[#262626] text-white' : ''}
                        `}
                    >
                        <span>{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)} className="opacity-80 hover:opacity-100">
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
