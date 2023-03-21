import { useState } from 'react';
import Header from './header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function Connexion() {
  return (
    <>
        <style type="text/css">
            {`
            body {
                overflow: hidden;
            }
            `}
        </style>
            <Header/>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0"}}>
                <Card className="col-6 border-0" style={{ backgroundColor: "#b8aaa0", marginTop: "-150px" }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Tina Coiffure</h2>
                        <Card.Title className="text-center mb-4">Connexion</Card.Title>
                        <Form className="col-6 mx-auto">
                            <Form.Group className="mb-3" controlId="formBasicEmail" >
                                <Form.Control type="email" placeholder="Num. téléphone, nom d'utilisateur ou e-mail"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Mot de passe"/>
                                <Form.Text className="text-muted">
                                    <Link href="/">Mot de passe oublié ?</Link>
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" className='w-100 border-0"' style={{ backgroundColor: "black", border: 0 }}>
                                Se connecter
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
    </>
  );
}