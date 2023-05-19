import React, {useEffect} from 'react';
import styles from "@/styles/Accueil.module.css";
import Carousel from 'react-bootstrap/Carousel';
import Footer from "@/pages/components/footer";
import { Fade } from 'react-awesome-reveal';
import {Button, Card, Col, Container, Row} from "react-bootstrap";

/**
 * @namespace 'accueil.js'
 * @description This component provides the functionality to create and manage the home page.
 * @returns {JSX.Element} A React functional component rendering the home page.
 */
export default function Accueil() {

    /**
     * @constant products
     * @memberof 'accueil.js'
     * @description An array containing the products to be displayed on the home page.
     * @type {[{backgroundColor: string, title: string, textColor: string},{backgroundColor: string, title: string, textColor: string},{backgroundColor: string, title: string, textColor: string},{backgroundColor: string, title: string, textColor: string},{backgroundColor: string, title: string, textColor: string},null]}
     * @see {@link 'accueil.js'.products}
     */
    const products = [
        { title: 'Shampoing', backgroundColor: '#292E3D', textColor: '#F6F8F7' },
        { title: 'Gels, Cires & Poudre', backgroundColor: '#F6F8F7', textColor: '#292E3D' },
        { title: 'Laques', backgroundColor: '#292E3D', textColor: '#F6F8F7' },
        { title: 'Ciseaux', backgroundColor: '#F6F8F7', textColor: '#292E3D' },
        { title: 'Tondeuses', backgroundColor: '#292E3D', textColor: '#F6F8F7' },
        { title: 'Couleurs', backgroundColor: '#F6F8F7', textColor: '#292E3D' },
    ];

    /**
     * @constant isBrowser
     * @memberof 'accueil.js'
     * @description A function to check if the code is running in a browser or not.
     * @type {function(): boolean}
     * @see {@link 'accueil.js'.isBrowser}
     * @returns {boolean}
     */
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    /**
     * @function toggleVisibility
     * @memberof 'accueil.js'
     * @description A function to display the "return to top" button when the user scrolls down the page.
     * @see {@link 'accueil.js'.toggleVisibility}
     * @returns {void}
     */
    function toggleVisibility() {
        if (!isBrowser()) return;
        if (window.scrollY > 300) {
            document.getElementById("returnToTop").style.display = "block";
        } else {
            document.getElementById("returnToTop").style.display = "none";
        }
    }

    /**
     * @function useEffect
     * @memberof 'accueil.js'
     * @description A function to add an event listener to the window object to display the "return to top" button when the user scrolls down the page.
     * @see {@link 'accueil.js'.useEffect}
     * @returns {void}
     * @async
     */
    useEffect(() => {
        if (!isBrowser()) return;
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    /**
     * @function scrollToTop
     * @memberof 'accueil.js'
     * @description A function to scroll to the top of the page when the user clicks on the "return to top" button.
     * @see {@link 'accueil.js'.scrollToTop}
     * @returns {void}
     */
    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (

        <>
            {/* Carousel avec 3 images*/}
            <Carousel fade>
                <Carousel.Item>
                    <img src="/images/home_images/carousel/carousel_1.jpg" className="d-flex w-100" alt="Un style unique" />
                    <Carousel.Caption className={styles.carouselCaption}>
                        <h3 className={styles.carouselTitle}>Un style unique</h3>
                        <p className={styles.carouselText}>Des coiffures sur mesure pour refléter votre personnalité</p>
                        <Button variant="outline-light" href="/components/prise_rendez_vous/service_rdv" className={styles.carouselButton}>Prendre rendez-vous</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/images/home_images/carousel/carousel_2.jpg" className="d-block w-100" alt="Le confort avant tout" />
                    <Carousel.Caption className={styles.carouselCaption}>
                        <h3 className={styles.carouselTitle}>Le confort avant tout</h3>
                        <p className={styles.carouselText}>Un espace détente pour une expérience agréable</p>
                        <Button variant="outline-light" href="/components/prise_rendez_vous/service_rdv" className={styles.carouselButton}>Prendre rendez-vous</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/images/home_images/carousel/carousel_3.jpg" className="d-block w-100" alt="Des professionels à votre écoute" />
                    <Carousel.Caption className={styles.carouselCaption}>
                        <h3 className={styles.carouselTitle}>Des professionnels à votre écoute</h3>
                        <p className={styles.carouselText}>Une équipe dédiée à vos besoins en coiffure</p>
                        <Button variant="outline-light" href="/components/prise_rendez_vous/service_rdv" className={styles.carouselButton}>Prendre rendez-vous</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


            {/* Nos services */}
            <Container className={"mt-5"}>
                <Fade triggerOnce direction="up">
                    <h2 className={"text-center"} style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>Nos services</h2>
                    <hr className="featurette-divider" />
                    <Row>
                        <div className="col-md-4">
                            <div className={`card ${styles.servicecard}`}>
                                <img src="https://i.pinimg.com/736x/ae/67/7a/ae677a18891ad058e1526f2b087028b6.jpg" className="card-img-top" alt="Coupe de cheveux personnalisée" />
                                <div className="card-body">
                                    <h5 className="card-title">Coupe de cheveux personnalisée</h5>
                                    <p>Notre équipe de coiffeurs professionnels est spécialisée dans les coupes de cheveux pour hommes. Que vous souhaitiez un look classique ou un style plus moderne, nous sommes là pour vous aider à trouver la coupe parfaite qui reflète votre personnalité et votre style.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`card ${styles.servicecard}`}>
                                <img src="https://img.freepik.com/free-photo/handsome-man-cutting-beard-barber-shop-salon_1303-20931.jpg" className="card-img-top" alt="Taille de la barbe et rasage" />
                                <div className="card-body">
                                    <h5 className="card-title">Taille de la barbe et rasage</h5>
                                    <p>Offrez-vous une expérience de rasage et de taille de la barbe de qualité supérieure. Nos barbiers experts sont formés pour sculpter et entretenir votre barbe avec précision, en utilisant des outils et des techniques traditionnelles pour un résultat impeccable.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`card ${styles.servicecard}`}>
                                <img src="https://img.freepik.com/free-photo/crop-hairdresser-washing-hair-client_23-2147778780.jpg?w=1060&t=st=1683727994~exp=1683728594~hmac=3374aec0a5e05c5d2ecdc7fe13a9f1f3a1460f58533de981c23e6ad5442d5e56" className="card-img-top" alt="Coloration" />
                                <div className="card-body">
                                    <h5 className="card-title">Coloration</h5>
                                    <p>Notre barber shop propose des services de coloration personnalisés pour les hommes, allant de la couverture des cheveux gris à des transformations audacieuses. Nous utilisons des produits de haute qualité et respectueux du cuir chevelu pour garantir des résultats durables et éclatants.</p>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Fade>
            </Container>

            {/* Qui sommes-nous ?*/}
            <div className="py-5">
                <div className="container py-5">
                    <Fade triggerOnce direction="left">
                        <div className="row align-items-center mb-5">
                            <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                                <h2 className="font-weight-light">Notre philosophie</h2>
                                <p className="font-italic text-muted mb-4">Chez Tina Coiffure, nous croyons que chaque coupe de cheveux est une forme d'expression. Notre mission est d'aider chaque client à trouver son style unique, à travers des services personnalisés et une attention particulière aux détails. Nous sommes passionnés par notre métier et nous nous efforçons de créer une expérience agréable et mémorable à chaque visite.</p>
                                <a href="https://goo.gl/maps/jHu3JBzorevPJ9qf6" target="_blank" className="btn btn-light px-5 rounded-pill shadow-sm">Où nous trouver ?</a>
                            </div>
                            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                                <img src="/images/home_images/qui_sommes_nous/perso_1.PNG" alt="Notre philosophie" className="img-fluid mb-4 mb-lg-0 rounded-pill shadow"/>
                            </div>
                        </div>
                    </Fade>
                    <Fade triggerOnce direction="right">
                        <div className="row align-items-center mb-5">
                            <div className="col-lg-5 px-5 mx-auto">
                                <img src="/images/home_images/qui_sommes_nous/perso_2.PNG" alt="Notre équipe" className="img-fluid mb-4 mb-lg-0 rounded-pill shadow" />
                            </div>
                            <div className="col-lg-6"><i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
                                <h2 className="font-weight-light">Une tradition revisitée</h2>
                                <p className="font-italic text-muted mb-4">Chez Tina Coiffure, nous honorons la tradition du barber shop tout en l'adaptant aux exigences modernes. Nous combinons l'artisanat classique de la coiffure masculine avec les dernières tendances et techniques. Que vous recherchiez une coupe de cheveux classique, une taille de barbe précise ou un style plus audacieux, nous avons les compétences et l'expérience nécessaires pour répondre à vos besoins.</p>
                                <a href="/components/prise_rendez_vous/service_rdv" className="btn btn-light px-5 rounded-pill shadow-sm">Prendre rendez-vous</a>
                            </div>
                        </div>
                    </Fade>
                    <Fade triggerOnce direction="left">

                        <div className="row align-items-center mb-5">
                            <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                                <h2 className="font-weight-light">Notre équipe</h2>
                                <p className="font-italic text-muted mb-4">Notre équipe de professionnels expérimentés est au cœur de Tina Coiffure. Chacun de nos stylistes apporte son propre style et expertise à notre salon, créant une atmosphère dynamique et accueillante. Nous sommes fiers de notre équipe et nous savons que leur passion et leur dévouement se reflètent dans le service de qualité que nous offrons à nos clients</p>
                                <a href="tel:+41223202222" className="btn btn-light px-5 rounded-pill shadow-sm">Contactez-nous</a>
                            </div>
                            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                                <img src="/images/home_images/qui_sommes_nous/equipe.PNG" alt="équipe" className="img-fluid mb-4 mb-lg-0 rounded-pill shadow" />
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>


            {/* Nos produits*/}
            <Container style={{marginBottom: "100px"}}>
                <Fade triggerOnce direction="up">
                    <h2 className="text-center" style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>Nos produits</h2>
                    <p className="text-center text-muted" style={{fontSize: '1.2rem', marginBottom: '2rem'}}>Explorez notre sélection haut de gamme de produits de coiffure professionnels, à portée de main en salon.</p>

                    <Row className="row-cols-1 row-cols-md-3 g-4">
                        {products.map((product, index) => (
                            <div className="col" key={index}>
                                <Card className="custom-card h-100" style={{ backgroundColor: product.backgroundColor, borderRadius: '15px' }}>
                                    <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                                        <Card.Title className="custom-card-title" style={{ color: product.textColor, fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                            {product.title}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Row>
                </Fade>
            </Container>


            {/*adresse - email - phone*/}
            <div className="bg-dark text-light py-3">
                <Container className="text-muted">
                    <br />
                    <Row>
                        <div className="col-md-6">
                            <Row>
                                <Col xs={4} md={2}><p><strong>ADRESSE</strong></p></Col>
                                <Col xs={1} md={1}><p>:</p></Col>
                                <Col xs={7} md={9}><a className={"text-muted text-decoration-none text-decoration-underline"} target="_blank" href="https://goo.gl/maps/jHu3JBzorevPJ9qf6">Bd Carl-Vogt 47, 1205 Genève</a></Col>
                            </Row>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                            <Row>
                                <Col xs={4} md={2}><p><strong>EMAIL</strong></p></Col>
                                <Col xs={1} md={1}><p>:</p></Col>
                                <Col xs={7} md={9}><a className={"text-muted text-decoration-none"} href="mailto:tina.coiffure@hotmail.com">tina.coiffure@hotmail.com</a></Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={2}><p><strong>PHONE</strong></p></Col>
                                <Col xs={1} md={1}><p>:</p></Col>
                                <Col xs={7} md={9}><a className={"text-muted text-decoration-none"} href="tel:+41223202222">+41 22 320 22 22</a></Col>
                            </Row>
                        </div>
                    </Row>
                    <hr className="featurette-divider" />
                </Container>
            </div>

            {/* Bouton retour en haut de page */}
            <a className={styles.returnToTop} onClick={scrollToTop} id="returnToTop">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                     className="bi bi-chevron-up" viewBox="0 0 16 16">
                    <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                </svg>
            </a>

            {/*Footer*/}
            <Footer />
        </>
    );
}
