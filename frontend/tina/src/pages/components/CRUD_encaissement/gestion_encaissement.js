import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { format, set } from 'date-fns';
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

    //Affichage des encaissements

    const loadEncaissements = () => {
        const lstComponentsEncaissements = [];
        let encaissement = {
            id: 0,
            employee: 0,
            service: 0,
            date: "",
            time: "",
            amount: 0
        };
        let i = encaissements.length;
        encaissements.map((e) => {
            encaissement =
            {
                id: e.id,
                employee: getEmployeeName(e.employee),
                service: getServiceName(e.service),
                date: formatDate(e.date),
                time: formatTime(e.time),
                amount: e.amount
            }
                ;
            lstComponentsEncaissements.push(
                <tr>
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

            );
            i--;
        });
        return lstComponentsEncaissements;
    };
    useEffect(() => {
        let total = 0;
        encaissements.map((e) => {
            total += parseInt(e.amount);
        });
        setTotalAmount(total);
    }, [encaissements]);

    //UseEffect pour la récupération
    useEffect(() => {
        fetchEncaissements();
        fetchServices();
        fetchEmployees();
    }, [refresh]);

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
            <div className="d-flex flex-column justify-content-start align-items-center" style={{ backgroundColor: "#b8aaa0" }}>
                <ul></ul>

                {/* Notification de suppression */}
                <div id="notification_delete" className="alert alert-warning" role="alert" hidden>
                    <h4 className="alert-heading">Encaissement supprimé</h4>
                    <p>L'encaissement <a id='service_error'></a> a été supprimé</p>

                </div>
                <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#b8aaa0" }}>
                    <div class="container-fluid text-center rounded d-flex justify-content-between align-items-center" style={{ height: "8vh", width: "100vh", backgroundColor: "#FFFFFF" }}>
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
                {/* Total des encaissements */}
                <table class="table table-striped mx-auto" style={{ backgroundColor: "#FFFFFF" }}>
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
                        {loadEncaissements()}
                    </tbody>
                </table>
            </div>
        </>
    );
}
