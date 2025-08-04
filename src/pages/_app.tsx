import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../contexts/AppContext";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Handle route changes for analytics
    const handleRouteChange = (url: string) => {
      // You can add analytics tracking here
      console.log(`App navigated to: ${url}`);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <AppProvider>
      <Head>
        <title>CareerOS - AI Career Assistant</title>
        <meta name="description" content="AI-powered career guidance platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:title" content="CareerOS" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="/social-preview.jpg" />
      </Head>
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
