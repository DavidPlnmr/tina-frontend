import { useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

/**
 * @namespace 'header.js'
 * @description This Header component is used to generate the application's navigation bar. 
 * It contains links for navigating through the application and functionality for user authentication.
 * @returns {JSX.Element} The Header component as a JSX element.
 */
function Header() {
  /**
   * @constant user
   * @memberof 'header.js'
   * @description State variable holding the currently logged-in user's information.
   * @default {{email: "", username: "", last_name: "", first_name: ""}}
   * @property {string} email - The authenticated user's email address.
   * @property {string} username - The authenticated user's username.
   * @property {string} last_name - The authenticated user's last name.
   * @property {string} first_name - The authenticated user's first name.
   */
  const [user, setUser] = useState({
    email: "",
    username: "",
    last_name: "",
    first_name: "",
  });

  /**
   * @constant token
   * @memberof 'header.js'
   * @description State variable holding the currently logged-in user's authentication token.
   * @default null
   */
  const [token, setToken] = useState(null);

  /**
   * @constant router
   * @memberof 'header.js'
   * @description Router object from Next.js' useRouter hook for programmatic navigation.
   */
  const router = useRouter();

   /**
   * @constant cookies
   * @memberof 'header.js'
   * @type {object}
   * @description An object containing all of the user's cookies.
   */
  const cookies = parseCookies();

   /**
   * @function useEffect
   * @memberof 'header.js'
   * @description This useEffect hook sets the token and user's information based on the cookies when the component mounts or updates.
   * @returns {void}
   */
  useEffect(() => {
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

  /**
   * @function handleLogout
   * @memberof 'header.js'
   * @description This function handles the user's logout process. It removes all user and session cookies and redirects to the home page.
   * @returns {void}
   */
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
      <header
        style={{ position: "fixed", width: "100%", top: "0", zIndex: "100" }}
      >
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Navbar.Brand href="/" style={{ marginLeft: "6%" }}>
            <h4>Tina Coiffure</h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" style={{ marginRight: "6%" }}>
            {token && cookies.role === "admin" && (
                    <Nav.Link href="/components/gestion_admin/dash_admin">
                      Administration
                    </Nav.Link>
                  )}
              <Nav.Link href="/components/prise_rendez_vous/service_rdv">
                Prendre rendez-vous
              </Nav.Link>
              <Nav.Link href="/">Qui sommes nous ?</Nav.Link>
              {token ? (
                <NavDropdown title={user.username} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/components/CRUD_utilisateur/profil_utilisateur">
                    Mon profil
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/components/CRUD_utilisateur/calendrier_utilisateur">
                    Mes rendez-vous
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Se déconnecter
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/components/identification/connexion">
                  S'identifier
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>{" "}
      <br />
      <br />
      <br />
    </>
  );
}

export default Header;
