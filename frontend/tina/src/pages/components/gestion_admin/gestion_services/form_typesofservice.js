import Header from '../../header';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

export default function Formulaire_typesofservice() {

    const [typeOfService, setTypeOfService] = useState(
        {
            name: "",
        }
    );
    const handleClick = () => {
        document.getElementById("form").removeAttribute("hidden");
    };

    const handleChangeType = (evt) => {
        setTypeOfService({ ...typeOfService, [evt.target.dataset.id]: evt.target.value });
        console.log(typeOfService);
    };
    const handleSubmit = (evt) => {
        const cookies = parseCookies();
        evt.preventDefault();

        axios.post('http://127.0.0.1:8000/api/typesofservice/', typeOfService, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                console.log(response.data);
                document.getElementById("notification_success").hidden = false;
            })
            .catch((error) => {
                console.log(error);
                document.getElementById("notification_error").hidden = false;
            });

    };

    return (
        <>
            <Header />
            <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
                <ul></ul>
                <div id="notification_success" class="alert alert-success" role="alert" hidden>
                    <h4 class="alert-heading">Création réussie</h4>
                    <p>Vous avez créé le type de service : {typeOfService.name} </p>
                    <hr></hr>
                    <p class="mb-0">Vous pouvez consulter tous les services en cliquant : <Link href="./menu_services" class="alert-link">ICI</Link>
                    </p>    
                </div>
                <div id="notification_error" class="alert alert-danger" role="alert" hidden>
                    <h4 class="alert-heading">Création Echouée</h4>
                    <p>Il y a un problème avec le service : <a id='service_error'> </a></p>
                </div>
                <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#b8aaa0" }}>
                    <div class="container-fluid" style={{ height: "8vh", width: "100vh", backgroundColor: "#FFFFFF" }}>
                        <a class="navbar-brand" href="#">Gestion des services</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            </ul>

                            <ul class="navbar-nav me-2 mb-2 mb-lg-0">
                            </ul>
                            <button type="button" class="btn btn-primary" onClick={handleClick}>
                                Nouveau Type de Service
                            </button>
                            <ul class="navbar-nav me-2 mb-2 mb-lg-0">
                            </ul>
                            <button type="button" class="btn btn-primary">
                                <Link href="/components/gestion_admin/gestion_services/form_services" class="nav-link">
                                    Nouveau service
                                </Link>
                            </button>

                        </div>
                    </div>
                </nav>

                <ul></ul>
                <form id='form' hidden>
                    <div class="row mb-3 d-flex align-items-center">
                        <label for="section_titre" class="col-sm-2 col-form-label">Type de service</label>
                        <div class="col-sm">
                            <input type="text" class="form-control" id="section_titre" data-id="name" placeholder="Nom du Type de service" onChange={handleChangeType}></input>
                        </div>

                        <div class="col-auto">
                            <button type="button" class="btn btn-primary" onClick={handleSubmit}>
                                Ajouter
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}