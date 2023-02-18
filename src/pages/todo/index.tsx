import { NextPage } from "next";
import React from "react";
import MainApp from "../../components/layouts/MainApp";
import Button from "../../components/customs/buttons/Button";

const Todo: NextPage = () => {
    console.log('object');
    return (
        <MainApp classname=''>
            <section className='h-screen'>
                <h1>Hi! What&apos;s up?</h1>
                <div className='grid grid-cols-4 grid-rows-4 p-2 gap-2 border-2 border-white'>
                    <div className='col-start-4 bg-blue-100 content-center align-middle items-center'>
                        <Button
                            type='button'
                            classname='p-2'
                        >
                            Add Task
                        </Button>
                    </div>
                    <div className='rounded-md bg-slate-200 col-start-1 col-end-3 row-span-2'></div>
                    <div className='rounded-md bg-orange-200 row-span-3 col-start-3 col-end-6'></div>
                    <div className='rounded-md bg-lime-200'></div>
                    <div className='rounded-md bg-green-200'></div>
                </div>
            </section>
            <section></section>
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
