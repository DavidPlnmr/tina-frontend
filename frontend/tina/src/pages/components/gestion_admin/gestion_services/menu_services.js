import Header from '../../header';
import Footer from '../../footer';
import Services from './services';
import Head from "next/head";

/**
 * @namespace 'menu_services.js'
 * @description page that regroup all the services components (TO MODIFY...)
 * @returns {JSX.Element}
 */
export default function Menu_services() {
  return (
    <>
      <Head>
        <title>Tina - Gestion des services</title>
        <meta name="description" content="Page pour la gestion des services de l'application Tina" />
      </Head>
      <Header />
      <main>
        <Services />
      </main>
      <Footer />
    </>
  );
}