import clsx from "clsx";
import React from "react";

type ButtonProps = {
    classname?: string;
    type: "button" | "submit" | "reset";
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ classname, children, ...rest }: ButtonProps, ref) => {
        return (
            <button
                className={clsx(
                    "rounded-lg border-2 p-2 font-mono hover:animate-wiggle ",
                    // Color
                    {
                        "border-beige-500 bg-blue-500 text-beige-500":
                            true,
                    },
                    {
                        "border-blue-500 bg-beige-500 text-blue-500":
                            false,
                    },
                    classname
                )}
                {...rest}
                ref={ref}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
export default Button;
