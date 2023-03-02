import Head from "next/head";
import Layout from "src/components/nav/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { redirect } from 'next/navigation';

function Home() {
    const router = useRouter();
    
    useEffect(() => {
        router.push('/exchange');
    }, []);
    
    return (
        <Layout>
        <Head>
            <title>Omnia</title>
            <meta name="description" content="Omnia" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        </Layout>
    );
    
}

export default Home;
