import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../header';
import Link from 'next/link';


export default function Dash() {
  return (
    <>
        <Header/>
        <ul>
            <li>
                <Link href="./employe" class="nav-link">
                   Gestion des Employés
                </Link>
            </li>
            <li>
                <Link href="./gestion_services/menu_services" class="nav-link">
                    Gestion des Services
                </Link>
            </li>
        </ul>
    </>
  );
}