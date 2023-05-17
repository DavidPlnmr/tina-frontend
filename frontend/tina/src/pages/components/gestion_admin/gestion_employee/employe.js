import { useState } from 'react';
import Header from '../../header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { parseCookies } from 'nookies';

export default function Employe() {

  const [employe, setEmploye] = useState([
    {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: ""
    }
  ]);

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit =  (evt) => {
    const cookies = parseCookies();

    evt.preventDefault();

    if (employe.password !== confirmPassword) {
      alert("Les deux mots de passe ne sont pas identiques !");
      return;
    }

    axios.post('http://127.0.0.1:8000/api/employees/', employe, {
      headers: {
        Authorization: `Token ` + cookies.csrftoken,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  const handleConfirmPassword = (evt) => {
    setConfirmPassword(evt.target.value);
  };

  const handleChange = (evt) => {
    setEmploye({ ...employe, [evt.target.dataset.id]: evt.target.value });
  };

  return (
    <>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
              <Card className="border-0" style={{ backgroundColor: "#b8aaa0", marginTop: "-150px" }}>
                <Card.Body>
                  <h2 className="text-center mb-4">Tina Coiffure</h2>
                  <Card.Title className="text-center mb-4">Ajout d'un employé</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control data-id="first_name" type="text" placeholder="Nom" value={employe.firstName} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control data-id="last_name" type="text" placeholder="Prénom" value={employe.lastName} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control data-id="username" type="text" placeholder="Pseudo" value={employe.username} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control data-id="email" type="email" placeholder="Email" value={employe.email} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control data-id="password" type="password" placeholder="Mot de passe (8 caractères minimum)" value={employe.password} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control data-id="confirmPassword" type="password" placeholder="Confirmer mot de passe" onChange={handleConfirmPassword}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='w-100 border-0"' style={{ backgroundColor: "black", border: 0 }}>
                      Ajouter un employé
                    </Button>
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