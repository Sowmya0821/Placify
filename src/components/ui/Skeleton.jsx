import React from 'react';

/**
 * A highly customizable, theme-aware Skeleton placeholder component.
 *
 * @param {object} props
 * @param {'text'|'circular'|'rectangular'} [props.variant='rectangular']
 * @param {string} [props.width] - e.g. '100%', '200px', 'h-8'
 * @param {string} [props.height] - e.g. '16px', '100px'
 * @param {string} [props.className] - additional Tailwind classes
 */
export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  className = '',
  ...rest
}) {
  const styles = {};
  if (width) styles.width = width;
  if (height) styles.height = height;

  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded-md h-3 w-3/4 my-1.5';
      case 'rectangular':
      default:
        return 'rounded-2xl';
    }
  };

  return (
    <div
      className={[
        'bg-surface-200 dark:bg-white/[0.06]',
        'animate-pulse',
        getVariantClasses(),
        className
      ]
        .filter(Boolean)
        .join(' ')}
      style={styles}
      {...rest}
    />
  );
}

export default Skeleton;
