import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';

export interface IButtonSelectionProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  coverImage: string;
  alt: string;
  label: string;
}

export const ButtonSelection = ({ coverImage, alt, label, onClick }: IButtonSelectionProps) => {
  return (
    <button
      onClick={onClick}
      className='flex space-x-2 items-center min-w-[300px] py-2 px-4 rounded-lg bg-white hover:bg-gray-100 cursor-pointer'>
      <Image src={coverImage} alt={alt} width={36} height={36} className='rounded-full' />
      <p className='font-semibold'>{label}</p>
    </button>
  );
};
