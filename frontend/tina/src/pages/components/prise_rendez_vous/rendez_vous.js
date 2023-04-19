import { useState } from 'react';
import Header from '../header';
import Link from 'next/link';


export default function RendezVous() {
  return (
    <>
      <Header/>
        <ul>
            <li>
                <Link href="/components/prise_rendez_vous/rdv_employee" class="nav-link">
                   rdv employee
                </Link>
            </li>
        </ul>
    </>
  );
}