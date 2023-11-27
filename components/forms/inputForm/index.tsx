import classNames from 'classnames';
import { FormikProps } from 'formik';
import { InputHTMLAttributes, useEffect, useState } from 'react';

type CombinedType = Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'disabled' | 'maxLength' | 'type'>;

export interface IInputFormProps extends CombinedType {
  formik: FormikProps<any>;
  label?: string;
  note?: string;
}

const InputForm = ({ label, formik, type, placeholder, disabled, maxLength, note, name }: IInputFormProps) => {
  const [inputType, setInputType] = useState('text');

  useEffect(() => {
    if (!type) return;

    setInputType(type);
  }, [type]);

  const isError = formik.errors[name] && formik.touched[name];

  return (
    <div>
      {label && (
        <label htmlFor={name} className='flex justify-between text-sm font-medium text-gray-700'>
          {label}
          {maxLength && (
            <p className='font-normal'>
              {formik.values[name]?.toString().length}/{maxLength}
            </p>
          )}
        </label>
      )}
      <div className={classNames('relative flex items-center bg-white rounded-lg', label ? 'mt-1.5' : '')}>
        <input
          type={inputType}
          id={name}
          className={classNames(
            'block w-full text-base placeholder:text-gray-500 border-0 ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-indigo-300 focus:outline-4 focus:outline-offset-1 focus:outline-indigo-100/50 rounded-lg px-3.5 py-2.5',
            isError ? 'ring-red-500' : '',
          )}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          {...{
            ...formik.getFieldProps(name),
            value: formik.values[name] || '',
          }}
        />
      </div>
      {note && !isError && <p className='text-sm text-gray-500 mt-1.5'>{note}</p>}
      {isError && <div className='text-red-500 mt-1.5 text-xs'>{formik.errors[name]?.toString()}</div>}
    </div>
  );
};

export default InputForm;
