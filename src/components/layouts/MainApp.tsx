import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import clsx from "clsx";

function MainApp({
    children,
    classname,
}: {
    children?: React.ReactNode;
    classname?: string;
}): JSX.Element {
    return (
        <>
            <Header />
            <main className={clsx("", classname)}>{children}</main>
            <Footer />
        </>
    );
}

export default MainApp;
