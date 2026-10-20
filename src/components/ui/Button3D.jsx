import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Button3D = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '',
  style = {}
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      className={className}
      style={{
        fontFamily: "American Captain, serif", 
        fontSize: "10px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "#fada80",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "1px solid #1a0f07",
        background: "linear-gradient(180deg, #5c3a21 0%, #3b2210 100%)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        ...style
      }}
      initial={{
        boxShadow: `
          inset 0 1px 1px rgba(255,255,255,0.15),
          inset 0 -2px 4px rgba(0,0,0,0.5),
          0 4px 0 #1f1006,
          0 6px 10px rgba(0,0,0,0.5)
        `,
        y: 0
      }}
      whileHover={{
        background: "linear-gradient(180deg, #6d4629 0%, #472b15 100%)",
        boxShadow: `
          inset 0 1px 2px rgba(255,255,255,0.3),
          inset 0 -2px 4px rgba(0,0,0,0.6),
          0 6px 0 #1f1006,
          0 10px 15px rgba(0,0,0,0.7)
        `,
        y: -2,
        transition: { duration: 0.1 }
      }}
      animate={{
        y: isPressed ? 4 : 0,
        boxShadow: isPressed 
          ? `
              inset 0 4px 8px rgba(0,0,0,0.9),
              0 0 0 #1f1006,
              0 2px 5px rgba(0,0,0,0.8)
            ` 
          : undefined
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};