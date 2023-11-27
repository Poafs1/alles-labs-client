import classNames from 'classnames';

export interface IBadgeProps {
  label: string;
  color?: 'pink' | 'blue' | 'green' | 'yellow' | 'red';
}

export const Badge = ({ label, color = 'blue' }: IBadgeProps) => {
  const colorTheme = {
    pink: 'bg-pink-50 text-pink-700 ring-pink-700/10',
    blue: 'bg-blue-50 text-blue-700 ring-blue-700/10',
    green: 'bg-green-50 text-green-700 ring-green-700/10',
    yellow: 'bg-yellow-50 text-yellow-700 ring-yellow-700/10',
    red: 'bg-red-50 text-red-700 ring-red-700/10',
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
        colorTheme[color],
      )}>
      {label}
    </span>
  );
};
