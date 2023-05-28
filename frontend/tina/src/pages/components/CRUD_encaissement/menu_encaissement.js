import Header from '../header';
import Footer from '../footer';
import Encaissement from './gestion_encaissement';
import Head from "next/head";

/**
 * @namespace 'menu_encaissement.js'
 * @description page that regroup all the encaissement components (TO MODIFY...)
 * @returns {JSX.Element}
 */
export default function Menu_encaissement() {
  return (
    <>
      <Head>
        <title>Tina - Gestion de l'encaissementt</title>
        <meta name="description" content="Page de gestion des encaissements de l'application Tina" />
      </Head>
      <Header />
      <Encaissement />
      <Footer />
    </>
  );
}