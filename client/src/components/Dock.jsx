import { FoxHeadIcon, QuestionMarkIcon } from "../assets/Icons"
import Tooltip from './Tooltip';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import propTypes from "prop-types";

export default function Dock() {
  let mouseX = useMotionValue(Infinity);
  
  const description = [
    'Find the FOX',
    'Not available',
    'Not available',
    'Not available',
    'Not available',
    'Not available',
  ];

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end h-16 gap-4 px-4 pb-3 bg-secondaryBg rounded-xl glassmorphism">
      {[...Array(6).keys()].map((i) => (
        <Tooltip key={i} description={description[i]}>
          <AppIcon mouseX={mouseX} index={i} />
        </Tooltip>
      ))}
    </div>
  );
};

function AppIcon({ mouseX, index }) {
  let ref = useRef(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x:0, width:0 };
    return val - bounds.x - bounds.width / 2;
  })
  let widthSync = useTransform(distance, [-200, 0, 200], [40, 70, 40]);
  let width = useSpring(widthSync, { damping: 15, stiffness: 200, mass: 0.1 });
  let backgroundColor = useTransform(width, [40, 70], ['rgba(0, 0, 0, 0)', 'rgba(75, 85, 99, 1)']); // Transparent to gray-500

  return (
    <motion.div
      ref={ref}
      style={{ width, backgroundColor }}
      className="flex items-center justify-center w-10 rounded-full bg-secondaryAcc aspect-square"
    >
      {index === 0 ? (
          <motion.div style={{width, height: width}}>
            <FoxHeadIcon />
          </motion.div>
        ) : (
          <motion.div style={{width, height: width}}>
            <QuestionMarkIcon />
          </motion.div>
        )
      }
    </motion.div>
  );
};

AppIcon.propTypes = {
  mouseX: propTypes.instanceOf(MotionValue).isRequired,
  index: propTypes.number.isRequired,
}