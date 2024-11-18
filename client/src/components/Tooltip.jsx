import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import propTypes from "prop-types";

function Tooltip({ children, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-black rounded"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Tooltip.propTypes = {
  children: propTypes.node.isRequired,
  description: propTypes.string.isRequired,
};

export default Tooltip;