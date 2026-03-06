import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-2 rounded-lg font-medium transition-all duration-300 transform active:scale-95";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl shadow-blue-500/50 hover:shadow-blue-500/50",
        outline: "border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400",
        ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
