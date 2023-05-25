import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Header from '../../header';
import { useRouter } from 'next/router';
import Head from "next/head";

/**
 * @namespace 'form_services_modify.js'
 * @description page to modify a service through a form
 * @returns {JSX.Element}
 */
export default function Formulaire_services_modify() {

    // Constantes pour les URL de l'API
    /**
     * @constant {String} urlServices url of the API for the services
     * @constant {String}urlTypesOfService url of the API for the types of service
     * @constant {String}pathnameModal pathname to redirect to the services page
     * @constant {String}router router to get the query
     * @constant {String}values values of the query
     * @memberof 'form_services_modify.js'
     */
    const urlServices = 'http://localhost:8000/api/services/';
    const urlTypesOfService = 'http://localhost:8000/api/typesofservice/';

    //Partie pour la redirection de page
    const pathnameModal = "./menu_services";

    //Partie pour le formulaire de modification des services
    const router = useRouter();
    const values = router.query;


    /**
    * @memberof 'form_services_modify.js'
    * @constant {Array} lstServices Array that contains all the services
    * @constant {Array} lstNameServices Array that contains all the names of the services
    * @default {Array} lstNameServices []
    * @default {Array} lstServices []
    * @see {@link 'services.js'.lstServices}
    * @see {@link 'form_services.js'.lstNameServices}
    */
    const [lstNameServices, setLstNameServices] = useState([]);
    const [lstServices, setLstServices] = useState([]);

    /**
     * @memberof 'form_services_modify.js'
     * @param {String} urlServices the url to fetch the services from the API
     * @function fetchServices Function to fetch the services from the API
     * @see {@link 'header.js'.cookies}
     * @see {@link 'gestion_encaissement.js'.fetchServices}
   */
    const fetchServices = () => {
        const cookies = parseCookies();
        axios.get(urlServices, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                setLstServices(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * @memberof 'form_services_modify.js'
     * @constant {String}listTypeOfService list of the types of service
     * @default []
     */
    const [listTypeOfService, setListTypeOfService] = useState([]);


    /**
     * @memberof 'form_services_modify.js'
     * @constant {String}typeOfServiceRouter type of service to modify
     * @default {}
     */
    const [typeOfServiceRouter, setTypeOfServiceRouter] = useState({});

    /**
     * @memberof 'form_services_modify.js'
     * @constant {String}serviceRouter service to modify
     * @default {}
     */
    const [serviceRouter, setServiceRouter] = useState({});


    /**
     * @memberof 'form_services_modify.js'
     * @constant {String}service service to modify
     * @description the service is the serviceRouter with the new values
     * @default {}
     */
    const [service, setService] = useState({
        id: serviceRouter.id,
        name: serviceRouter.name,
        price: serviceRouter.price,
        price_student: serviceRouter.price_student,
        duration: serviceRouter.duration,
        type_of_service: typeOfServiceRouter.id,
    });


    /**
     * @memberof 'form_services_modify.js'
     * @function handleChange change the value of the service
     * @description the service is the serviceRouter with the new values, the duration is formatted
     * @see {@link 'form_services_modify.js'.formatTime}
     * @param {object} evt event 
     */
    const handleChange = (evt) => {
        let val = evt.target.value;
        if (evt.target.dataset.id == 'duration') {
            val = formatTime(val);
        }
        setService({ ...service, [evt.target.dataset.id]: val });
    };

    /**
     * @memberof 'form_services_modify.js'
     * @function handleSelect change the value of the service
     * @param {object} evt event 
     */
    const handleSelect = (evt) => {
        setService({ ...service, [evt.target.dataset.id]: evt.target.value });
    };

    //Formattage des minutes pour le submit
    /**
     * @memberof 'form_services_modify.js'
     * @function formatTime format the time
     * @param {Integer} minutes minutes to format
     * @returns {String} the time formatted
     */
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }


    /**
     * @memberof 'form_services_modify.js'
     * @function selectServiceDuration select the duration of the service
     * @description the duration is formatted and set in the select
     * @param {String} t time to format
     */
    const selectServiceDuration = (t) => {
        let durationToSelect = '';
        const [hours, minutes, seconds] = t.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + seconds / 60;

        durationToSelect = totalMinutes.toString();

        document.getElementById("service_temps").value = durationToSelect;
    }

    /**
     * @memberof 'form_services_modify.js'
     * @function handleSubmit
     * @description go through the array of services and call the postService function for each service if the fields are not empty and if the type of service is selected. then if there is no error, call the successMessage function
     * @see {@link 'form_services_modify.js'.putService}
     */
    const handleSubmit = () => {

        const s = service;
        let statusOK = true;

        // if (s.type_of_service === 0) {
        //     document.getElementById('select_type_of_service').setAttribute('class', 'form-control is-invalid');
        //     statusOK = false;
        // } else {
        //     document.getElementById('select_type_of_service').setAttribute('class', 'form-control is-valid')
        // };
       
        if (s.name.toLowerCase() == serviceRouter.name.toLowerCase()) {
            document.getElementById('service_titre').setAttribute('class', 'form-control is-valid');
        }
        else if (lstNameServices.includes(s.name.toLowerCase())) {
            document.getElementById('service_titre').setAttribute('class', 'form-control is-invalid');
            document.getElementById('service_titre_error').innerHTML = "Ce nom de service existe déjà";
            statusOK = false;
        }
        else if (s.name == "") {
            document.getElementById('service_titre').setAttribute('class', 'form-control is-invalid');
            document.getElementById('service_titre_error').innerHTML = 'Le titre ne peut pas être vide.';
            statusOK = false;
        }

        document.getElementById('service_prix').setAttribute('class', 'form-control is-valid');
        document.getElementById('service_studentprice').setAttribute('class', 'form-control is-valid');
        document.getElementById('service_temps').setAttribute('class', 'form-control is-valid');
        if (statusOK) {
            putService(s);
        }
    };

    /** 
     * @memberof 'form_services_modify.js'
     * @function successMessage
     * @description the function to show the success message then hide it after 5 seconds and refresh the page
     * @see {@link 'encaissement.js'.successMessage}
    */

    const successMessage = () => {
        document.getElementById("notification_success").removeAttribute("hidden");
        //après 3 secondes, on cache la notification
        setTimeout(function () {
            if (document.getElementById("notification_success") != null) {
                document.getElementById("notification_success").setAttribute("hidden", "hidden");
            }
        }, 10000);
    };


    /**
     * @memberof 'form_services_modify.js'
     * @param {String} newName name of the service having an error
     * @function errorMessage display the error message
     * @description the error message is displayed, the attribute hidden is removed
     * 
     */
    const errorMessage = (newName) => {
        document.getElementById("notification_success").removeAttribute("hidden");
        const serviceError = document.getElementById("service_error");
        serviceError.textContent = newName;

    };


    /**
     * 
     * @param {object} s service to modify
     * @memberof 'form_services_modify.js'
     * @function putService modify the service
     * @description the service is modified, the success message is displayed or the error message is displayed
     * @see {@link 'form_services_modify.js'.successMessage}
     * @see {@link 'form_services_modify.js'.errorMessage}
     * @see {@link 'form_services_modify.js'.service}
     */
    const putService = (s) => {
        const cookies = parseCookies();

        axios.put(urlServices + s.id + '/', s, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                console.log(response.data);
                successMessage();
            })
            .catch((error) => {
                errorMessage(s.name);
                console.log(error);
            });

    };

    /**
     * @memberof 'form_services_modify.js'
     * @function fetchTypeOfService fetch the type of service
     * @description the list of type of service is set
     * @see {@link 'form_services_modify.js'.setListTypeOfService}
     * @see {@link 'form_services_modify.js'.urlTypesOfService}
     * @see {@link 'form_services_modify.js'.parseCookies}
     * @see {@link 'creation_encaissement.js'.fetchTypeOfService}
     */
    const fetchTypeOfService = () => {
        const cookies = parseCookies();
        axios.get(urlTypesOfService, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                setListTypeOfService(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * @memberof 'form_services_modify.js'
     * @function loadNameServices
     * @description loads the names of the service in an array
     * @see {@link 'form_services.js'.loadNameServices}
     */
    const loadNameServices = () => {
        let lstServ = [];
        lstServices.map((s) => {
            lstServ.push(s.name.toLowerCase());
        });
        setLstNameServices(lstServ);
    };

    /**
     * @memberof 'form_services_modify.js'
     * @function useEffect fetch the type of service and services at the loading of the page
     * @see {@link 'form_services_modify.js'.fetchTypeOfService}
     * @see {@link 'form_services_modify.js'.fetchServices}
     */
    useEffect(() => {
        fetchTypeOfService();
        fetchServices();
    }, []);

    /**
     * @memberof 'form_services_modify.js'
     * @function useEffect
     * @description when services are fetched, load the names of the services
     * @see {@link 'form_services.js'.loadServices}
     */
    useEffect(() => {
        loadNameServices();
    }, [lstServices]);


    /**
     * @memberof 'form_services_modify.js'
     * @function useEffect set the service and the type of service at the loading of the page
     * @description the service and the type of service are set when the router is ready, otherwise the function is called again
     * @param {boolean} Router.isReady true if the router is ready to be used
     * @see {@link 'form_services_modify.js'.setServiceRouter}
     * @see {@link 'form_services_modify.js'.setService}
     * @see {@link 'form_services_modify.js'.setTypeOfServiceRouter}
     * @see {@link 'form_services_modify.js'.selectServiceDuration}
     * @see {@link 'form_services_modify.js'.router}
     * @see {@link 'form_services_modify.js'.values}
     * 
     */
    useEffect(() => {
        if (!router.isReady) return;

        setServiceRouter(JSON.parse(values.service));
        setService(JSON.parse(values.service));
        setTypeOfServiceRouter(JSON.parse(values.typeOfService));
        selectServiceDuration(JSON.parse(values.service).duration);

    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>Tina - Modification de service</title>
                <meta name="description" content="Page pour la modification de service de l'application Tina" />
            </Head>
            <Header />
            <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "auto", backgroundColor: "#b8aaa0" }}>
                <ul></ul>
                <div id="notification_success" className="alert alert-success" role="alert" hidden>
                    <h4 className="alert-heading">Modification réussie</h4>
                    <div>Le service a été modifié</div>
                    <hr></hr>
                    <div className="mb-0">Vous pouvez consulter tous les services en cliquant : <Link href={pathnameModal} className="alert-link">ICI</Link>
                    </div>
                </div>
                <div id="notification_error" className="alert alert-danger" role="alert" hidden>
                    <h4 className="alert-heading">Création Echouée</h4>
                    <div>Il y a un problème avec le service : <a id='service_error'> </a></div>
                </div>
                <div>
                    <ul></ul>
                    <div class="input-group mb-3">
                        <form class="form-floating">
                            <select class={"form-select"} aria-label="select_type_of_service" id='select_type_of_service' data-id="type_of_service" onChange={handleSelect}>
                                {listTypeOfService.map(item => {
                                    if (item.id === typeOfServiceRouter.id) {
                                        return (<option key={item.id} value={item.id} selected>{item.name}</option>);
                                    }
                                    return (<option key={item.id} value={item.id}>{item.name}</option>);
                                })}
                            </select>
                            <label for="select_type_of_service">Type de service</label>
                            {/* <div class="invalid-feedback">
                                Le type de service ne peut pas être vide.
                            </div> */}
                        </form>
                    </div>

                    <div>
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

                            <div class="input-group mb-3">
                                <form class="form-floating">
                                    <input type="text" class={"form-control "} defaultValue={serviceRouter.name} id={"service_titre"} data-id={"name"} placeholder={'Le titre du service '} onKeyUp={handleChange} onChange={handleChange}></input>
                                    <label htmlFor={"service_titre"}>Titre du service</label>
                                    <div class="invalid-feedback" id={'service_titre_error'}>
                                    </div>
                                </form>
                                {/* <span class="input-group-text">CHF</span> */}
                            </div>

                            <div class="input-group mb-3">
                                <form class="form-floating">
                                    <input type="number" class={"form-control "} defaultValue={serviceRouter.price} id={"service_prix"} data-id={"price"} placeholder="0" onKeyUp={handleChange} onChange={handleChange}></input>
                                    <label htmlFor={"service_prix"}>Prix normal</label>
                                    <div class="invalid-feedback" id={'service_prix_error'}>
                                    </div>
                                </form>
                                <span class="input-group-text">CHF</span>
                            </div>

                            <div class="input-group mb-3">
                                <form class="form-floating">
                                    <input type="number" className="form-control" id={"service_studentprice"} defaultValue={serviceRouter.price_student} data-id={"price_student"} placeholder="0" onKeyUp={handleChange} onChange={handleChange}></input>
                                    <label htmlFor={"service_studentprice"}>Prix etudiant</label>
                                    <div class="invalid-feedback" id={'service_studentprice_error'}>
                                    </div>
                                </form>
                                <span class="input-group-text">CHF</span>
                            </div>

                            <div class="input-group mb-3">
                                <form class="form-floating">
                                    <select class={"form-select "} aria-label="Temps de service" id={"service_temps"} data-id={"duration"} onKeyUp={handleChange} onChange={handleChange}>
                                        <option value="0">0</option>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="45">45</option>
                                        <option value="60">60</option>
                                        <option value="75">75</option>
                                        <option value="90">90</option>
                                        <option value="105">105</option>
                                        <option value="120">120</option>
                                    </select>
                                    <label for={"service_temps"}>Duree</label>
                                    <div class="invalid-feedback">
                                        La durée doit être supérieure à 0.
                                    </div>
                                </form>
                                <span class="input-group-text">Minutes</span>
                            </div>


                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Sauvegarder les modifications</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}