
import React from 'react';

type ErrorProps = {
 // value: string;
//  setValuer: (val: string) => void;
//  placeholder?: string;
 // type?: 'text' | 'number';
 // width?: string;
 // isValid: boolean;
//  setIsValid?: (val: boolean) => void;
};

const ErrorMessage: React.FC<ErrorProps> = (
 // {
  //value,
  //setValuer,
  //placeholder = '',
  //type = 'text',
  //width = '200px',
 // isValid,
  //setIsValid,
//}
) => {

  return (
       <p className="text-red-500 text-sm mt-2">
      <>*</>
      </p>
  );
};

export default ErrorMessage;