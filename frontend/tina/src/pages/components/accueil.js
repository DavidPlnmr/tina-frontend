import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Footer from "@/pages/components/footer";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import styles from '@/styles/Accueil.module.css'


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
            <Carousel>
                <Carousel.Item>
                    <img src="/images/carousel/carousel_1.jpg" className="d-block w-100 h-50" alt="..." />
                    <Carousel.Caption>
                        <h3>Salon de coiffure et barbier</h3>
                        <p>Profitez d'une expérience exceptionnelle dans notre salon de coiffure et barbier.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/images/carousel/carousel_2.jpg" className="d-block w-100 " height={500} alt="..." />
                    <Carousel.Caption>
                        <h3>Des professionnels à votre service</h3>
                        <p>Découvrez nos services de coiffure et de barbier pour hommes.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/images/carousel/carousel_3.jpg" className="d-block w-100" height={500} alt="..." />
                    <Carousel.Caption>
                        <h3>Des produits de qualité</h3>
                        <p>Utilisation de produits de qualité pour des résultats durables et éclatants.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Nos services */}
                <br/>
            <Container>
                <h2 className={"text-center text-primary"}>Nos services</h2>
                <hr className="featurette-divider" />
                <Row>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://i.pinimg.com/736x/ae/67/7a/ae677a18891ad058e1526f2b087028b6.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Coupe de cheveux personnalisée</h5>
                                <p>Notre équipe de coiffeurs professionnels est spécialisée dans les coupes de cheveux pour hommes. Que vous souhaitiez un look classique ou un style plus moderne, nous sommes là pour vous aider à trouver la coupe parfaite qui reflète votre personnalité et votre style.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://img.freepik.com/free-photo/handsome-man-cutting-beard-barber-shop-salon_1303-20931.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Taille de la barbe et rasage</h5>
                                <p>Offrez-vous une expérience de rasage et de taille de la barbe de qualité supérieure. Nos barbiers experts sont formés pour sculpter et entretenir votre barbe avec précision, en utilisant des outils et des techniques traditionnelles pour un résultat impeccable.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://img.freepik.com/free-photo/crop-hairdresser-washing-hair-client_23-2147778780.jpg?w=1060&t=st=1683727994~exp=1683728594~hmac=3374aec0a5e05c5d2ecdc7fe13a9f1f3a1460f58533de981c23e6ad5442d5e56" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Coloration</h5>
                                <p>Notre barber shop propose des services de coloration personnalisés pour les hommes, allant de la couverture des cheveux gris à des transformations audacieuses. Nous utilisons des produits de haute qualité et respectueux du cuir chevelu pour garantir des résultats durables et éclatants.</p>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
            <br/><br/>

            {/* Qui sommes-nous ?*/}
            <Container>
                <br/>
                <Row>
                    <div className="col-md-6">
                        <img className="img-fluid" src="/images/carousel/carousel_1.jpg" alt="..." />
                        {/*button on image*/}
                        <div className="centered">
                            <Button variant="outline-light">Qui sommes-nous ?</Button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2>Qui sommes-nous ?</h2>
                        <p>Nous sommes une équipe de barbiers et de coiffeurs passionnés, engagés à offrir les meilleurs services pour les hommes dans une atmosphère détendue et accueillante. Nous comprenons l'importance d'une apparence soignée et d'un style qui reflète la personnalité de chacun. C'est pourquoi nous mettons tout en œuvre pour comprendre les besoins de nos clients et leur offrir des résultats impeccables.</p>

                        <p>Notre gamme de services inclut des coupes de cheveux sur mesure, la taille et le rasage de la barbe, la coloration, les soins du visage pour hommes et bien d'autres prestations, conçues spécifiquement pour répondre aux besoins de notre clientèle masculine. Nous utilisons des produits de qualité supérieure et des techniques à la pointe de la mode pour garantir que vous repartiez de notre salon avec un look qui vous met en valeur et vous donne confiance en vous.</p>

                        <p>Chez Tina Coiffure, nous croyons que chaque homme mérite une expérience de salon digne de ce nom. Venez nous rendre visite et découvrez pourquoi notre réputation d'excellence et de service client irréprochable fait de nous le barber shop de choix pour les hommes soucieux de leur apparence et de leur bien-être. Nous vous attendons avec impatience pour vous offrir l'expérience ultime en matière de coiffure et de soins pour hommes.</p>
                    </div>
                </Row>
            </Container>

            {/* Nos produits*/}
            <br/><br/>
            <Container>
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
            </Container>

            {/*adresse - email - phone*/}
            <br/><br/>
            <Container>
                <br />
                <Row>
                    <div className="col-md-6">
                        <Row>
                            <Col xs={4} md={2}><p><strong>ADRESSE</strong></p></Col>
                            <Col xs={1} md={1}><p>:</p></Col>
                            <Col xs={7} md={9}><a className={"text-dark text-decoration-none text-decoration-underline"} target="_blank" href="https://goo.gl/maps/jHu3JBzorevPJ9qf6">Bd Carl-Vogt 47, 1205 Genève</a></Col>
                        </Row>
                    </div>
                </Row>
                <Row>
                    <div className="col-md-6">
                        <Row>
                            <Col xs={4} md={2}><p><strong>EMAIL</strong></p></Col>
                            <Col xs={1} md={1}><p>:</p></Col>
                            <Col xs={7} md={9}><a className={"text-dark text-decoration-none"} href="mailto:tina.coiffure@hotmail.com">tina.coiffure@hotmail.com</a></Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={2}><p><strong>PHONE</strong></p></Col>
                            <Col xs={1} md={1}><p>:</p></Col>
                            <Col xs={7} md={9}><a className={"text-dark text-decoration-none"} href="tel:+41223202222">+41 22 320 22 22</a></Col>
                        </Row>
                    </div>
                </Row>
                <br/><br/>
            </Container>
            {/*Footer*/}
            <Footer />
        </>
    );
}