import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRef } from 'react';
import Header from '../../header';
import { useRouter } from 'next/router';

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
        if (evt.target.dataset.id =='duration') {
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
     * @function handleSubmit submit the form calling the function putService
     * @see {@link 'form_services_modify.js'.putService}
     * @param {object} evt event
     */
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(service);
        putService(service);

    };

    /**
     * @memberof 'form_services_modify.js'
     * @function successMessage display the success message
     * @description the success message is displayed, the attribute hidden is removed
     */
    const successMessage = () => {
        document.getElementById("notification_success").removeAttribute("hidden");
    };


    /**
     * @memberof 'form_services_modify.js'
     * @param {String} newName name of the service having an error
     * @function errorMessage display the error message
     * @description the error message is displayed, the attribute hidden is removed
     * 
     */
    const errorMessage = (newName) => {
        console.log("errorMessage");
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

        axios.put(urlServices+s.id+'/', s, {
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
     * @function useEffect fetch the type of service at the loading of the page
     * @see {@link 'form_services_modify.js'.fetchTypeOfService}
     */
    useEffect(() => {
        fetchTypeOfService();
    }, []);

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
            <Header />
            <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "auto", backgroundColor: "#b8aaa0" }}>
                <ul></ul>
                <div id="notification_success" className="alert alert-success" role="alert" hidden>
                    <h4 className="alert-heading">Modification réussie</h4>
                    <p>Le service a été modifié</p>
                    <hr></hr>
                    <p className="mb-0">Vous pouvez consulter tous les services en cliquant : <Link href={pathnameModal} className="alert-link">ICI</Link>
                    </p>
                </div>
                <div id="notification_error" className="alert alert-danger" role="alert" hidden>
                    <h4 className="alert-heading">Création Echouée</h4>
                    <p>Il y a un problème avec le service : <a id='service_error'> </a></p>
                </div>
                <form>
                    <div className="row mb-3">
                        <select className="form-select" aria-label="typeOfService select" data-id="type_of_service" onChange={handleSelect}>
                            {listTypeOfService.map(item => {
                                if (item.id === typeOfServiceRouter.id) {
                                    return (<option key={item.id} value={item.id} selected>{item.name}</option>);
                                }
                                return (<option key={item.id} value={item.id}>{item.name}</option>);
                            })}
                        </select>
                    </div>

                    <div>
                        <div>

                            <div className="row mb-3">
                                <div className="col-md-2 col-form-label">
                                    <label htmlFor={"service_titre"}>Service titre</label>
                                </div>
                                <div className="col-md-10" >
                                    <input type="text" className="form-control" defaultValue={serviceRouter.name} id={"service_titre"} data-id={"name"} placeholder={'Le titre du service '} onChange={handleChange}></input>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-2 col-form-label">
                                    <label htmlFor={"service_prix"}>Service prix</label>
                                </div>
                                <div className="col-md-10">
                                    <div className="input-group mb-2" >
                                        <input type="number" className="form-control" id={"service_prix"} defaultValue={serviceRouter.price} data-id={"price"} placeholder="0" onChange={handleChange}></input>
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">CHF</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-2 col-form-label">
                                    <label htmlFor={"service_studentprice"}>Service prix etudiant</label>
                                </div>
                                <div className="col-md-10">
                                    <div className="input-group mb-2">
                                        <input type="number" className="form-control" id={"service_studentprice"} defaultValue={serviceRouter.price_student} data-id={"price_student"} placeholder="0" onChange={handleChange}></input>
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">CHF</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-2 col-form-label">
                                    <label htmlFor={"service_temps"}>Service duree</label>
                                </div>
                                <div className="col-md-10">
                                    <div className="input-group mb-2">
                                        <select className="form-select" aria-label="Temps de service" id={"service_temps"} data-id={"duration"} onChange={handleChange}>
                                            <option id='0' value="0">0</option>
                                            <option id='15' value="15">15</option>
                                            <option id='30' value="30">30</option>
                                            <option id='45' value="45">45</option>
                                            <option id='60' value="60">60</option>
                                            <option id='75' value="75">75</option>
                                            <option id='90' value="90">90</option>
                                            <option id='105' value="105">105</option>
                                            <option id='120' value="120">120</option>
                                        </select>
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Minutes</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Sauvegarder les modifications</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}