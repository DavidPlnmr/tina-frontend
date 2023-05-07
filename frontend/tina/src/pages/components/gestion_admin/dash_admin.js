import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../header';
import Link from 'next/link';


export default function Dash() {
  return (
    <>
        <Header/>

        <div class="container">
        <br></br>
        <h2>Dashboard administrateur :</h2>
            <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12">
                    <br></br>
                    <div class="card">
                        <div class="card-body justify-content-center">
                            <ul></ul>
                            <h5 class="card-title text-center font-weight-bold">Création d'un employé</h5>
                            <h5 class="card-title text-center font-weight-bold" style={{color: "green"}}>Employé</h5>
                            <br></br>
                            <div class="text-center">
                                <a href="./gestion_employee/employe">
                                <button 
                                    type="button" 
                                    class="btn btn-primary"
                                    href="./employe"
                                    style={{backgroundColor: "#232627", border: "none"}}>
                                        Choisir
                                </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <br></br>
                    <div class="card">
                        <div class="card-body justify-content-center">
                            <ul></ul>
                            <h5 class="card-title text-center font-weight-bold">Ajout des disponibilités</h5>
                            <h5 class="card-title text-center font-weight-bold" style={{color: "green"}}>Employé</h5>
                            <br></br>
                            <div class="text-center">
                                <a href="./gestion_employee/ajout_dispo">
                                <button 
                                    type="button" 
                                    class="btn btn-primary"
                                    href="./gestion_services/menu_services"
                                    style={{backgroundColor: "#232627", border: "none"}}>
                                        Choisir
                                </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <br></br>
                    <div class="card">
                        <div class="card-body justify-content-center">
                            <ul></ul>
                            <h5 class="card-title text-center font-weight-bold">Suppression d'un employé</h5>
                            <h5 class="card-title text-center font-weight-bold" style={{color: "green"}}>Employé</h5>
                            <br></br>
                            <div class="text-center">
                                <a href="./gestion_services/menu_services">
                                <button 
                                    type="button" 
                                    class="btn btn-primary"
                                    href="./gestion_services/menu_services"
                                    style={{backgroundColor: "#232627", border: "none"}}>
                                        Choisir
                                </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <br></br>
                    <div class="card">
                        <div class="card-body justify-content-center">
                            <ul></ul>
                            <h5 class="card-title text-center font-weight-bold">Gestion des services</h5>
                            <h5 class="card-title text-center font-weight-bold" style={{color: "blue"}}>Services</h5>
                            <br></br>
                            <div class="text-center">
                                <a href="./gestion_services/menu_services">
                                <button 
                                    type="button" 
                                    class="btn btn-primary"
                                    href="./gestion_services/menu_services"
                                    style={{backgroundColor: "#232627", border: "none"}}>
                                        Choisir
                                </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br>

        
    </>
  );
}