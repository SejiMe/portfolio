import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../../utils/api";

const testLinks = [
    { href: "/", label: "Home" },
    { href: "/todo", label: "TODO's" },
    { href: "/", label: "Portfolio" },
];

const Header = () => {
    // const hello = api.example.hello.useQuery({ text: "from tRPC" });
    return (
        <header
            className={clsx(
                "flex h-24 items-center justify-between bg-blue-500 text-center font-primary text-beige-500"
            )}
        >
            <h1 className='flex h-full items-center'>Seji</h1>
            <div className='h-full'>
                <nav className='mr-3 flex h-full gap-4'>
                    <ul className='flex h-full content-center gap-4'>
                        {testLinks.map((link, key) => (
                            <li
                                key={key}
                                className='flex w-full content-center items-center bg-blue-500 text-2xl hover:bg-blue-100 hover:text-blue-500'
                            >
                                <Link
                                    href={link.href}
                                    className=''
                                    legacyBehavior
                                >
                                    <a>{link.label}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <AuthShowcase />
        </header>
    );
};
export default Header;

const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();

    const { data: secretMessage } =
        api.example.getSecretMessage.useQuery(
            undefined, // no input
            { enabled: sessionData?.user !== undefined }
        );

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-center text-2xl text-white'>
                {sessionData && (
                    <span>Logged in as {sessionData.user?.name}</span>
                )}
                {secretMessage && <span> - {secretMessage}</span>}
            </p>
            <button
                className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
                onClick={
                    sessionData
                        ? () => void signOut()
                        : () => void signIn()
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
};
