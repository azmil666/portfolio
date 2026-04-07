import { forwardRef, useImperativeHandle, useCallback } from "react";
import { motion, useAnimate } from "motion/react";

const LinkedinIcon = forwardRef(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(".border", { scale: [1, 1.05, 1] }, { duration: 0.4 });
      await animate(".lines", { pathLength: [0, 1] }, { duration: 0.5 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".lines, .border", { pathLength: 1, scale: 1 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        className={`cursor-pointer ${className}`}
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <motion.path className="lines" d="M8 11v5" initial={{ pathLength: 1 }} />
        <motion.path className="lines" d="M8 8v.01" initial={{ pathLength: 1 }} />
        <motion.path className="lines" d="M12 16v-5" initial={{ pathLength: 1 }} />
        <motion.path className="lines" d="M16 16v-3a2 2 0 1 0 -4 0" initial={{ pathLength: 1 }} />
        <motion.path
          className="border"
          d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"
        />
      </motion.svg>
    );
  }
);

export default LinkedinIcon;