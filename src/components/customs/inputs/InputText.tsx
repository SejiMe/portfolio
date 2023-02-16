import clsx from "clsx";
import React from "react";

// type InputProps = React.DetailedHTMLProps<
//     React.AllHTMLAttributes<HTMLInputElement>,
//     HTMLInputElement
// > & { variant: "light" | "dark" };

type InputProps = {
    label?: string;
    value?: string;
    name?: string;
    classname?: string;
    placeholder?: string;
    onChange: (newValue: string) => void;
};

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
    ({ placeholder, onChange, name, label }, ref) => {
        return (
            <>
                <label htmlFor={name}>{label}</label>
                <input
                    className={clsx("rounded-lg border-2 p-2")}
                    placeholder={placeholder}
                    type='text'
                    name={name}
                    ref={ref}
                    onChange={(e) => onChange(e.currentTarget.value)}
                />
            </>
        );
    }
);

InputText.displayName = "InputText";
export default InputText;
