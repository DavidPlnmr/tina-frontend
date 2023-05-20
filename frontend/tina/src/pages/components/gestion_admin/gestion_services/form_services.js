import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRef } from 'react';
import Header from '../../header';
import Footer from '../../footer';

/**
 * @namespace 'form_services.js'
 * @description page that regroup all the services components to create a new service
 * @returns {JSX.Element}
 */
export default function Formulaire_services() {


    // Constantes pour les URL de l'API
    /**
     * @memberof 'form_services.js'
     * @constant {String}urlServices - url to get the services
     * @constant {String}urlTypesOfService - url to get the types of services
     * @constant {String}pathnameModal - pathname to redirect to the services page
     */
    const urlServices = 'http://localhost:8000/api/services/';
    const urlTypesOfService = 'http://localhost:8000/api/typesofservice/';
    // Pathname pour la redirection de page
    const pathnameModal = "./menu_services";


    /**
     * @memberof 'form_services.js'
     * @constant {Interger} typeOfService - id of the type of service selected
     * @default 0
     */
    const [typeOfService, setTypeOfService] = useState(0);

    /**
     * @memberof 'form_services.js'
     * @constant {Array} service - array of the services
     * @default [{name: '', price: 0, price_student: 0, duration: 0}]
     * @constant {String} name - name of the service
     * @constant {Interger} price - price of the service
     * @constant {Interger} price_student - price of the service for students
     * @constant {Interger} duration - duration of the service
     * @description array of the services
     */
    const [service, setService] = useState([
        {
            name: '',
            price: 0,
            price_student: 0,
            duration: 0,
        }
    ]);

    /**
     * @memberof 'form_services.js'
     * @function handleChange - function to change the value of the service
     * @description function to change the value of the service, but also to format the duration
     * @param {object} evt - event
     */

    const handleChange = (evt) => {
        console.log("handleChange");
        const index = evt.target.closest('div').dataset.index;
        console.log('index', parseInt(index));
        let val = evt.target.value;
        if (evt.target.dataset.id == 'duration') {
            val = formatTime(val);
        }
        setService((prevService) =>
            prevService.map((item, i) =>
                i === parseInt(index)
                    ? { ...item, [evt.target.dataset.id]: val }
                    : item
            )
        );
    };

    /**
     * @memberof 'form_services.js'
     * @function handleSelect - function to change the value of the type of service
     * @description function to change the value of the type of service
     * @param {object} evt - event
     */
    const handleSelect = (evt) => {

        setTypeOfService(evt.target.value);

    };

    /**
     * @memberof 'form_services.js'
     * @constant {Interger} compteur - counter of the number of services added
     * @default 0
     */
    const [compteur, setCompteur] = useState(0);


    /**
     * @memberof 'form_services.js'
     * @constant {Array} listTypeOfService - array of the types of services fetched
     * @default []
     */
    const [listTypeOfService, setListTypeOfService] = useState([]);

    /**
     * @memberof 'form_services.js'
     * @constant {boolean} dataFetchedRef - boolean to know if the data is fetched
     * @default false
     * @description boolean to know if the data is fetched, it prevents the useEffect to be called twice
     */
    const dataFetchedRef = useRef(false);

    /**
     * @memberof 'form_services.js'
     * @function addService - function to add a service
     * @description function to add a service by adding a new object JSON in the array service and incrementing the counter
     * @param {object} evt - event
     */
    const addService = (evt) => {
        evt.preventDefault();
        setCompteur(compteur + 1);

        //Quand un service est ajouté, on ajoute un nouvel objet JSON dans le tableau service
        setService(prevService => [
            ...prevService, // On copie tous les éléments de prevService
            {             // Et on ajoute un nouvel objet JSON
                name: "",
                price: 0,
                price_student: 0,
                duration: 0,
            }
        ]);
    };


    //Formattage des minutes pour le submit
    /**
     * @memberof 'form_services.js'
     * @param {Integer} minutes minutes to format
     * @see {@link 'form_services_modify.js'.formatTime}
     * @returns {String} hours and minutes formatted
     */
    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }

    /**
     * @memberof 'form_services.js'
     * @function handleSubmit - function to submit the form and call the postService function
     * @description go through the array of services and call the postService function for each service if the fields are not empty and if the type of service is selected. then if there is no error, call the successMessage function
     * @see {@link 'form_services_modify.js'.postService}
     * @see {@link 'form_services_modify.js'.successMessage}
     * @param {object} evt - event
     */
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(service);
        // boucle for pour envoyer les services
        for (let i = 0; i < compteur; ++i) {
            const s = service[i];
            if (
                typeOfService !== 0 &&
                s.name !== '' &&
                s.price !== 0 &&
                s.duration !== 0
            ) {
                s.type_of_service = typeOfService;
                postService(s);
            }
        }
        if (success) {
            successMessage();
        }

    };

    /**
     * @memberof 'form_services.js'
     * @constant {boolean} success - boolean to know if the service is added successfully
     * @default true
     */
    const [success, setSuccess] = useState(true);

    /**
     * @memberof 'form_services.js'
     * @function successMessage - function to display the success message
     * @description modify the DOM to display the success message
     * @see {@link 'form_services_modify.js'.successMessage}
     */
    const successMessage = () => {
        document.getElementById("notification_success").removeAttribute("hidden");
    };

    /**
     * @memberof 'form_services.js'
     * @param {String} newName - name of the service
     * @function errorMessage - function to display the error message
     * @see {@link 'form_services_modify.js'.errorMessage}
     */
    const errorMessage = (newName) => {
        console.log("errorMessage");
        const serviceError = document.getElementById("service_error");
        if (!success) {
            serviceError.textContent = newName;
        }

    };

    /**
     * @memberof 'form_services.js'
     * @function postService - function to post a service
     * @description post a service and set the success state to true if there is no error, else set the success state to false and call the errorMessage function
     * @param {object} s - service to post
     */
    const postService = (s) => {
        const cookies = parseCookies();

        axios.post(urlServices, s, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                console.log(response.data);
                setSuccess(true);
            })
            .catch((error) => {
                setSuccess(false);
                errorMessage(s.name);
                console.log(error);
            });

    };

    /**
     * @memberof 'form_services.js'
     * @function fetchTypeOfService - function to fetch the types of services
     * @description fetch the types of services and set the listTypeOfService state to the response data
     * @see {@link 'form_services_modify.js'.fetchTypeOfService}
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


    //Partie servant à charger les formulaires des services
    //On crée un tableau de composants qui contiendra les formulaires des services
    /**
     * @memberof 'form_services.js'
     * @constant {Array} lstNvServices - array of components to contain the forms of the services
     * @default []
     */
    let lstNvServices = [];

    //On crée une fonction qui va charger les formulaires des services selon le compteur
    /**
     * @memberof 'form_services.js'
     * @function loadServices - function to load the forms of the services
     * @description create a component for each service and add it to the lstNvServices array
     * @returns {Array} array of components to contain the forms of the services
     */
    const loadServices = () => {

        for (let n = 0; n < compteur; n++) {
            let i = n + 1;
            lstNvServices.push(
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
                    <label>Service {i}</label>
                    <ul></ul>
                    <div class="input-group mb-3">
                        <form class="form-floating" data-index={i}>
                            <input type="text" class="form-control" id={"service_titre" + i} data-id={"name"} placeholder={'Le titre du service ' + i} onChange={handleChange}></input>
                            <label for={"service_titre" + i}>Titre</label>
                        </form>
                    </div>

                    <div class="input-group mb-3">
                        <form class="form-floating" data-index={i}>
                            <input type="number" class="form-control" id={"service_prix" + i} data-id={"price"} placeholder="0" onChange={handleChange}></input>
                            <label for={"service_prix" + i}>Prix normal</label>
                        </form>
                        <span class="input-group-text">CHF</span>
                    </div>


                    <div class="input-group mb-3">
                        <form class="form-floating" data-index={i}>
                            <input type="number" class="form-control" id={"service_studentprice" + i} data-id={"price_student"} placeholder="0" onChange={handleChange}></input>
                            <label for={"service_studentprice" + i}>Prix etudiant</label>
                        </form>
                        <span class="input-group-text">CHF</span>
                    </div>

                    <div class="input-group mb-3">
                        <form class="form-floating" data-index={i}>
                            <select class="form-select" aria-label="Temps de service" id={"service_temps" + i} data-id={"duration"} onChange={handleChange}>
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
                            <label for={"service_temps" + i}>Duree</label>
                        </form>
                        <span class="input-group-text">Minutes</span>
                    </div>
                </div >
            );
        }
        return lstNvServices;
    };

    /**
     * @memberof 'form_services.js'
     * @function useEffect - when the component is mounted, fetch the types of services
     * @see {@link 'form_services.js'.fetchTypeOfService} 
     */
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchTypeOfService();
    }, []);

    return (
        <>
            <Header />
            <div
                className="mb-3 d-flex flex-column text-center justify-content-center align-items-center"
                style={{
                    height: "auto",
                    background: "#b8aaa0",
                    boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                }}
            >
                <ul></ul>
                <div id="notification_success" class="alert alert-success" role="alert" hidden>
                    <h4 class="alert-heading">Création réussie</h4>
                    <p>Vous avez créé {compteur} service(s) </p>
                    <hr></hr>
                    <p class="mb-0">Vous pouvez consulter tous les services en cliquant : <Link href={pathnameModal} class="alert-link">ICI</Link>
                    </p>
                </div>
                <div id="notification_error" class="alert alert-danger" role="alert" hidden>
                    <h4 class="alert-heading">Création Echouée</h4>
                    <p>Il y a un problème avec le service : <a id='service_error'> </a></p>
                </div>

                <div>
                    <div class="input-group mb-3">
                        <form class="form-floating">
                            <select class="form-select" aria-label="select_type_of_service" id='select_type_of_service' data-id="type_of_service" onChange={handleSelect}>
                                <option key='0' value='0'>Sélectionnez un type de service...</option>
                                {listTypeOfService.map(item => {
                                    return (<option key={item.id} value={item.id}>{item.name}</option>);
                                })}
                            </select>
                            <label for="select_type_of_service">Type de service</label>
                        </form>
                    </div>

                    <div>
                        {loadServices()}
                    </div>

                    <div class="row mb-3">
                        <button type="button" class="btn btn-dark" onClick={addService}>Ajouter un service</button>

                    </div>

                    <div class="row mb-3">

                        <button type="button" class="btn btn-primary" onClick={handleSubmit}>Sauvegarder</button>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}