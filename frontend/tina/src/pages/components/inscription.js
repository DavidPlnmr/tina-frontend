import { useState } from 'react';
import Header from './header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function Inscription() {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
              <Card className="border-0" style={{ backgroundColor: "#b8aaa0", marginTop: "-150px" }}>
                <Card.Body>
                  <h2 className="text-center mb-4">Tina Coiffure</h2>
                  <Card.Title className="text-center mb-4">Inscription</Card.Title>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Nom" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="text" placeholder="Prénom" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Pseudo" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Num. téléphone, nom d'utilisateur ou e-mail" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Mot de passe (8 caractères minimum)" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Confirmer mot de passe" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='w-100 border-0"' style={{ backgroundColor: "black", border: 0 }}>
                      S'inscrire
                    </Button>
                    <Form.Text className="text-muted">
                        <Link class="nav-link" href="/components/connexion">Vous avez déjà un compte ?</Link>
                    </Form.Text>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
