import Head from "next/head";
import Header from "./components/header";
import Accueil from "./components/accueil";
import Footer from "./components/footer";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tina - Page d'accueil</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon_io/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/favicon_io/android-chrome-512x512.png" />
        <link rel="manifest" href="/images/favicon_io/site.webmanifest" />
      </Head>
      <main>
        <Header />
        <Accueil />
      </main>
        <Footer /> {/* Render the Footer component */}

        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    </>
  );
}
