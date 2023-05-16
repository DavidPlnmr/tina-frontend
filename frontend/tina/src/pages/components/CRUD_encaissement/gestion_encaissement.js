import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { format, parse, set } from 'date-fns';
import { id } from 'date-fns/locale';
import { refineEventDef } from '@fullcalendar/core/internal';


export default function Encaissement() {
    //variables pour la gestion des boutons
    const [buttonModify, setButtonModify] = useState(
        "btn btn-outline-primary"
    );
    const [modificationMode, setModificationMode] = useState(
        ""
    );
    const [buttonDelete, setButtonDelete] = useState(
        "btn btn-outline-danger"
    );
    const [modeModify, setModeModify] = useState('');
    const [btnChooseEncaissement, setBtnChooseEncaissement] = useState(
        "btn btn-dark"
    );
    const [btnChoose, setBtnChoose] = useState(
        "btn btn-dark"
    );

    //variables pour la gestion des encaissements
    //Encaissements
    const [encaissements, setEncaissements] = useState([]);
    const [encaissementsAffichage, setEncaissementsAffichage] = useState([]);
    //Service
    const [services, setServices] = useState([]);
    //Employee
    const [employees, setEmployees] = useState([]);

    //partie de la modal
    const [show, setShow] = useState(false);
    const [s, setS] = useState({ id: 0 });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [refresh, setRefresh] = useState(false);

    //total amount
    const [totalAmount, setTotalAmount] = useState(0);

    // Const pour la recherche et le tri
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [sortBy, setSortBy] = useState("");

    // Handle search and sort functions for encaissements
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };
    const handleSort = (event) => {
        setSortBy(event.target.value);
    };


    //handleClick pour les boutons
    const handleClickModify = (evt) => {
        console.log("Mode Modification");
        if (modeModify != 'modify') {
            setModeModify(modeModify => 'modify');
        } else {
            setModeModify(modeModify => '');
        }
    };

    const handleClickDelete = (evt) => {
        console.log("Mode Suppression");
        if (modeModify != 'delete') {
            setModeModify(modeModify => 'delete');
        } else {
            setModeModify(modeModify => '');
        }
    };

    const handleChoose = (evt) => {
        setS(s => ({ id: evt.target.id }));
        if (modeModify === 'modify') {

            console.log("Modification de l'encaissement n°" + evt.target.id);
            router.push({
                pathname: '/components/CRUD_encaissement/modification_encaissement',
                query: { id: evt.target.id },
            })
        } else if (modeModify === 'delete') {
            handleShow();
        }
    };

    const handleConfirmDelete = () => {
        console.log("supp")
        handleClose();
        encaissements.splice(encaissements.indexOf(s.id), 1);
        const cookies = parseCookies();
        axios.delete('http://127.0.0.1:8000/api/collections/' + s.id + '/', {
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
    const fetchEncaissements = () => {
        const cookies = parseCookies();
        axios.get('http://127.0.0.1:8000/api/collections/', {
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
    const fetchServices = () => {
        const cookies = parseCookies();
        axios.get('http://127.0.0.1:8000/api/services/', {
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
    const fetchEmployees = () => {
        const cookies = parseCookies();
        axios.get('http://127.0.0.1:8000/api/employees/', {
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
    const formatDate = (date) => {
        let newDate = date.split('-');
        return newDate[2] + "/" + newDate[1] + "/" + newDate[0];
    };
    //Formatage de l'heure
    const formatTime = (time) => {
        let newTime = time.split(':');
        return newTime[0] + "h" + newTime[1];
    };

    //Formatage des encaissements pour l'affichage
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
    useEffect(() => {
        fetchServices();
        fetchEmployees();
        fetchEncaissements();
    }, [refresh]);

    //TODO : completer après avoir ajouter la création d'encaissement
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
    }, [searchTerm,sortBy]);

    //UseEffect pour la gestion des boutons
    useEffect(() => {
        if (modeModify === 'delete') {
            //changer le bouton
            setButtonDelete(buttonDelete => "btn btn-danger");
            setButtonModify(buttonModify => "btn btn-outline-primary");
            setBtnChoose(btnChoose => "btn btn-danger");
            //changer la navbar
            setModificationMode(modificationMode => "MODE SUPPRESSION");
        } else if (modeModify === 'modify') {
            //changer le bouton
            setButtonModify(buttonModify => "btn btn-primary");
            setButtonDelete(buttonDelete => "btn btn-outline-danger");
            setBtnChoose(btnChoose => "btn btn-primary");
            //changer la navbar
            setModificationMode(modificationMode => "MODE MODIFICATION");
        } else if (modeModify === '') {
            setModificationMode(modificationMode => "");
            setButtonModify(buttonModify => "btn btn-outline-primary");
            setButtonDelete(buttonDelete => "btn btn-outline-danger");
            setBtnChoose(btnChoose => "btn btn-dark");
        }
    }, [modeModify]);

    return (
        <>
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
            <div className="d-flex flex-column justify-content-start align-items-center" style={{backgroundColor: "#b8aaa0" }}>
                <ul></ul>

                {/* Notification de suppression */}
                <div id="notification_delete" className="alert alert-warning" role="alert" hidden>
                    <h4 className="alert-heading">Encaissement supprimé</h4>
                    <p>L'encaissement <a id='service_error'></a> a été supprimé</p>

                </div>
                <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor: "#b8aaa0" }}>
                    <div class="container-fluid text-center rounded d-flex justify-content-between align-items-center" style={{ boxShadow: "0 2px 4px rgba(0,0,0,.2)",height: "8vh", width: "100vh", backgroundColor: "#FFFFFF" }}>
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
                            <ul class="navbar-nav ms-1"></ul>
                            <button type="button" class={buttonModify} onClick={handleClickModify}>Modifier</button>
                            <ul class="navbar-nav ms-1"></ul>
                            <button type="button" class="btn btn-primary">
                                <Link href="/components/CRUD_encaissement/creation_encaissement" class="nav-link">
                                    Ajouter
                                </Link>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Barre de recherche */}
                <nav class="navbar navbar-expand-lg bg-body-tertiary  justify-content-center align-items-center mx-2 my-4 rounded" style={{boxShadow: "0 2px 4px rgba(0,0,0,.2)", backgroundColor: "#FFFFFF" }}>
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
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Rechercher" onChange={handleSearch}></input>
                        </div>
                    </form>
                </nav>

                {/* Total des encaissements */}
                <table class="table table-striped text-center mx-auto rounded" style={{boxShadow: "0 2px 4px rgba(0,0,0,.2)", width: "100vh", backgroundColor: "#FFFFFF" }}>
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
        </>
    );
}
