import classNames from 'classnames';
import { FormikProps } from 'formik';
import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type CombinedType = Partial<Pick<LinkProps, 'href'>> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'type' | 'form'>;

export interface IButtonProps extends CombinedType {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  buttonWidth?: 'full' | 'auto';
  appearance?: 'primary' | 'tertiary';
  size?: 'sm' | 'md';
}

const Button = ({
  leadingIcon,
  trailingIcon,
  label,
  onClick,
  disabled,
  href,
  type,
  form,
  buttonWidth = 'auto',
  appearance = 'primary',
  size = 'md',
}: IButtonProps) => {
  const appearanceTheme = {
    primary: 'bg-indigo-600 text-white',
    tertiary: 'bg-transparent text-gray-600',
  };

  const buttonSizeTheme = {
    md: 'px-3.5 py-2.5 text-sm min-w-[100px]',
    sm: 'px-3.5 py-2 text-sm min-w-[80px]',
  };

  const renderButton = () => {
    return (
      <div
        className={classNames(
          'flex items-center justify-center space-x-2 rounded-lg font-semibold',
          disabled ? '' : '',
          appearanceTheme[appearance],
          buttonSizeTheme[size],
        )}>
        {leadingIcon}
        {label && <span className='flew-grow whitespace-nowrap'>{label}</span>}
        {trailingIcon}
      </div>
    );
  };

  if (href) {
    return (
      <Link href={href} className='block'>
        {renderButton()}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
      className={classNames(buttonWidth ? `w-${buttonWidth}` : 'w-full')}>
      {renderButton()}
    </button>
  );
};

export const handleDisabledButton = (formik: FormikProps<any>) => !(formik.dirty && formik.isValid);

export default Button;
