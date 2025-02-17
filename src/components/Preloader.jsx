import { motion } from "framer-motion";

const Preloader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-dark-blue">
      <motion.div
        className="relative w-16 h-16 flex justify-center items-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        {/* Glowing Outer Ring */}
        <div className="absolute w-full h-full border-4 border-transparent border-t-sky-blue border-b-mint-green rounded-full animate-spin-fast"></div>
        
        {/* Inner Circle */}
        <div className="w-8 h-8 bg-sky-blue rounded-full shadow-lg shadow-mint-green"></div>
      </motion.div>
    </div>
  );
};

export default Preloader;
