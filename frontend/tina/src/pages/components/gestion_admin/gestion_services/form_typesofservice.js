import Header from '../../header';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

export default function Formulaire_typesofservice() {
    
    const [typeOfService, setTypeOfService] = useState([
        {
            name: "",
        }
    ]);
    
    const handleChangeType = (evt) => {
        setTypeOfService({ ...typeOfService, [evt.target.dataset.id]: evt.target.value });
        console.log(typeOfService);
    };
    const handleSubmit =  (evt) => {
        const cookies = parseCookies();
        evt.preventDefault();

        axios.post('http://127.0.0.1:8000/api/typesofservice/', typeOfService, {
            headers: {
                Authorization: 'Token '  + cookies.csrftoken,
            },
            })
            .then((response) => {
            console.log(response.data);
            })
            .catch((error) => {
            console.log(error);
            });

    };
    
  return (
    <>
        <Header/>
        <div className="d-flex flex-column justify-content-start align-items-center" style={{height:"100vh", backgroundColor: "#b8aaa0" }}>
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
                    <Link href="/components/gestion_admin/gestion_services/formulaire_services" class="nav-link">
                        Ajouter
                    </Link>
                    </button>
                    
                </div>
                </div>
            </nav>

            <ul></ul>
            <form>
                <div class="row mb-3">
                    <label for="section_titre" class="col-sm-2 col-form-label">Section titre</label>
                    <div class="col-auto">
                    <input type="text" class="form-control" id="section_titre" data-id="name" placeholder='Le titre de la catégorie' onChange={handleChangeType}></input>
                    </div>
                </div>
                {/* <div class="row mb-3">
                    <label for="section_description" class="col-sm-2 col-form-label">Section description</label>
                    <div class="col-auto">
                    <textarea class="form-control" id="section_description" data-id="section_description" rows="3" placeholder='La description de la section' onChange={handleChange}></textarea>
                    </div>
                </div> */}
                {/* <div class="row mb-3">
                    <label for="section_bas_de_page" class="col-sm-2 col-form-label">Section bas de page</label>
                    <div class="col-auto">
                    <textarea class="form-control" id="section_bas_de_page" data-id="section_bas_de_page" rows="3" placeholder='Le bas_de_page de la section' onChange={handleChange}></textarea>
                    </div>
                </div> */}
                
                {/* <label class="row mb-3">Service1</label> */}

                <div class="row mb-3">
                    <div class="col-auto">
                    <button type="button" class="btn btn-primary" onClick={handleSubmit}>
                        Ajouter un type de service
                    </button>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-auto">
                    <button type="button" class="btn btn-outline-secondary">
                        <Link href="/components/gestion_admin/gestion_services/form_services" class="nav-link">
                        Ajouter un service
                        </Link>
                    </button>
                    </div>
                </div>

            </form>    
        </div>
    </>
  );
}