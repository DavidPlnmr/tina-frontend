import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';
import { parseCookies,destroyCookie } from 'nookies';

export default function Header() {
  const [user, setUser] = useState({email:"", username:"", last_name:"", first_name:""});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    setToken(cookies.csrftoken);

    if (token){
      setUser({email: cookies.email, username: cookies.username, last_name: cookies.last_name, first_name: cookies.first_name});
    }
  }, [token]);

  const handleLogout = () => {
    destroyCookie(null, 'csrftoken');
    destroyCookie(null, 'email');
    destroyCookie(null, 'username');
    destroyCookie(null, 'last_name');
    destroyCookie(null, 'first_name');
    setToken(null);
  };

  return (
    <>
      <style type="text/css">
        {`
            .navbar {
                background-color: #b8aaa0;
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
                  <h2 href="#" class="navbar-header">
                    Tina Coiffure
                  </h2>
                </li>
              </ul>
            </div>
            <div class="collapse navbar-collapse justify-content-end">
              <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item active">
                  <Link href="/" class="nav-link">
                    Nos sevices
                  </Link>
                </li>
                <li class="nav-item">
                  <Link href="/" class="nav-link">
                    Prendre rendez-vous
                  </Link>
                </li>
                <li class="nav-item">
                  <Link href="/components/gestion_admin/dash_admin" class="nav-link">
                    Admin
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
                  <Dropdown class="nav-link">
                    <Dropdown.Toggle as="span" variant="success" className="nav-link">
                      {user.username}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Mon profil</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Mes rendez-vous</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Mes commandes</Dropdown.Item>
                      <Dropdown.Item href="#/action-4" onClick={handleLogout}>Se déconnecter</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <>
                      <Link href="/components/identification/connexion" class="nav-link">
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
