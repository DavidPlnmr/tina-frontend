import { useState } from 'react';
import Header from '../../header';
import Link from 'next/link';


export default function Services() {
  return (
    <>
      <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
        <ul></ul>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor:"#b8aaa0"}}>
          <div class="container-fluid" style={{ height: "8vh", width:"100vh", backgroundColor: "#FFFFFF" }}>
              <a class="navbar-brand" href="#">Gestion des services</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              <button type="button" class="btn btn-outline-dark">Options</button>
              <ul class="navbar-nav me-2 mb-2 mb-lg-0">
              </ul>
              <button type="button" class="btn btn-outline-dark">Modifier</button>
              <ul class="navbar-nav me-2 mb-2 mb-lg-0">
              </ul>
              <button type="button" class="btn btn-primary">
                <Link href="/components/gestion_admin/gestion_services/form_typesofservice" class="nav-link">
                  Ajouter
                </Link>
              </button>
                
            </div>
          </div>
        </nav>

        <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
          <div class="container text-center">
            <div class="row align-items-center">
              <div class="col">
                <div class="card" style={{width: "18rem"}}>
                  <img src="https://placehold.co/350x150" class="card-img-top" alt="placeholder"></img>
                  <div class="card-body">
                    <h5 class="card-title">Nom du service à chopper</h5>
                    <p class="card-text">Description du service</p>
                    <a href="#" class="btn btn-primary">Choisir</a>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card" style={{width: "18rem"}}>
                    <img src="https://placehold.co/350x150" class="card-img-top" alt="placeholder"></img>
                    <div class="card-body">
                      <h5 class="card-title">Nom du service à chopper</h5>
                      <p class="card-text">Description du service</p>
                      <a href="#" class="btn btn-primary">Choisir</a>
                    </div>
                </div>
              </div>
              <div class="col">
                <div class="card" style={{width: "18rem"}}>
                    <img src="https://placehold.co/350x150" class="card-img-top" alt="placeholder"></img>
                    <div class="card-body">
                      <h5 class="card-title">Nom du service à chopper</h5>
                      <p class="card-text">Description du service</p>
                      <a href="#" class="btn btn-primary">Choisir</a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>

      </div>
    </>
  );
}