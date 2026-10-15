import { motion } from "framer-motion";

function Waveform() {
  return (
    <div className="waveform">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="bar"
          animate={{ height: ["20px", "60px", "20px"] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export default Waveform;