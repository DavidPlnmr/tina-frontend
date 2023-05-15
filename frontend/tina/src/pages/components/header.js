import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Link from "next/link";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";

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
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-fluid">
            <div class="collapse navbar-collapse ">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                  <h2 class="navbar-header">
                    <Link href="/" class="nav-link">Tina Coiffure</Link>
                  </h2>
                </li>
              </ul>
            </div>
            <div class="collapse navbar-collapse justify-content-end">
              <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link
                    href="/components/prise_rendez_vous/serviceRDV"
                    class="nav-link"
                  >
                    Prendre rendez-vous
                  </Link>
                </li>
                <li class="nav-item">
                  <Link href="/" class="nav-link">
                    Qui sommes nous ?
                  </Link>
                </li>
                <li class="nav-item">
                  <Link href="/" class="nav-link">
                    Produits
                  </Link>
                </li>
                <li class="nav-item">
                  {token ? (
                    <Dropdown class="nav-link" style={{ cursor: "pointer" }}>
                      <Dropdown.Toggle
                        as="span"
                        variant="success"
                        className="nav-link"
                      >
                        {user.username}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                        <Link href="/components/CRUD_utilisateur/profil_utilisateur" style={{textDecoration: "none", color:"black"}}>Mon profil</Link>
                        </Dropdown.Item>
                        <Dropdown.Item >
                        <Link href="/components/CRUD_utilisateur/calendrier_utilisateur" style={{textDecoration: "none", color:"black"}}>Mes rendez-vous</Link>
                        </Dropdown.Item>
                        {token && cookies.role === "admin" && (
                          <Dropdown.Item>
                          <Link href="/" onClick={handleLogout} style={{textDecoration: "none", color:"black"}}>Ajout de disponibilités</Link>
                          </Dropdown.Item>
                          )}
                        <Dropdown.Item>
                        <Link href="/" onClick={handleLogout} style={{textDecoration: "none", color:"black"}}>Se déconnecter</Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <>
                      <Link
                        href="/components/identification/connexion"
                        class="nav-link"
                      >
                        S'identifier
                      </Link>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
