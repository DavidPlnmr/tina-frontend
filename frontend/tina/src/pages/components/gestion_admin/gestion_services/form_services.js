import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRef } from 'react';
import Header from '../../header';
import Footer from '../../footer';


export default function Formulaire_services() {

    // Constantes pour les URL de l'API
    const urlServices = 'http://localhost:8000/api/services/';
    const urlTypesOfService = 'http://localhost:8000/api/typesofservice/';
    // Pathname pour la redirection de page
    const pathnameModal = "./menu_services";



    const [typeOfService, setTypeOfService] = useState(0);

    const [service, setService] = useState([
        {
            name: '',
            price: 0,
            price_student: 0,
            duration: 0,
        }
    ]);

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

    const handleSelect = (evt) => {

        setTypeOfService(evt.target.value);

    };

    const [compteur, setCompteur] = useState(0);

    const [listTypeOfService, setListTypeOfService] = useState([]);

    const dataFetchedRef = useRef(false);

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
    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }


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

    const [success, setSuccess] = useState(true);
    const successMessage = () => {
        document.getElementById("notification_success").removeAttribute("hidden");
    };

    const errorMessage = (newName) => {
        console.log("errorMessage");
        const serviceError = document.getElementById("service_error");
        if (!success) {
            serviceError.textContent = newName;
        }

    };

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
    let lstNvServices = [];

    //On crée une fonction qui va charger les formulaires des services selon le compteur
    const loadServices = () => {

        for (let n = 0; n < compteur; n++) {
            let i = n + 1;
            lstNvServices.push(
                // <div
                //     className="mb-3 d-flex flex-column"
                //     id='form'
                //     style={{
                //         width: "100vh",
                //         height: "auto",
                //         borderRadius: "6px",
                //         padding: "10px",
                //         background: "whiteSmoke",
                //         boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                //     }}
                // >
                //     <form class="form-floating" >
                //         <input type="text" class="form-control" data-id="name" onChange={handleChangeType} id="type_of_service" />
                //         <label for="type_of_service">Nom du type de service</label>
                //     </form >
                // </div>

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

    useEffect(() => {
        console.log('services', service);
        console.log('type', typeOfService);
        console.log('compoteur', compteur);
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchTypeOfService();
    }, [service, typeOfService, compteur]);

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