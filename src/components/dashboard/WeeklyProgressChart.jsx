import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Card } from '@/components/ui';

// SVG Dimensions
const CHART_WIDTH = 510;
const CHART_HEIGHT = 180;

export default function WeeklyProgressChart() {
  const { user } = useAuth();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    try {
      const suffix = user?.email ? `_${user.email}` : '';
      const val = localStorage.getItem(`placify_tasks${suffix}`);
      setTasks(val ? JSON.parse(val) : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTasks();
    window.addEventListener('focus', loadTasks);
    window.addEventListener('storage', loadTasks);
    window.addEventListener('placify_data_update', loadTasks);
    return () => {
      window.removeEventListener('focus', loadTasks);
      window.removeEventListener('storage', loadTasks);
      window.removeEventListener('placify_data_update', loadTasks);
    };
  }, [user]);

  // Compute daily hours dynamically from completed tasks
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dailyHours = [0, 0, 0, 0, 0, 0, 0];
  const xCoords = [45, 115, 185, 255, 325, 395, 465];

  tasks.forEach(t => {
    if (t.completed && t.completedAt) {
      const date = new Date(t.completedAt);
      let dayIdx = date.getDay(); // 0 is Sunday
      dayIdx = dayIdx === 0 ? 6 : dayIdx - 1; // convert to Mon-Sun
      
      const today = new Date();
      const diffTime = Math.abs(today - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        dailyHours[dayIdx] += 1.5; // 1.5 hours per task
      }
    }
  });

  const maxHours = Math.max(...dailyHours, 4.0);

  const chartData = days.map((day, idx) => {
    const hrs = dailyHours[idx];
    const y = 150 - (hrs / maxHours) * 110;
    return {
      day,
      hours: hrs,
      x: xCoords[idx],
      y: Math.max(20, Math.min(160, y))
    };
  });

  const pointsStr = chartData.map((p) => `${p.x},${p.y}`).join(' ');
  const linePath = `M ${pointsStr}`;
  const areaPath = `${linePath} L ${chartData[chartData.length - 1].x},${CHART_HEIGHT} L ${chartData[0].x},${CHART_HEIGHT} Z`;

  const totalHours = parseFloat(dailyHours.reduce((a, b) => a + b, 0).toFixed(1));
  
  return (
    <Card variant="default" className="p-6 relative overflow-hidden" hoverable={false}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
            Weekly Progress
          </h3>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
            Coding & Mock interview prep hours
          </p>
        </div>
        <div className="flex items-center gap-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-xl text-xs font-semibold">
          <TrendingUp size={14} />
          <span>{totalHours} hrs prepped this week</span>
        </div>
      </div>

      <div className="relative w-full h-[190px] mt-2 select-none">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.58 0.22 275)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="oklch(0.58 0.22 275)" stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.58 0.22 275)" />
              <stop offset="100%" stopColor="oklch(0.65 0.20 330)" />
            </linearGradient>
          </defs>

          {[30, 75, 120, 160].map((yVal, i) => (
            <line
              key={i}
              x1="30"
              y1={yVal}
              x2="480"
              y2={yVal}
              className="stroke-gray-150 dark:stroke-white/[0.04]"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}

          <motion.path
            key={`area-${pointsStr}`}
            d={areaPath}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          <motion.path
            key={`line-${linePath}`}
            d={linePath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {chartData.map((p, index) => (
            <g key={p.day}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="6"
                className="fill-indigo-600 dark:fill-indigo-400 stroke-white dark:stroke-gray-900 cursor-pointer"
                strokeWidth="2.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05, type: 'spring' }}
                whileHover={{ scale: 1.4 }}
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <text
                x={p.x}
                y={CHART_HEIGHT + 14}
                textAnchor="middle"
                className="fill-surface-400 dark:fill-surface-500 font-medium text-[10px]"
              >
                {p.day}
              </text>
            </g>
          ))}
        </svg>

        <AnimatePresence>
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute pointer-events-none bg-gray-900/90 dark:bg-white/95 text-white dark:text-gray-900 px-3 py-1.5 rounded-xl shadow-xl border border-white/[0.08] dark:border-gray-200/50 flex flex-col text-xs z-30"
              style={{
                left: `${(hoveredPoint.x / CHART_WIDTH) * 100}%`,
                top: `${(hoveredPoint.y / CHART_HEIGHT) * 100 - 32}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <span className="font-bold">{hoveredPoint.day}</span>
              <span className="text-[10px] opacity-90">{hoveredPoint.hours} hrs prepped</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
