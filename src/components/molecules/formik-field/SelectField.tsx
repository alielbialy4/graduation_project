import { useField } from "formik";
import Label from "../Label";

// تعريف واجهة Option
interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    name: string;
    options?: Option[]; // اختياري لأنه قد يكون undefined أثناء التحميل
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    label?: string;
    id?: string;
    required?: boolean;
}

/**
 * مكون SelectField متوافق مع Formik لعرض قائمة منسدلة
 */
const SelectField: React.FC<SelectProps> = ({
    name,
    options = [],
    label,
    id,
    placeholder = "Select an option",
    className = "",
    defaultValue = "",
    required = false,
}) => {
    const [field, meta] = useField(name);

    return (
        <div className="relative">
            {label && (
                <Label htmlFor={id || name}>
                    {required && <span className="text-error-500 mx-1">*</span>}
                    {label}
                </Label>
            )}

            <select
                {...field}
                className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ${
                    field.value
                        ? "text-gray-800"
                        : "text-gray-400"
                } ${meta.touched && meta.error ? "border-red-500" : ""} ${className}`}
                defaultValue={defaultValue}
                id={id || name}
                disabled={!options.length} // تعطيل إذا لم تكن هناك خيارات
            >
                <option
                    value=""
                    disabled
                    className="text-gray-700"
                >
                    {options.length ? placeholder : "Loading options..."}
                </option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="text-gray-700"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {meta.touched && meta.error ? (
                <div className="mt-1 text-sm text-red-500">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default SelectField;