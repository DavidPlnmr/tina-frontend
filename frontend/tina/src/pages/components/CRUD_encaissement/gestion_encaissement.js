import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
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

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {Integer} totalLenght - state to manage the total lenght of the encaissements
     * @default 0
     */
    //total amount
    const [totalLenght, setTotalLenght] = useState(0);

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

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} amountFilter - state to manage the amount filter of the encaissements filter
     * @default ""
     */
    const [amountFilter, setAmountFilter] = useState("amount_total");

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} invertFilter - state to manage the invert filter of the encaissements filter
     * @default false
     */
    const [invertFilter, setInvertFilter] = useState(false);

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} invertFilterActive - state to manage the invert filter button of the encaissements filter
     * @default ""
     */
    const [invertFilterActive, setInvertFilterActive] = useState("");

    /**
     * @memberof 'gestion_encaissement.js'
     * @constant {String} firstTimeInvertFilter - state to manage the first time invert filter of the encaissements filter
     * @description the way the filter is applied the first time is different from the other times
     * @default true
     */
    const [firstTimeInvertFilter, setFirstTimeInvertFilter] = useState(true);

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
            } else if (id == null) {
                name = "Encaissement manuel";
            }
        });
        return name;
    };
    //Récupération du nom de l'employee
    /**
     * @memberof 'gestion_encaissement.js'
     * @function getEmployeeName
     * @param {Integer} id - id of the employee
     * @description go through the list of employees and return the username, firstname and lastname of the employee with the id passed in parameter
     * @returns {Object} employee_info - username, firstname and lastname of the employee
     */
    const getEmployeeName = (id) => {
        let employee_info = {};
        employees.map((e) => {
            if (e.id == id) {
                employee_info.username = e.username;
                employee_info.first_name = e.first_name;
                employee_info.last_name = e.last_name;
            }
        });
        return employee_info;
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

    /**
     * @memberof 'gestion_encaissement.js'
     * @function handleClickAmount
     * @description function to handle the click on the amount's filters
     * @param {object} evt 
     */
    const handleClickAmount = (evt) => {
        toggleButtons(evt);
        setAmountFilter(evt.target.id);
    };

    /**
     * @memberof 'gestion_encaissement.js'
     * @function toggleButtons
     * @description function to toggle the active class on the amount's filters
     * @param {object} evt 
     */
    const toggleButtons = (evt) => {
        document.getElementById('amount_total').classList.remove('active');
        document.getElementById('amount_annee').classList.remove('active');
        document.getElementById('amount_mois').classList.remove('active');
        document.getElementById('amount_semaine').classList.remove('active');
        document.getElementById('amount_jour').classList.remove('active');

        document.getElementById(evt.target.id).classList.toggle("active");
    };

    /**
     * @memberof 'gestion_encaissement.js'
     * @function getWeekNumber
     * @param {Date} date we want to get the week number
     * @returns {number} week number of the date
     */
    const getWeekNumber = (date) => {
        // Copy date so it doesn't modify the original
        const target = new Date(date.getTime());
        // Set to nearest Thursday: current date + 4 - current day number
        target.setDate(target.getDate() + 4 - (target.getDay() || 7));
        // Get the year of the target date
        const year = target.getFullYear();
        // Calculate the week number by taking the days between the target date and the first week of the year
        const weekNumber = Math.ceil(((target - new Date(year, 0, 1)) / 86400000 + 1) / 7);
        return weekNumber;
    };

    /**
     * @memberof 'gestion_encaissement.js'
     * @function handleClickInvertFilter
     * @description function to handle the click on the invert filter button
     */
    const handleClickInvertFilter = () => {
        setInvertFilter(!invertFilter);

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
     * @function useEffect
     * @description
     * on change of searchTerm and sortBy filter the SearchResults.
     * if invertFilter is true, invert the order of the searchResults
     * @see {@link 'gestion_encaissement.js'.searchTerm}
     * @see {@link 'gestion_encaissement.js'.sortBy}
     * @see {@link 'gestion_encaissement.js'.invertFilter}
     * @see {@link 'gestion_encaissement.js'.formatEncaissements}
     * @param {object} encaissementsAffichage - list of the encaissements formatted
     */
    useEffect(() => {
        let lstEncaissement = searchResults.length > 0 ? searchResults : encaissementsAffichage;

        //Filter by searchTerm
        let results = lstEncaissement.filter(e =>
            e.employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.service.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("filter", sortBy);
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
                return a.employee.username.localeCompare(b.employee.username);
            } else if (sortBy === 'amount') {
                return a.amount - b.amount;
            } else if (sortBy === 'id') {
                return a.id - b.id;
            }
        });
        setSearchResults(invertFilter ? results.reverse() :results);
        
    }, [searchTerm, sortBy]);

    /**
     * @memberof 'gestion_encaissement.js'
     * @function useEffect
     * @description sets the state invertFilterActive with the active class if the invertFilter is true and reverse the searchResults
     * @param {boolean} invertFilter - boolean to know if the filter is inverted
     */
    useEffect(() => {
        invertFilter ? setInvertFilterActive("active") : setInvertFilterActive("");
        setSearchResults(searchResults.reverse());
    }, [invertFilter]);

    /**
     * @memberof 'gestion_encaissement.js'
     * @functionn useEffect
     * @description filter the encaissements by the amountFilter and set the totalAmount and totalLenght 
     * @param {string} amountFilter - filter to apply on the encaissements
     */
    useEffect(() => {
        console.log("amountFilter", amountFilter);

        let today = new Date();
        let todayDate = { day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() };
        let results = [];
        let totalAmount = 0;
        let totalLenght = 0;

        if (amountFilter === 'amount_total') {
            results = encaissementsAffichage;
        } else if (amountFilter === 'amount_annee') {
            results = encaissementsAffichage.filter(e => {
                let e_year = parseInt(e.date.split('/')[2]);
                let today_year = today.getFullYear();
                return e_year === today_year;
            });
        } else if (amountFilter === 'amount_mois') {
            results = encaissementsAffichage.filter(e => {
                let e_month = parseInt(e.date.split('/')[1]);
                let today_month = (today.getMonth() + 1);
                return e_month === today_month;
            });

        } else if (amountFilter === 'amount_semaine') {
            results = encaissementsAffichage.filter(e => {

                let e_week = new Date(
                    parseInt(e.date.split('/')[2]),
                    parseInt(e.date.split('/')[1]) - 1,
                    parseInt(e.date.split('/')[0])
                );
                e_week = getWeekNumber(e_week);
                let today_week = getWeekNumber(today);
                return e_week === today_week;
            });
        } else if (amountFilter === 'amount_jour') {
            results = encaissementsAffichage.filter(e => {
                let e_date = e.date.split('/');

                return parseInt(e_date[0]) == todayDate.day && parseInt(e_date[1]) == todayDate.month && parseInt(e_date[2]) == todayDate.year;
            });
        }

        results.map(e =>
            totalAmount += parseFloat(e.amount));
        totalLenght = results.length;

        setSearchResults(results);
        setTotalAmount(totalAmount);
        setTotalLenght(totalLenght);

    }, [amountFilter, encaissementsAffichage]);


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

                <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#F6F8F7" }}>
                    <div className="container-fluid text-center rounded d-flex justify-content-between align-items-center" style={{ boxShadow: "0 2px 4px rgba(0,0,0,.2)", height: "8vh", width: "100vh", backgroundColor: "#F6F8F7" }}>
                        <div className="collapse navbar-collapse" id="text">
                            <a className="navbar-brand">Gestion des encaissements</a>
                            <ul className="navbar-nav mx-auto my-auto mb-5 ms-lg-3"></ul>
                            <i className="navbar-text">
                                {modificationMode}
                            </i>
                        </div>
                        <div className="collapse navbar-collapse" id="buttons">
                            <ul className="navbar-nav mx-auto my-auto"></ul>
                            <button type="button" className={buttonDelete} onClick={handleClickDelete}>Supprimer</button>
                            <ul className="navbar-nav ms-2"></ul>
                            {/* <button type="button" className={buttonModify} onClick={handleClickModify}>Modifier</button>
                            <ul className="navbar-nav ms-1"></ul> */}
                            <button type="button" className="btn btn-primary">
                                <Link href={pathnameAdd} className="nav-link">
                                    Ajouter
                                </Link>
                            </button>
                            <ul className="navbar-nav ms-1"></ul>
                        </div>
                    </div>
                </nav>

                {/* Barre de recherche */}
                <nav className="navbar navbar-expand-lg bg-body-tertiary  justify-content-center align-items-center mx-2 my-4 rounded" style={{ boxShadow: "0 2px 4px rgba(0,0,0,.2)", backgroundColor: "#F6F8F7" }}>
                    <form className="container" role="search">
                        <div className="row mx-1">
                            <button className={'btn btn-light ' + invertFilterActive} type="button" id="btnFilter" onClick={handleClickInvertFilter}>↑↓</button>
                        </div>
                        <div className="row mx-1">
                            <select className="form-select" value={sortBy} aria-label="Default select example" data-id="filter" onChange={handleSort}>
                                <option key='0' value='0'>Filtrer...</option>
                                <option key='1' value='id'>ID</option>
                                <option key='2' value='employee'>Employé</option>
                                <option key='3' value='service'>Service</option>
                                <option key='4' value='date'>Date</option>
                                <option key='5' value='time'>Heure</option>
                                <option key='6' value='amount'>Montant</option>
                            </select>
                        </div>
                        <div className="row mx-1" >
                            <input className="form-control me-2" type="search" placeholder="Employé/Service" id="Rechercher" onChange={handleSearch}></input>
                        </div>
                        {/* Boutons de tri */}
                        <div className='row mx-1' >
                            <div className="btn-group" role="group" aria-label="amount_filters">
                                <button id='amount_total' onClick={handleClickAmount} type="button" className={"btn btn-secondary active"} >Total</button>
                                <button id='amount_annee' onClick={handleClickAmount} type="button" className={"btn btn-secondary"} >Année</button>
                                <button id='amount_mois' onClick={handleClickAmount} type="button" className={"btn btn-secondary"} >Mois</button>
                                <button id='amount_semaine' onClick={handleClickAmount} type="button" className={"btn btn-secondary"} >Semaine</button>
                                <button id='amount_jour' onClick={handleClickAmount} type="button" className={"btn btn-secondary"} >Jour</button>
                            </div>
                        </div>
                    </form>
                </nav>

                {/* Total des encaissements */}
                <table className="table table-striped text-center mx-auto rounded" style={{ boxShadow: "0 2px 4px rgba(0,0,0,.2)", width: "100vh", backgroundColor: "#FFFFFF" }}>
                    <thead>
                        <tr>
                            <th scope="col">Nombre d'encaissements</th>
                            <th scope="col">Montant total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{totalLenght}</td>
                            <td>{totalAmount}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Liste des encaissements */}
                <div className="container">
                    <table className="table table-striped mx-auto" style={{ backgroundColor: "#FFFFFF" }}>
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
                                    <td >
                                        <div>
                                            <b>{encaissement.employee.username}</b> {encaissement.employee.first_name} {encaissement.employee.last_name}
                                        </div>
                                    </td>
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
                <ul className="d-flex my-4"></ul>
            </div>
        </>
    );
}
