import { useState } from "react";
import Header from "../header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

export default function Connexion() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

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
      router.push("/");
    } else {
      alert("Identifiants incorrects");
    }
  };

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.dataset.id]: evt.target.value });
  };

  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#b8aaa0" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
              <Card
                className="border-0"
                style={{ backgroundColor: "#b8aaa0", marginTop: "-150px" }}
              >
                <Card.Body>
                  <h2 className="text-center mb-4">Tina Coiffure</h2>
                  <Card.Title className="text-center mb-4">
                    Connexion
                  </Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        data-id="username"
                        value={user.username}
                        type="text"
                        placeholder="Nom d'utilisateur"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        data-id="password"
                        value={user.password}
                        type="password"
                        placeholder="Mot de passe"
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        <Link class="nav-link" href="/">
                          Problème de connexion ?
                        </Link>
                      </Form.Text>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className='w-100 border-0"'
                      style={{ backgroundColor: "#232627", border: 0 }}
                    >
                      Se connecter
                    </Button>
                    <Form.Text className="text-muted">
                      <Link
                        class="nav-link"
                        href="/components/identification/inscription"
                      >
                        Vous n'avez pas de compte ?
                      </Link>
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
