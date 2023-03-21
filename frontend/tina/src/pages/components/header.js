import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link'


export default function Header() {
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
                <div class="collapse navbar-collapse " >
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li >
                                <h2 href="#" class="navbar-header">Tina Coiffure</h2>
                            </li>
                        </ul>
                    </div>
                    <div class="collapse navbar-collapse justify-content-end" >
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            <li class="nav-item active">
                                <Link href="/components/connexion" class="nav-link">Connexion</Link>
                            </li>
                            <li class="nav-item">
                                <Link href="/" class="nav-link">Nos services</Link>
                            </li>
                            <li class="nav-item">
                                <Link href="/" class="nav-link">Nos services</Link>
                            </li>
                            <li class="nav-item">
                            <Dropdown >
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:"#b8aaa0", border:0}}>
                                    Menu
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/connexion">Connexion</Dropdown.Item>
                                    <Dropdown.Item href="/inscription">Inscription</Dropdown.Item>
                                    <Dropdown.Item href="/something-else">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </header>
    </>
  );
}