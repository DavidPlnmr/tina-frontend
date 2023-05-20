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
