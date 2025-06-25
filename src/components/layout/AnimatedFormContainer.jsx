import { motion, AnimatePresence } from "framer-motion";

const AnimatedFormContainer = ({ children, direction }) => {
  // Animation variants for slide transitions
  const variants = {
    enter: (direction) => {
      return {
        x: direction === "next" ? "100%" : "-100%",
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction === "next" ? "-100%" : "100%",
        opacity: 0,
      };
    },
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={children.key}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedFormContainer;
