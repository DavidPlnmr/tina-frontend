import Header from '../../header';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Head from "next/head";
import Image from "next/image";

/**
 * @namespace 'form_typesofservice.js'
 * @description page that allows the user to create a new type of service or to add a new service to an existing type of service
 * @returns {JSX.Element}
 */
export default function Formulaire_typesofservice() {

    // Constantes pour les URL de l'API
    /**
     * @memberof 'form_typesofservice.js'
     * @constant {String} urlTypesOfService URL of the API for the types of service
     * @constant {String} pathnameModal Pathname for the redirection of page after the creation of a new type of service
     * @constant {String} pathnameNewService Pathname for the redirection of page when the user wants to create a new service
     */
    const urlTypesOfService = 'http://localhost:8000/api/typesofservice/';
    // Pathname pour la redirection de page
    const pathnameModal = "./menu_services";
    const pathnameNewService = "/components/gestion_admin/gestion_services/form_services";

    /**
     * @memberof 'services.js'
     * @constant {Array} lstTypesOfService Array that contains all the types of service
     * @constant {Array} lstTOSNames Array that contains all the names of the types of service
     * @default {Array} lstTypesOfService []
     * @default {Array} lstTOSNames []
     * @see{@link 'services.js'.lstTypesOfService}
   */
    const [lstTOSNames, setLstTOSNames] = useState([]);
    const [lstTypesOfService, setLstTypesOfService] = useState([]);

    /**
     * @memberof 'form_typesofservice.js'
     * @constant {Object} typeOfService Object that contains the name of the type of service
     * @constant {String} typeOfService.name Name of the type of service
     * @default {String} typeOfService.name ""
     */
    const [typeOfService, setTypeOfService] = useState(
        {
            name: "",
        }
    );

    /**
     * @memberof 'form_typesofservice.js'
     * @function handleChangeType Function that allows the user to change the name of the type of service
     * @description takes the value of the input and changes the value of the name of the type of service
     * @param {object} evt - event
     */
    const handleChangeType = (evt) => {
        setTypeOfService({ ...typeOfService, [evt.target.dataset.id]: evt.target.value });
    };

    /**
   * @memberof 'form_typesofservice.js'
   * @function fetchTypeOfService Function that fetches the types of service from the database
   * @description fetches the types of service from the database and sets the list of types of service to the response of the request
   * @see {@link 'services.js'.fetchTypeOfService}
   */
    const fetchTypeOfService = () => {
        const cookies = parseCookies();
        axios.get(urlTypesOfService, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                setLstTypesOfService(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * @memberof 'form_typesofservice.js'
     * @function loadTOSNames
     * @description loads the names of the types of service in an array
     */
    const loadTOSNames = () => {
        let lstTOSNames = [];
        lstTypesOfService.map((tos) => {
            lstTOSNames.push(tos.name.toLowerCase());
        });
        setLstTOSNames(lstTOSNames);
    };

    /**
     * @memberof 'form_typesofservice.js'
     * @constant {String} isValid String that contains the class to apply to the input
     * @default {String} isValid ""
     * 
     */
    const [isValid, setIsValid] = useState("");


    /**
     * @memberof 'form_typesofservice.js'
     * @function handleSubmit Function that allows the user to create a new type of service
     * @description posts the new type of service in the database and shows a notification if the creation is successful or not
     * @see {@link 'form_typesofservice.js'.urlTypesOfService}
     * @see {@link 'form_typesofservice.js'.typeOfService}
     */
    const handleSubmit = () => {
        if (typeOfService.name != "" && !lstTOSNames.includes(typeOfService.name.toLowerCase())) {
            const cookies = parseCookies();

            axios.post(urlTypesOfService, typeOfService, {
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
        }
    };

    /**
     * @memberof 'form_typesofservice.js'
     * @function useEffect
     * @description calls the function fetchTypeOfService when the page is loaded
     * @return {void}
     */
    useEffect(() => {
        fetchTypeOfService();
        console.log(lstTypesOfService);
    }, []);


    /**
     * @memberof 'form_typesofservice.js'
     * @function loadTOSNames
     * @description loads the names of the types of service in an array, when lstTypesOfService is loaded
     */
    useEffect(() => {
        loadTOSNames();
    }, [lstTypesOfService]);

    /**
     * @memberof 'form_typesofservice.js'
     * @function useEffect
     * @description checks if the name of the type of service is valid or not
     */
    useEffect(() => {
        if (lstTOSNames.includes(typeOfService.name.toLowerCase())) {
            setIsValid("is-invalid");
        } else if (typeOfService.name != "") {
            setIsValid("is-valid");
        }else{
            setIsValid("");
        }
    }, [typeOfService.name]
    );

    return (
        <>
            <Head>
                <title>Tina - Création de type de service</title>
                <meta name="description" content="Page pour la création de type de service de l'application Tina" />
            </Head>
            <Header />
            <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
                <ul></ul>
                <div id="notification_success" className="alert alert-success" role="alert" hidden>
                    <h4 className="alert-heading">Création réussie</h4>
                    <p>Vous avez créé le type de service : {typeOfService.name} </p>
                    <hr></hr>
                    <p className="mb-0">Vous pouvez consulter tous les services en cliquant : <Link href={pathnameModal} className="alert-link">ICI</Link>
                    </p>
                </div>
                <div id="notification_error" className="alert alert-danger" role="alert" hidden>
                    <h4 className="alert-heading">Création Echouée</h4>
                    <p>Il y a un problème avec le service : <a id='service_error'> </a></p>
                </div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" style={{ backgroundColor: "#b8aaa0" }}>
                    <div className="container-fluid rounded" style={{ height: "8vh", width: "100vh", boxShadow: "0 2px 4px rgba(0,0,0,.2)", backgroundColor: "#FFFFFF" }}>
                        <a className="navbar-brand" href="#">Gestion des services</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            </ul>
                            <ul className="navbar-nav me-2 mb-2 mb-lg-0">
                            </ul>
                            <button type="button" className="btn btn-primary">
                                <Link href={pathnameNewService} className="nav-link">
                                    Nouveau service
                                </Link>
                            </button>

                        </div>
                    </div>
                </nav>

                <ul></ul>
                {/* Form TypeOfService */}

                <div
                    className="mb-3 d-flex flex-column"
                    id='form'
                    style={{
                        width: "100vh",
                        height: "auto",
                        borderRadius: "6px",
                        padding: "10px",
                        background: "whiteSmoke",
                        boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                    }}
                >
                    <form className="form-floating" >
                        <input type="text" className={"form-control "+ isValid} data-id="name" onChange={handleChangeType} id="type_of_service" />
                        <label for="type_of_service">Nom du type de service</label>
                        <div className="invalid-feedback">
                            Le type de service existe déjà !
                        </div>
                    </form >
                </div>

                <ul></ul>
                {/* Boutons de validation */}

                <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Créer</button>


            </div >
        </>
    );
}
