import { NextPage } from "next";
import React from "react";
import MainApp from "../../components/layouts/MainApp";

const Todo: NextPage = () => {
    return (
        <MainApp>
            <section>
                <h1>Hi! What&apos;s up?</h1>
            </section>
        </MainApp>
    );
};

export default Todo;

export async function getServerSideProps() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    return {
        props: {},
    };
}
