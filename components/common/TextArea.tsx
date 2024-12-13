import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { useFormContext } from 'react-hook-form';

interface TextAreaProps {
  length: number;
  name: string;
  Label: string;
  placeHolder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ length, Label, name, placeHolder = "" }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message; 
  const [currentLength, setCurrentLength] = useState(0); // State to track current length

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(event.target.value.length); // Update current length
  };

  return (
    <div className="h-full space-y-2 min-h-[150px]">
      <div className="flex justify-between items-center">
        <h1 className="text-paragraph font-poppin text-[1rem]">{Label}</h1>
        <span className="text-paragraph font-poppin text-[0.6rem]">{currentLength}/{length}</span>
      </div>
      <Textarea
        maxLength={length}
        {...register(name)}
        placeholder={placeHolder}
        onChange={handleChange} // Handle change to update length
        className={`border border-[#E3E3E4] text-[0.9rem] font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749]
        ${error ? 'focus:border-4 focus:border-[#F6CCD0] border-[#DC3545]' : 'focus:border-4 focus:border-[#BFDEFF]'} focus:outline-none rounded-lg w-full h-[90%]`} 
      />
      {error && <p className="text-red-500 font-[400] text-[0.8rem] pb-6">{String(error)}</p>} {/* Convert error to string */}
    </div>
  );
};

export default TextArea;