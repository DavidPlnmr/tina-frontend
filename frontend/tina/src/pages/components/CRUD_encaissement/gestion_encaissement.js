import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { format, parse, set } from 'date-fns';
import { id } from 'date-fns/locale';
import { refineEventDef } from '@fullcalendar/core/internal';

/**
 * @namespace 'gestion_encaissement.js'
 * @description this page is used to manage the encaissements
 * @returns {JSX.Element}
 */
export default function Encaissement() {

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} urlEncaissements - url to get the encaissements
     * @constant {String} urlServices - url to get the services
     * @constant {String} urlEmployees - url to get the employees
     * @constant {String} pathnameAdd - pathname to redirect to the page to add an encaissement
     */
    // Constantes pour les URL de l'API
    const urlEncaissements = 'http://localhost:8000/api/collections/';
    const urlServices = 'http://localhost:8000/api/services/';
    const urlEmployees = 'http://localhost:8000/api/employees/';

    // Pathname pour la redirection de page
    const pathnameAdd = "./creation_encaissement";


    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} modificationMode - state to manage the message to display when the user wants to modify or delete an encaissement
     * @default ""
     */
    const [modificationMode, setModificationMode] = useState(
        ""
    );

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} buttonDelete - state to manage the className of the delete button
     * @default "btn btn-outline-danger"
     */
    const [buttonDelete, setButtonDelete] = useState(
        "btn btn-outline-danger"
    );

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} modeModify - state to manage the modification mode(modify or delete)
     * @default ""
     */
    const [modeModify, setModeModify] = useState('');
 

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} btnChoose - state to manage the className of the choose button
     * @default "btn btn-dark"
     */
    const [btnChoose, setBtnChoose] = useState(
        "btn btn-dark"
    );


    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {object} encaissement - state to manage the list of encaissements
     * @default []
     */
    //variables pour la gestion des encaissements
    //Encaissements
    const [encaissements, setEncaissements] = useState([]);

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {object} encaissementsAffichage - state to manage the list of encaissements to display
     * @default []
     */
    const [encaissementsAffichage, setEncaissementsAffichage] = useState([]);
    //Service
    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {object} services - state to manage the list of services
     * @default []
     */
    const [services, setServices] = useState([]);
    //Employee
    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {object} employees - state to manage the list of employees
     * @default []
     */
    const [employees, setEmployees] = useState([]);

    //partie de la modal
    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {object} show - state to manage if the modal is shown or not
     * @default false
     */
    const [show, setShow] = useState(false);

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {object} s - state to manage the id of the encaissement to delete
     * @default {id:0}
     */
    const [s, setS] = useState({ id: 0 });

    /**
     * @memberof 'gestion_encaissement.js'
     * @function handleClose - function to close the modal
     * @description set the state show to false
     */
    const handleClose = () => setShow(false);

    /**
     * @memberof 'gestion_encaissement.js'
     * @function handleShow - function to show the modal
     * @description set the state show to true
     */
    const handleShow = () => setShow(true);

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {boolean} refresh - state to manage the refresh of the page
     * @default false
     */
    const [refresh, setRefresh] = useState(false);

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {Integer} totalAmount - state to manage the total amount of the encaissements
     * @default 0
     */
    //total amount
    const [totalAmount, setTotalAmount] = useState(0);

    // Const pour la recherche et le tri
    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} searchTerm - state to manage the search term of the encaissements filter
     * @default ""
     */
    const [searchTerm, setSearchTerm] = useState("");

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {object} searchResults - state to manage the list of encaissements searched
     * @default []
     */
    const [searchResults, setSearchResults] = useState([]);

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} sortBy - state to manage the sort term of the encaissements filter
     * @default ""
     */
    const [sortBy, setSortBy] = useState("");

    // Handle search and sort functions for encaissements
    /**
     * @memberof 'gestion_encaissement.js'
     * @param {object} event - event to manage the search term
     * @function handleSearch - function to manage the search term
     * @description set the state searchTerm to the value of the search input
     */
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    /**
     * @memberof 'gestion_encaissement.js'
     * @function handleSort - function to manage the sort term
     * @param {object} event - event to manage the sort term
     * @description set the state sortBy to the value of the sort input
     */
    const handleSort = (event) => {
        setSortBy(event.target.value);
    };


    /**
     * @memberof 'gestion_encaissement.js'
     * @function handleClickDelete - function to manage the delete mode
     * @description set the state modeModify to 'delete' if it's not the delete mode, else set the state modeModify to ''
     */
    const handleClickDelete = () => {
        console.log("Mode Suppression");
        if (modeModify != 'delete') {
            setModeModify(modeModify => 'delete');
        } else {
            setModeModify(modeModify => '');
        }
    };


    /**
     * @memberof 'gestion_encaissement.js'
     * @function handleChoose - function to manage the choose mode
     * @param {object} evt - event to manage the choose mode 
     * @description set the state s to the id of the encaissement to delete and show the modal
     */
    const handleChoose = (evt) => {
        setS(s => ({ id: evt.target.id }));
        if (modeModify === 'delete') {
            handleShow();
        }
    };


    /**
     * @memberof 'gestion_encaissement.js'
     * @function handleConfirmDelete - function to manage the delete of the encaissement
     * @see {@link 'gestion_encaissement.js'.handleClose}
     * @see {@link 'gestion_encaissement.js'.errorMessage}
     * @see {@link 'gestion_encaissement.js'.urlEncaissements}
     * @description delete the encaissement through the API, then delete the encaissement in the list of encaissements and show a notification
     */
    const handleConfirmDelete = () => {
        console.log("supp")
        handleClose();
        encaissements.splice(encaissements.indexOf(s.id), 1);
        const cookies = parseCookies();
        axios.delete(urlEncaissements + s.id + '/', {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                console.log(response.data);
                errorMessage(s.id);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    /**
     * @memberof 'gestion_encaissement.js'
     * @function errorMessage - function to show a notification when an error occured
     * @param {Integer} id - id of the encaissement to delete
     * @description modify the text of the notification and show it, then hide it after 3 seconds, and refresh the page
     */
    const errorMessage = (id) => {
        document.getElementById("notification_delete").removeAttribute("hidden");
        const serviceError = document.getElementById("service_error");
        serviceError.textContent = id;
        //après 3 secondes, on cache la notification
        setTimeout(function () {
            document.getElementById("notification_delete").setAttribute("hidden", "hidden");
        }, 3000);
        setRefresh(!refresh);
    };

    //Récupération des encaissements
    /**
     * @memberof 'gestion_encaissement.js'
     * @function fetchEncaissements - function to get the encaissements through the API
     * @see {@link 'gestion_encaissement.js'.urlEncaissements}
     * @see {@link 'gestion_encaissement.js'.parseCookies}
     * @description get the encaissements through the API and set the state encaissements with the response data    
     */
    const fetchEncaissements = () => {
        const cookies = parseCookies();
        axios.get(urlEncaissements, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                setEncaissements(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //Récupération des services
    /**
     * @memberof 'gestion_encaissement.js'
     * @function fetchServices - function to get the services through the API
     * @see {@link 'gestion_encaissement.js'.urlServices}
     * @see {@link 'gestion_encaissement.js'.parseCookies}
     * @description get the services through the API and set the state services with the response data
     */
    const fetchServices = () => {
        const cookies = parseCookies();
        axios.get(urlServices, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                setServices(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //Récupération des employees
    /**
     * @memberof 'gestion_encaissement.js'
     * @function fetchEmployees - function to get the employees through the API
     * @see {@link 'gestion_encaissement.js'.urlEmployees}
     * @see {@link 'gestion_encaissement.js'.parseCookies}
     * @description get the employees through the API and set the state employees with the response data
     */
    const fetchEmployees = () => {
        const cookies = parseCookies();
        axios.get(urlEmployees, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                setEmployees(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //Fonctions pour l'affichage
    //Récupération du nom du service
    /**
     * @memberof 'gestion_encaissement.js'
     * @param {Integer} id - id of the service
     * @function getServiceName - function to get the name of the service
     * @description go through the list of services and return the name of the service with the id passed in parameter
     * @returns {String} name - name of the service
     */
    const getServiceName = (id) => {
        let name = "";
        services.map((s) => {
            if (s.id == id) {
                name = s.name;
            }
        });
        return name;
    };
    //Récupération du nom de l'employee
    /**
     * 
     * @param {Integer} id - id of the employee
     * @memberof 'gestion_encaissement.js'
     * @function getEmployeeName - function to get the name of the employee
     * @description go through the list of employees and return the name of the employee with the id passed in parameter
     * @returns {String} name - name of the employee
     */
    const getEmployeeName = (id) => {
        let name = "";
        employees.map((e) => {
            if (e.id == id) {
                name = e.username;
            }
        });
        return name;
    };
    //Formatage de la date
    /**
     * @memberof 'gestion_encaissement.js'
     * @param {String} date - date of the encaissement
     * @function formatDate - function to format the date of the encaissement
     * @description format the date of the encaissement from YYYY-MM-DD to DD/MM/YYYY
     * @returns {String} newDate - date of the encaissement formatted
     */
    const formatDate = (date) => {
        let newDate = date.split('-');
        return newDate[2] + "/" + newDate[1] + "/" + newDate[0];
    };
    //Formatage de l'heure
    /**
     * 
     * @param {String} time - time of the encaissement
     * @memberof 'gestion_encaissement.js'
     * @function formatTime - function to format the time of the encaissement
     * @description format the time of the encaissement from HH:MM:SS to HHhMM
     * @returns {String} newTime - time of the encaissement formatted
     */
    const formatTime = (time) => {
        let newTime = time.split(':');
        return newTime[0] + "h" + newTime[1];
    };

    //Formatage des encaissements pour l'affichage
    /**
     * 
     * @param {object} encaissements - list of the encaissements
     * @memberof 'gestion_encaissement.js'
     * @function formatEncaissements - function to format the encaissements for the display
     * @description go through the list of encaissements and format them for the display
     * @returns {object} newEncaissements - list of the encaissements formatted
     * @see {@link 'gestion_encaissement.js'.formatDate}
     * @see {@link 'gestion_encaissement.js'.formatTime}
     */
    const formatEncaissements = (encaissements) => {
        let newEncaissements = [];
        encaissements.map((e) => {
            let newEncaissement = {
                id: e.id,
                date: formatDate(e.date),
                time: formatTime(e.time),
                service: getServiceName(e.service),
                employee: getEmployeeName(e.employee),
                amount: e.amount,
            };
            newEncaissements.push(newEncaissement);
        });
        return newEncaissements;
    };

    //Affichage des encaissements
    /**
     * @memberof 'gestion_encaissement.js'
     * @function useEffect - sets the state encaissementsAffichage and searchResults with the formatted encaissements
     * and sets the state totalAmount with the total amount of the encaissements. It is called when the state encaissements is updated
     * @see {@link 'gestion_encaissement.js'.formatEncaissements}
     * @param {object} encaissements - list of the encaissements
     */
    useEffect(() => {
        let total = 0;
        encaissements.map((e) => {
            total += parseInt(e.amount);
        });
        setTotalAmount(total);
        setEncaissementsAffichage(formatEncaissements(encaissements));
        setSearchResults(formatEncaissements(encaissements));
    }, [encaissements]);

    //UseEffect pour la récupération
    /**
     * @memberof 'gestion_encaissement.js'
     * @function useEffect - calls the functions to get the services, the employees and the encaissements
     * @see {@link 'gestion_encaissement.js'.fetchServices}
     * @see {@link 'gestion_encaissement.js'.fetchEmployees}
     * @see {@link 'gestion_encaissement.js'.fetchEncaissements}
     * @param {boolean} refresh - boolean to refresh the page
     */
    useEffect(() => {
        fetchServices();
        fetchEmployees();
        fetchEncaissements();
    }, [refresh]);

    /**
     * @memberof 'gestion_encaissement.js'
     * @function useEffect - sets the state searchResults with the encaissements filtered and ordered
     * It is called when the state searchTerm or sortBy is updated
     * @description takes the encaissements formatted and filter them by the searchTerm and order them by the sortBy
     * @see {@link 'gestion_encaissement.js'.formatEncaissements}
     * @param {object} encaissementsAffichage - list of the encaissements formatted
     */
    useEffect(() => {
        //Filter by searchTerm
        let results = encaissementsAffichage.filter(e =>
            e.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.service.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("filter", results);

        //Order by sort
        results.sort((a, b) => {
            if (sortBy === 'date') {
                return a.date.localeCompare(b.date);
            } else if (sortBy === 'time') {
                return a.time.localeCompare(b.time);
            } else if (sortBy === 'service') {
                return a.service.localeCompare(b.service);
            } else if (sortBy === 'employee') {
                return a.employee.localeCompare(b.employee);
            } else if (sortBy === 'amount') {
                return a.amount - b.amount;
            }
        });
        setSearchResults(results);
    }, [searchTerm, sortBy]);


    //UseEffect pour la gestion des boutons
    /**
     * @memberof 'gestion_encaissement.js'
     * @function useEffect - sets the state buttonDelete, buttonModify, btnChoose and modificationMode
     * It is called when the state modeModify is updated
     * @description changes the buttons and the navbar depending on the modeModify
     * @param {string} modeModify - mode of the modification
     */
    useEffect(() => {
        if (modeModify === 'delete') {
            //changer le bouton
            setButtonDelete(buttonDelete => "btn btn-danger");
            // setButtonModify(buttonModify => "btn btn-outline-primary");
            setBtnChoose(btnChoose => "btn btn-danger");
            //changer la navbar
            setModificationMode(modificationMode => "MODE SUPPRESSION");
            // } else if (modeModify === 'modify') {
            //     //changer le bouton
            //     setButtonModify(buttonModify => "btn btn-primary");
            //     setButtonDelete(buttonDelete => "btn btn-outline-danger");
            //     setBtnChoose(btnChoose => "btn btn-primary");
            //     //changer la navbar
            //     setModificationMode(modificationMode => "MODE MODIFICATION");
        } else if (modeModify === '') {
            setModificationMode(modificationMode => "");
            // setButtonModify(buttonModify => "btn btn-outline-primary");
            setButtonDelete(buttonDelete => "btn btn-outline-danger");
            setBtnChoose(btnChoose => "btn btn-dark");
        }
    }, [modeModify]);

    return (
        <>
            <div className="d-flex flex-column justify-content-start align-items-center" style={{ backgroundColor: "#F6F8F7" }}>
                {/* Modal pour la suppression */}
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} transparent>
                    <Modal.Header closeButton>
                        <Modal.Title>SUPPRESSION</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Voulez-vous vraiment supprimer cet encaissement ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Annuler
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Supprimer
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* Nav Bar pour les encaissements */}

                <ul></ul>

                {/* Notification de suppression */}
                <div id="notification_delete" className="alert alert-warning" role="alert" hidden>
                    <h4 className="alert-heading">Encaissement supprimé</h4>
                    <p>L'encaissement <a id='service_error'></a> a été supprimé</p>

                </div>
                
                <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#F6F8F7" }}>
                    <div class="container-fluid text-center rounded d-flex justify-content-between align-items-center" style={{ boxShadow: "0 2px 4px rgba(0,0,0,.2)", height: "8vh", width: "100vh", backgroundColor: "#F6F8F7" }}>
                        <div class="collapse navbar-collapse" id="text">
                            <a class="navbar-brand">Gestion des encaissements</a>
                            <ul class="navbar-nav mx-auto my-auto mb-5 ms-lg-3"></ul>
                            <i class="navbar-text">
                                {modificationMode}
                            </i>
                        </div>
                        <div class="collapse navbar-collapse" id="buttons">
                            <ul class="navbar-nav mx-auto my-auto"></ul>
                            <button type="button" class={buttonDelete} onClick={handleClickDelete}>Supprimer</button>
                            <ul class="navbar-nav ms-2"></ul>
                            {/* <button type="button" class={buttonModify} onClick={handleClickModify}>Modifier</button>
                            <ul class="navbar-nav ms-1"></ul> */}
                            <button type="button" class="btn btn-primary">
                                <Link href={pathnameAdd} class="nav-link">
                                    Ajouter
                                </Link>
                            </button>
                            <ul class="navbar-nav ms-1"></ul>
                        </div>
                    </div>
                </nav>

                {/* Barre de recherche */}
                <nav class="navbar navbar-expand-lg bg-body-tertiary  justify-content-center align-items-center mx-2 my-4 rounded" style={{ boxShadow: "0 2px 4px rgba(0,0,0,.2)", backgroundColor: "#F6F8F7" }}>
                    <form class="container" role="search">
                        <div class="row mx-1">
                            <select class="form-select" value={sortBy} aria-label="Default select example" data-id="filter" onChange={handleSort}>
                                <option key='0' value='0'>Filtrer...</option>
                                <option key='1' value='id'>ID</option>
                                <option key='2' value='employee'>Employé</option>
                                <option key='3' value='service'>Service</option>
                                <option key='4' value='date'>Date</option>
                                <option key='5' value='time'>Heure</option>
                                <option key='6' value='amount'>Montant</option>
                            </select>
                        </div>
                        <div class="row mx-1" >
                            <input class="form-control me-2" type="search" placeholder="Employé/Service" id="Rechercher" onChange={handleSearch}></input>
                        </div>
                    </form>
                </nav>

                {/* Total des encaissements */}
                <table class="table table-striped text-center mx-auto rounded" style={{ boxShadow: "0 2px 4px rgba(0,0,0,.2)", width: "100vh", backgroundColor: "#FFFFFF" }}>
                    <thead>
                        <tr>
                            <th scope="col">Nombre d'encaissements</th>
                            <th scope="col">Montant total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{encaissements.length}</td>
                            <td>{totalAmount}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Liste des encaissements */}
                <div class="container">
                <table class="table table-striped mx-auto" style={{ backgroundColor: "#FFFFFF" }}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Employé</th>
                            <th scope="col">Service</th>
                            <th scope="col">Date</th>
                            <th scope="col">Heure</th>
                            <th scope="col">Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((encaissement) => (
                            <tr key={encaissement.id}>
                                <th scope="row">{encaissement.id}</th>
                                <td>{encaissement.employee}</td>
                                <td>{encaissement.service}</td>
                                <td>{encaissement.date}</td>
                                <td>{encaissement.time}</td>
                                <td>{encaissement.amount}</td>
                                <td>
                                    <Button
                                        id={encaissement.id}
                                        className={btnChoose}
                                        onClick={handleChoose}
                                        disabled={modeModify === '' ? true : false}
                                    >Choisir</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ul class="d-flex my-4"></ul>
            </div>
        </>
    );
}
