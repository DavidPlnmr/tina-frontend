import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';
import { parseCookies } from 'nookies';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.csrftoken;

    if (token) {
      fetch('http://127.0.0.1:8000/api/customers/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.username);
        });
    }
  }, []);

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
                  <Link href="/" class="nav-link">
                    Qui sommes nous ?
                  </Link>
                </li>
                <li class="nav-item">
                  <Link href="/" class="nav-link">
                    Produits
                  </Link>
                </li>
                {user ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {user}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Mon profil</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Mes rendez-vous</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Mes commandes</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <>
                    <li class="nav-item">
                      <Link href="/components/connexion" class="nav-link">
                        Connexion
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/components/inscription" class="nav-link">
                        Inscription
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
