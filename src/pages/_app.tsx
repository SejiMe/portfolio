import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import { api } from "../utils/api";

import "../styles/globals.css";
import { useState } from "react";
import Loader from "../components/Loader";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const [loading, setLoading] = useState(false);
    Router.events.on("routeChangeStart", () => {
        setLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
        setLoading(false);
    });
    return (
        <SessionProvider session={session}>
            {loading ? (
                <div className='flex flex-col h-screen w-screen items-center justify-center bg-blue-500'>
                    <div>
                        <h1 className="animate-pulse text-beige-500">
                            Relax, You are about to enter the Portal
                        </h1>
                    </div>
                    <Loader />
                </div>
            ) : (
                <Component {...pageProps} />
            )}
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
