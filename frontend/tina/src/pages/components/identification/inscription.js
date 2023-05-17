import { useState, useEffect } from 'react';
//import { Header } from '../header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import axios from 'axios';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';

/**
 * @namespace 'inscription.js'
 * @description This component provides the functionality to create and manage the registration form.
 * @returns {JSX.Element} A React functional component rendering the registration form.
 */
export default function Inscription() {

  /**
   * @constant router
   * @memberof 'inscription.js'
   * @see {@link 'header.js'.router}
   */
  const router = useRouter();

  /**
   * @constant customers
   * @memberof 'inscription.js'
   * @description This state variable stores the customer's data.
   * @property {string} first_name The customer's first name.
   * @property {string} last_name The customer's last name.
   * @property {string} username The customer's username.
   * @property {string} email The customer's email address.
   * @property {string} tel_number The customer's phone number.
   * @property {string} password The customer's password.
   * @default {first_name: "", last_name: "", username: "", email: "", tel_number: "", password: ""}
   */
  const [customers, setCustomers] = useState([
    {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      tel_number: "",
      password: ""
    }
  ]);

  /**
   * @constant confirmPassword
   * @memberof 'inscription.js'
   * @description This state variable stores the customer's password confirmation.
   * @property {string} confirmPassword The customer's password confirmation.
   * @default {confirmPassword: ""}
   */
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * @function handleChange
   * @memberof 'inscription.js'
   * @description This function handles the registration form submission.
   * @param {object} evt The event object.
   * @returns {void}
   */
  const handleChange = (evt) => {
    setCustomers({ ...customers, [evt.target.dataset.id]: evt.target.value });
  };

  /**
   * @function handleConfirmPasswordChange
   * @memberof 'inscription.js'
   * @description This function handles the password confirmation.
   * @param {object} evt The event object.
   * @returns {void}
   */
  const handleConfirmPasswordChange = (evt) => {
    setConfirmPassword(evt.target.value);
  };

  /**
   * @function handleSubmit
   * @memberof 'inscription.js'
   * @description This function handles the registration form submission.
   * @param {object} evt The event object.
   * @returns {void}
   * @async
   */
   const handleSubmit =  (evt) => {
    evt.preventDefault();

    if (customers.password !== confirmPassword) {
      alert("Les deux mots de passe ne sont pas identiques !");
      return;
    }

    axios.post('http://127.0.0.1:8000/api/customers/create', customers)
      .then((response) => {
        console.log(response.data);
        setCookie(null, "id", response.data.id, { maxAge: 86400, path: "/" });
        setCookie(null, 'csrftoken', response.data.token, { maxAge: 86400, path: '/' });
        setCookie(null, 'email', response.data.email, { maxAge: 86400, path: '/' });
        setCookie(null, 'username', response.data.username, { maxAge: 86400, path: '/' });
        setCookie(null, 'last_name', response.data.last_name, { maxAge: 86400, path: '/' });
        setCookie(null, 'first_name', response.data.first_name, { maxAge: 86400, path: '/' });
        setCookie(null, 'role', response.data.role, { maxAge: 86400, path: '/' });
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
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
                  <Card.Title className="text-center mb-4">Inscription</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control data-id="first_name" type="text" placeholder="Nom" value={customers.firstName} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control data-id="last_name" type="text" placeholder="Prénom" value={customers.lastName} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control data-id="username" type="text" placeholder="Pseudo" value={customers.username} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control data-id="email" type="email" placeholder="Email" value={customers.email} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control data-id="tel_number" type="text" placeholder="+ 41 076 000 00 00" value={customers.phone} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control data-id="password" type="password" placeholder="Mot de passe (8 caractères minimum)" value={customers.password} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control data-id="confirmPassword" type="password" placeholder="Confirmer mot de passe" onChange={handleConfirmPasswordChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='w-100 border-0"' style={{ backgroundColor: "black", border: 0 }}>
                      S'inscrire
                    </Button>
                    <Form.Text className="text-muted">
                        <Link class="nav-link" href="/components/identification/connexion">Vous avez déjà un compte ?</Link>
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
