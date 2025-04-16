import { useState, type FC } from "react";
import { Field, useField } from "formik";
import Label from "../Label";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

interface InputProps {
     type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
     id?: string;
     name: string; // Required for Formik
     placeholder?: string;
     className?: string;
     min?: string;
     max?: string;
     step?: number;
     disabled?: boolean;
     success?: boolean;
     error?: boolean;
     hint?: string;
     label?: string;
     required?: boolean;
     [key: string]: any;
}

const BaseInputField: FC<InputProps> = ({
     type = "text",
     id,
     name,
     placeholder,
     className = "",
     min,
     max,
     step,
     disabled = false,
     success = false,
     error = false,
     hint,
     label,
     required = false,
     ...props
}) => {
     const [showPassword, setShowPassword] = useState(false);
     // Use Formik's useField hook to get field props and meta data
     const [field, meta] = useField(name);

     // Determine if there's an error from Formik
     const hasError = meta.touched && meta.error;
     const isSuccess = meta.touched && !meta.error && meta.value; // Success if touched and no error

     let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 ${className}`;

     if (disabled) {
          inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed opacity-40`;
     } else if (error || hasError) {
          inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20`;
     } else if (success || isSuccess) {
          inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20`;
     } else {
          inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20`;
     }

     return (
          <>
               <div className="relative">
                    {label && (
                         <Label htmlFor={id || name}>
                              {required && <span className="text-error-500 mx-1">*</span>}
                              {label}
                         </Label>
                    )}
                    <Field
                         type={type === "password" && showPassword ? "text" : type}
                         id={id || name}
                         // @ts-ignore
                         name={name}
                         placeholder={placeholder}
                         min={min}
                         max={max}
                         step={step}
                         disabled={disabled}
                         className={inputClasses}
                         {...field}
                         {...props}
                    />
                    {type === "password" && (
                         <span
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute z-30 -translate-y-1/2 cursor-pointer rtl:left-4 ltr:right-4 top-1/2 mt-3"
                         >
                              {showPassword ? (
                                   <FaEye className="fill-gray-500 dark:fill-gray-400 size-5" />
                              ) : (
                                   <FaEyeSlash className="fill-gray-500 dark:fill-gray-400 size-5" />
                              )}
                         </span>
                    )}
               </div>

               {(hint || (meta.touched && meta.error)) && (
                    <p
                         className={`mt-1.5 text-xs ${hasError
                              ? "text-error-500"
                              : isSuccess
                                   ? "text-success-500"
                                   : "text-gray-500"
                              }`}
                    >
                         {meta.touched && meta.error ? meta.error : hint}
                    </p>
               )}
          </>
     );
};

export default BaseInputField;