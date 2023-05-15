import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Link from "next/link";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


export default function Header() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    last_name: "",
    first_name: "",
  });
  const [token, setToken] = useState(null);
  const router = useRouter();
  const cookies = parseCookies();

  useEffect(() => {
    const cookies = parseCookies();
    setToken(cookies.csrftoken);

    if (token) {
      setUser({
        email: cookies.email,
        username: cookies.username,
        last_name: cookies.last_name,
        first_name: cookies.first_name,
      });
    }
  }, [token]);

  const handleLogout = () => {
    Promise.all([
      destroyCookie(null, "id"),
      destroyCookie(null, "csrftoken"),
      destroyCookie(null, "email"),
      destroyCookie(null, "username"),
      destroyCookie(null, "last_name"),
      destroyCookie(null, "first_name"),
      destroyCookie(null, "role"),
    ]).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
      router.push("/");
    });
  };

  return (
    <>
      <style type="text/css">
        {`
            .navbar {
                background-color: #232627;
                color: #fff;
                min-height: 90px;
            }

            img {
                height: 20%;
            }
        `}
      </style>
      <header>
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Navbar.Brand href="/" style={{marginLeft: "2%"}}><h4>Tina Coiffure</h4></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" style={{marginRight: "2%"}}>
              <Nav.Link href="/components/prise_rendez_vous/serviceRDV">Prendre rendez-vous</Nav.Link>
              <Nav.Link href="/">Qui sommes nous ?</Nav.Link>
              <Nav.Link href="/">Produits</Nav.Link>
              {token ? (
                <NavDropdown title={user.username} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/components/CRUD_utilisateur/profil_utilisateur">Mon profil</NavDropdown.Item>
                  <NavDropdown.Item href="/components/CRUD_utilisateur/calendrier_utilisateur">Mes rendez-vous</NavDropdown.Item>
                  {token && cookies.role === "admin" && (
                    <NavDropdown.Item onClick={handleLogout}>Ajout de disponibilités</NavDropdown.Item>
                  )}
                  <NavDropdown.Item onClick={handleLogout}>Se déconnecter</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/components/identification/connexion">S'identifier</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
}