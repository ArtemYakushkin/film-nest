import React from "react";
import { motion } from "framer-motion";

const rays = Array.from({ length: 12 });

const SunSpinner = () => {
  return (
    <div className="spinner-wrapper">
      <motion.div
        className="sun-spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        {rays.map((_, i) => (
          <div
            key={i}
            className="ray"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-45px)`,
            }}
          />
        ))}
        <div className="sun-core" />
      </motion.div>
    </div>
  );
};

export default SunSpinner;
