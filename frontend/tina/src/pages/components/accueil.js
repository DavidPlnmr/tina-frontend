import React from 'react';
import styles from "@/styles/Accueil.module.css";
import Carousel from 'react-bootstrap/Carousel';
import Footer from "@/pages/components/footer";
import { Fade } from 'react-awesome-reveal';
import {Button, Card, Col, Container, Row} from "react-bootstrap";


const products = [
    { title: 'Shampoing', backgroundColor: '#292E3D', textColor: '#F6F8F7' },
    { title: 'Gels/Cires', backgroundColor: '#F6F8F7', textColor: '#292E3D' },
    { title: 'Laques', backgroundColor: '#292E3D', textColor: '#F6F8F7' },
    { title: 'Ciseaux', backgroundColor: '#F6F8F7', textColor: '#292E3D' },
    { title: 'Tondeuses', backgroundColor: '#292E3D', textColor: '#F6F8F7' },
    { title: 'Couleurs', backgroundColor: '#F6F8F7', textColor: '#292E3D' },
];

export default function Accueil() {
    return (
        <>
            {/* Carousel avec 3 images*/}
            <Carousel fade>
                <Carousel.Item>
                    <img src="/images/carousel/carousel_1.jpg" className="d-flex w-100" alt="..." />
                    <Carousel.Caption className={styles.carouselCaption}>                        <h3 className={styles.carouselTitle}>Un style unique</h3>
                        <p className={styles.carouselText}>Des coiffures sur mesure pour refléter votre personnalité</p>
                        <Button variant="outline-light" className={styles.carouselButton}>Prendre rendez-vous</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/images/carousel/carousel_2.jpg" className="d-block w-100" alt="..." />
                    <Carousel.Caption className={styles.carouselCaption}>
                        <h3 className={styles.carouselTitle}>Le confort avant tout</h3>
                        <p className={styles.carouselText}>Un espace détente pour une expérience agréable</p>
                        <Button variant="outline-light" className={styles.carouselButton}>Prendre rendez-vous</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/images/carousel/carousel_3.jpg" className="d-block w-100" alt="..." />
                    <Carousel.Caption className={styles.carouselCaption}>
                        <h3 className={styles.carouselTitle}>Des professionnels à votre écoute</h3>
                        <p className={styles.carouselText}>Une équipe dédiée à vos besoins en coiffure</p>
                        <Button variant="outline-light" className={styles.carouselButton}>Prendre rendez-vous</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


            {/* Nos services */}
            <br/><br/>

            <div className={styles.secondBackgroundColor}>
                <Container>
                    <Fade triggerOnce direction="up">
                        <h2 className={"text-center"}>Nos services</h2>
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
            </div>



            {/* Qui sommes-nous ?*/}
            <div class="bg-white py-5">
                <Fade triggerOnce direction="up">
                    <div class="container py-5">
                        <div class="row align-items-center mb-5">
                            <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                                <h2 class="font-weight-light">Notre philosophie</h2>
                                <p class="font-italic text-muted mb-4">Chez Tina Coiffure, nous croyons que chaque coupe de cheveux est une forme d'expression. Notre mission est d'aider chaque client à trouver son style unique, à travers des services personnalisés et une attention particulière aux détails. Nous sommes passionnés par notre métier et nous nous efforçons de créer une expérience agréable et mémorable à chaque visite.</p>
                                <a href="https://goo.gl/maps/jHu3JBzorevPJ9qf6" target="_blank" className="btn btn-light px-5 rounded-pill shadow-sm">Où nous trouver ?</a>
                            </div>
                            <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                                <img
                                src="https://i.pinimg.com/736x/ae/67/7a/ae677a18891ad058e1526f2b087028b6.jpg" alt=""
                                className="img-fluid mb-4 mb-lg-0 rounded-pill"></img>
                            </div>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-lg-5 px-5 mx-auto">
                                <img
                                src="https://img.freepik.com/free-photo/handsome-man-cutting-beard-barber-shop-salon_1303-20931.jpg" alt=""
                                className="img-fluid mb-4 mb-lg-0 rounded-pill"></img>
                            </div>
                            <div class="col-lg-6"><i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
                                <h2 class="font-weight-light">Une tradition revisitée</h2>
                                <p class="font-italic text-muted mb-4">Chez Tina Coiffure, nous honorons la tradition du barber shop tout en l'adaptant aux exigences modernes. Nous combinons l'artisanat classique de la coiffure masculine avec les dernières tendances et techniques. Que vous recherchiez une coupe de cheveux classique, une taille de barbe précise ou un style plus audacieux, nous avons les compétences et l'expérience nécessaires pour répondre à vos besoins.</p>
                                <a href="https://goo.gl/maps/jHu3JBzorevPJ9qf6" target="_blank" className="btn btn-light px-5 rounded-pill shadow-sm">Prendre rendez-vous</a>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>


            {/* Nos produits*/}
            <div className={styles.fourthBackgroundColorGradient}>
                <br/>
                <Container>
                    <Fade triggerOnce direction="up">
                        <h2 className="text-center">Nos produits</h2>
                        <hr className="featurette-divider" />
                        <br />

                        <Row className="row-cols-1 row-cols-md-3 g-4">
                            {products.map((product, index) => (
                                <div className="col" key={index}>
                                    <div className="card-container">
                                        <Card className="custom-card h-100" style={{ backgroundColor: product.backgroundColor }}>
                                            <Card.Body className="d-flex align-items-center justify-content-center">
                                                <Card.Title className="custom-card-title" style={{ color: product.textColor }}>
                                                    {product.title}
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </Row>
                    </Fade>
                </Container>
                <br/>
            </div>

            {/*adresse - email - phone*/}
            <div className="bg-dark text-light py-3">
                <br/>
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
            {/*Footer*/}
            <Footer />
        </>
    );
}