import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import Head from "next/head";

/**
 * @namespace 'connexion.js'
 * @description This component provides the functionality to log in to the application.
 * @returns {JSX.Element} A React functional component rendering the login interface.
 */
export default function Connexion() {

  /**
   * @constant router
   * @memberof 'connexion.js'
   * @see {@link 'header.js'.router}
   */
  const router = useRouter();

  /**
   * @constant showPassword
   * @memberof 'connexion.js'
   * @description This state variable stores the password visibility.
   * @default {showPassword: false}
   * @see {@link 'inscription.js'.showPassword}
   * @returns {boolean} The password visibility.
   */
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  /**
   * @constant user
   * @memberof 'connexion.js'
   * @description This state variable stores the user's data.
   * @property {string} username The user's username.
   * @property {string} password The user's password.
   * @default {username: "", password: ""}
   */
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  /**
   * @function handleSubmit
   * @memberof 'connexion.js'
   * @description This function handles the login form submission.
   * @param {object} evt The event object.
   */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      setCookie(null, "id", data.id, { maxAge: 86400, path: "/" });
      setCookie(null, "csrftoken", data.token, { maxAge: 86400, path: "/" });
      setCookie(null, "email", data.email, { maxAge: 86400, path: "/" });
      setCookie(null, "username", data.username, { maxAge: 86400, path: "/" });
      setCookie(null, "last_name", data.last_name, {
        maxAge: 86400,
        path: "/",
      });
      setCookie(null, "first_name", data.first_name, {
        maxAge: 86400,
        path: "/",
      });
      setCookie(null, 'role', data.role, { maxAge: 86400, path: '/' });
      await router.push("/");
    } else {
      alert("Identifiants incorrects");
    }
  };

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.dataset.id]: evt.target.value });
  };

  return (
      <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Tina Coiffure | Connexion</title>
        </Head>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                <Card className="border-0 shadow-lg">
                  <Card.Body className="p-4">
                    <Card.Title className="text-center mb-4">
                      <div className="d-flex justify-content-center align-items-center gap-3">
                        <img src="/images/tina_logo.png" alt="logo" className="img-fluid" width="60" />
                        <h2 className="font-weight-bold" style={{ fontFamily: "Abhaya Libre", fontSize: "38px" }}>Tina Coiffure</h2>
                      </div>
                    </Card.Title>

                    <Card.Subtitle className="mb-4">
                      <h4 className="text-center font-weight-bold">Connexion</h4>
                    </Card.Subtitle>

                    <Form onSubmit={handleSubmit} className="pt-3">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            className="shadow-sm"
                            data-id="username"
                            value={user.username}
                            type="text"
                            placeholder="Nom d'utilisateur ou adresse e-mail"

                            onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control
                            className="shadow-sm"
                            data-id="password"
                            value={user.password}
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            onChange={handleChange}
                        />
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <Form.Check
                              type="checkbox"
                              label="Afficher le mot de passe"
                              onClick={toggleShowPassword}
                          />
                          <Form.Text className="text-muted">
                            <Link className="nav-link p-0" href="#">Mot de passe oublié ?</Link>
                          </Form.Text>
                        </div>
                      </Form.Group>

                      <Button
                          variant="primary"
                          type="submit"
                          className='w-100 border-0 shadow-sm'
                          style={{ backgroundColor: "#232627", marginBottom: "10px" }}
                      >
                        Se connecter
                      </Button>
                      {/* Margin top */}
                      <Form.Text className="text-muted text-center mt-3">
                        <Link className="nav-link p-0" href="/components/identification/inscription">Vous n'avez pas de compte ?</Link>

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
