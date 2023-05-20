import Header from '../header';
import Footer from '../footer';
import Encaissement from './gestion_encaissement';

/**
 * @namespace 'menu_encaissement.js'
 * @description page that regroup all the encaissement components (TO MODIFY...)
 * @returns {JSX.Element}
 */
export default function Menu_encaissement() {
  return (
    <>
        <Header/>
        <Encaissement/>
        <Footer/>
    </>
  );
}