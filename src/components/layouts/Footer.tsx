import clsx from "clsx";
import React from "react";

const Footer = () => {
  return (
        <footer className='bg-beige-400 mt-10'>
            <h1>This is Footer</h1>
            <div className='grid grid-flow-col gap-4'>
                <Divider>
                    <h2>1</h2>
                </Divider>
                <Divider>
                    <h2>2</h2>
                </Divider>
                <Divider>
                    <h2>3</h2>
                </Divider>
            </div>
    </footer>
  );
};

export default Footer;

// This is a div container
const Divider = ({
    children,
    classname,
}: {
    children?: React.ReactNode;
    classname?: string;
}) => {
    return (
        <div
            className={clsx(
                "flex justify-center border-2 border-teal-400 p-4",
                classname
            )}
        >
            {children}
        </div>
    );
};
