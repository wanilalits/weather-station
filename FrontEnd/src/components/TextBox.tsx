import React, {  } from 'react';


type TextBoxProps = {
  value: string;
   setValuer: (val: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  width?: string;
lableText?:String
errorText?:String
  setIsValid?: (val: boolean) => void;
  // isValid: boolean;
};

const CustomTextBox: React.FC<TextBoxProps> = ({
  value,
  setValuer,
  placeholder = '',
  type = 'text',
  lableText,
  errorText
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
      setValuer(inputVal);
    }
  };




  return (
    
    <><p className="text-black text-base mb-0">
      <>{lableText}*</>
      </p>
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
       className="w-full
px-3
py-2
text-base
border
border-gray-300
rounded-lg"
      style={{
       // width: width,
        // 👇 use parent's validation state
       // backgroundColor: isValid ? 'white' : '#ffdddd',
      }}
    />
 <p className="text-red-500 text-xs mt-0">
      {errorText}
      </p>

    </>
  );
};














export default CustomTextBox;