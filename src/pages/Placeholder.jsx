import { motion } from 'framer-motion';

/**
 * Reusable placeholder page for routes that are still under construction.
 *
 * @param {{ title: string, description: string }} props
 */
export default function Placeholder({ title, description }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Coming Soon badge */}
      <span className="mb-6 inline-block rounded-full bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-500">
        Coming Soon
      </span>

      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>

      <p className="max-w-md text-lg text-surface-500 dark:text-surface-400">
        {description}
      </p>

      <div className="mt-10 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-400" />
    </motion.section>
  );
}
