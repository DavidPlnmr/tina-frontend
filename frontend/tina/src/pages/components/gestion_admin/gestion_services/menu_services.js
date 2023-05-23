import Header from '../../header';
import Footer from '../../footer';
import Services from './services';

/**
 * @namespace 'menu_services.js'
 * @description page that regroup all the services components (TO MODIFY...)
 * @returns {JSX.Element}
 */
export default function Menu_services() {
  return (
    <>
        <Header/>
        <main>
        <Services/>
        </main>
        <Footer/>
    </>
  );
}