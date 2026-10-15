import { motion } from "framer-motion";

const stats = [
  { title: "Documents Processed", value: "24", change: "+12%" },
  { title: "AI Chats", value: "53", change: "+18%" },
  { title: "Languages Used", value: "3", change: "+4%" },
  { title: "Accessibility Score", value: "98%", change: "+2%" },
];

function Dashboard() {
  return (
    <div className="dashboard-wrapper">

      {/* HERO SECTION */}
      <motion.div
        className="dashboard-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Welcome back, Dheeraj 👋</h1>
        <p>Your AI workspace is running smoothly. Here's your activity overview.</p>
      </motion.div>

      {/* STATS GRID */}
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h4>{stat.title}</h4>
            <div className="dashboard-value">{stat.value}</div>
            <span className="dashboard-change">{stat.change} this week</span>
          </motion.div>
        ))}
      </div>

      {/* ACTIVITY SECTION */}
      <motion.div
        className="dashboard-activity"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>📈 Weekly AI Usage</h3>
        <div className="activity-chart">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <div key={i} className="chart-bar">
              <div
                className="bar-fill"
                style={{ height: `${40 + Math.random() * 60}%` }}
              />
              <span>{day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI SUMMARY CARD */}
      <motion.div
        className="dashboard-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>🧠 AI Performance Insight</h3>
        <p>
          VoxAssist processed 78% more interactions this month. Voice engagement increased by 32%.
          Your workspace efficiency score is trending upward.
        </p>
      </motion.div>

    </div>
  );
}

export default Dashboard;