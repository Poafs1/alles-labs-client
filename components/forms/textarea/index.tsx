import classNames from 'classnames';
import { FormikProps } from 'formik';
import { InputHTMLAttributes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

type CombinedType = Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder'>;

export interface ITextareaProps extends CombinedType {
  formik: FormikProps<any>;
  label?: string;
}

export const Textarea = ({ label, formik, placeholder, name }: ITextareaProps) => {
  const isError = formik.errors[name] && formik.touched[name];

  return (
    <div>
      {label && (
        <label htmlFor={name} className='flex justify-between text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div className={classNames('relative flex items-center bg-white rounded-lg', label ? 'mt-1.5' : '')}>
        <TextareaAutosize
          id={name}
          className={classNames(
            'block w-full min-h-[100px] text-base placeholder:text-gray-500 border-0 ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-indigo-300 focus:outline-4 focus:outline-offset-1 focus:outline-indigo-100/50 rounded-lg px-3.5 py-2.5',
            isError ? 'ring-red-500' : '',
          )}
          placeholder={placeholder}
          {...{
            ...formik.getFieldProps(name),
            value: formik.values[name] || '',
          }}
        />
      </div>
      {isError && <div className='text-red-500 mt-1.5 text-xs'>{formik.errors[name]?.toString()}</div>}
    </div>
  );
};
