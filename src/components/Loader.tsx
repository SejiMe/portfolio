import React from "react";
import Styles from '../styles/loader.module.css'
const Loader = () => {
    return (
        <div className={Styles.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;
