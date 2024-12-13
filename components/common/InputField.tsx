import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';

interface InputFieldProps {
  name: string;
  Label: string;
  placeHolder?: string;
  length?: number;
  width?: boolean; // Add width prop
}

const InputField: React.FC<InputFieldProps> = ({ Label, name, placeHolder = "", length = null, width = false }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message;
  const [currentLength, setCurrentLength] = useState(0); // State to track current length

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLength(event.target.value.length); // Update current length
  };

  return (
    <div className={`space-y-2 ${width ? 'w-full' : 'max-w-3xl'} w-full flex flex-col items-start`}>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-paragraph font-poppin font-[400] text-[1rem]">{Label}</h1>
        {length ? (
          <span className="text-paragraph font-poppin text-[0.6rem]">{currentLength}/{length}</span>
        ) : null}
      </div>
      <Input
        {...register(name)}
        placeholder={placeHolder}
        onChange={handleChange} // Handle change to update length
        className={`border border-[#E3E3E4] ${width ? 'h-16' : 'h-10'} text-[0.95rem] font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
        ${error ? 'focus:border-4 focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-4 focus:border-[#BFDEFF]'} focus:outline-none rounded-sm w-full`} 
      />
      {error && <p className="text-red-500 font-[400] text-[0.8rem] mb-2">{String(error)}</p>} {/* Convert error to string */}
    </div>
  );
};

export default InputField;