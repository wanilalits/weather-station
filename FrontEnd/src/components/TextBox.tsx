import React, { forwardRef } from "react";

type TextBoxProps = {
  value: string;
  setValuer: (val: string) => void;
  placeholder?: string;
  width?: string;
  lableText?: string;
  errorText?: string;
  type?: string;
};

const CustomTextBox = forwardRef<HTMLInputElement, TextBoxProps>(
  (
    {
      value,
      setValuer,
      placeholder = "",
      lableText,
      errorText,
      type ,
    },
    ref
  ) => {

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setValuer(e.target.value);
    };

    return (
      <div>

        {/* Label */}
        <p className="text-black text-sm mb-1 font-medium">
          {lableText}*
        </p>

        {/* Input */}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="
            w-full
            px-3
            py-2
            text-sm
            border
            border-gray-300
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-[#007498]
          "
        />

        {/* Error */}
        {
          errorText && (
            <p className="text-red-500 text-xs mt-1">
              {errorText}
            </p>
          )
        }

      </div>
    );
  }
);

export default CustomTextBox;