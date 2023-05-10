import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Footer from "@/pages/components/footer";
import {Card, Container, Row} from "react-bootstrap";


export default function Accueil() {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img src="/images/carousel/carousel_1.jpg" className="d-block w-100 h-50" alt="..." />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/images/carousel/carousel_2.jpg" className="d-block w-100 " height={500} alt="..." />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/images/carousel/carousel_3.jpg" className="d-block w-100" height={500} alt="..." />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* 3 boxes our services */}
            <Container>
                {/*Nos services at the center*/}

                <Row>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://i.pinimg.com/736x/ae/67/7a/ae677a18891ad058e1526f2b087028b6.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Cheveux</h5>
                                <p>Coupe de cheveux</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://img.freepik.com/free-photo/handsome-man-cutting-beard-barber-shop-salon_1303-20931.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Barbe</h5>
                                <p>Coupe de cheuveux</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://media.istockphoto.com/id/1154666732/photo/hairdresser-bleaching-hair-of-a-young-adult-man.jpg?s=612x612&w=0&k=20&c=yzW29xOTz4yIZEQpCKtD6R9nrkh3macvs0FB_DkhzuQ=" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Coloration</h5>
                                <p>Coupe de cheuveux</p>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>

            <Footer />
        </>
    );
}