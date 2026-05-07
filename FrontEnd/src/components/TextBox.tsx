import React, { useEffect } from 'react';


type TextBoxProps = {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  width?: string;
 // isValid: boolean;
  setIsValid?: (val: boolean) => void;
};

const CustomTextBox: React.FC<TextBoxProps> = ({
  value,
  setValue,
  placeholder = '',
  type = 'text',
  //width = '200px',
 // isValid,
  //setIsValid,
}) => {
 const handleChange = (e:any) => {
    const inputVal = e.target.value;
    let valid = true;

    // TEXT validation
    if (type === 'text') {
      valid = /^[a-zA-Z\s]*$/.test(inputVal);
    }

    // NUMBER validation
    else if (type === 'number') {
      valid = /^[0-9]*$/.test(inputVal);
    }

    // 👉 update validation in parent
   /*  if (setIsValid) {
      setIsValid(valid);

    } */

    // 👉 update value only if valid
    if (valid) {
      setValue(inputVal);
    }
  };

// useEffect dependency on isAgeValid
 useEffect(() => {
    // Validate age whenever isAgeValid changes
    //  console.log(type, value, isValid);
  }, [value]);




  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-2/4"
      style={{
       // width: width,
        // 👇 use parent's validation state
       // backgroundColor: isValid ? 'white' : '#ffdddd',
      }}
    />
  );
};














export default CustomTextBox;