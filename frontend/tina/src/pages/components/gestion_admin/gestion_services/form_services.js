import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRef } from 'react';
import Header from '../../header';


export default function Formulaire_services() {

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
        if (evt.target.dataset.id =='duration') {
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

    const [listTypeOfService, setListTypeOfService] = useState([]);

    const dataFetchedRef = useRef(false);


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
        if (serviceError) {
            serviceError.textContent = newName;
        }
          
    };

    const postService = (s) => {
        const cookies = parseCookies();

        axios.post('http://127.0.0.1:8000/api/services/', s, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                console.log(response.data);
                setSuccess(true);
            })
            .catch((error) => {
                errorMessage(s.name);
                setSuccess(false);
                console.log(error);
            });

    };

    const fetchTypeOfService = () => {
        const cookies = parseCookies();
        axios.get('http://127.0.0.1:8000/api/typesofservice/', {
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

        for (let i = 0; i < compteur; i++) {
            lstNvServices.push(
                <div>

                    <div class="row mb-3">
                        <div class="col-md-2 col-form-label">
                            <label for={"service_titre" + i}>Service{i} titre</label>
                        </div>
                        <div class="col-md-10" data-index={i}>
                            <input type="text" class="form-control" id={"service_titre" + i} data-id={"name"} placeholder={'Le titre du service ' + i} onChange={handleChange}></input>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-2 col-form-label">
                            <label for={"service_prix" + i}>Service{i} prix</label>
                        </div>
                        <div class="col-md-10">
                            <div class="input-group mb-2" data-index={i}>
                                <input type="number" class="form-control" id={"service_prix" + i} data-id={"price"} placeholder="0" onChange={handleChange}></input>
                                <div class="input-group-prepend">
                                    <div class="input-group-text">CHF</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-2 col-form-label">
                            <label for={"service_studentprice" + i}>Service{i} prix etudiant</label>
                        </div>
                        <div class="col-md-10">
                            <div class="input-group mb-2" data-index={i}>
                                <input type="number" class="form-control" id={"service_studentprice" + i} data-id={"price_student"} placeholder="0" onChange={handleChange}></input>
                                <div class="input-group-prepend">
                                    <div class="input-group-text">CHF</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-2 col-form-label">
                            <label for={"service_temps" + i}>Service{i} duree</label>
                        </div>
                        <div class="col-md-10">
                            <div class="input-group mb-2" data-index={i}>
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
                                <div class="input-group-prepend">
                                    <div class="input-group-text">Minutes</div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
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
            <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "auto", backgroundColor: "#b8aaa0" }}>
                <ul></ul>
                <div id="notification_success" class="alert alert-success" role="alert" hidden>
                    <h4 class="alert-heading">Création réussie</h4>
                    <p>Vous avez créé {compteur} service(s) </p>
                    <hr></hr>
                    <p class="mb-0">Vous pouvez consulter tous les services en cliquant : <Link href="./menu_services" class="alert-link">ICI</Link>
                    </p>    
                </div>
                <div id="notification_error" class="alert alert-danger" role="alert" hidden>
                    <h4 class="alert-heading">Création Echouée</h4>
                    <p>Il y a un problème avec le service : <a id='service_error'> </a></p>
                </div>
                <form>
                    <div class="row mb-3">
                        <select class="form-select" aria-label="Default select example" data-id="type_of_service" onChange={handleSelect}>
                            <option key='0' value='0'>Sélectionnez un type de service...</option>
                            {listTypeOfService.map(item => {
                                return (<option key={item.id} value={item.id}>{item.name}</option>);
                            })}
                        </select>
                    </div>

                    <div>
                        {loadServices()}
                    </div>

                    <div class="row mb-3">
                        <div class="col-auto">
                            <button type="button" class="btn btn-outline-secondary" onClick={addService}>Ajouter un service</button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-auto">
                            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Sauvegarder</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}