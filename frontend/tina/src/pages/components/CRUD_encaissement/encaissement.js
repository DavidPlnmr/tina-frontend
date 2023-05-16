import Header from '../header';
import Footer from '../footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { useRouter } from 'next/router';
import { set } from 'date-fns';

/**
 * Page récapitulative de l'encaissement
 * @returns {JSX.Element}
 */
function Encaissement_recap() {
    const router = useRouter();
    const query = router.query;
    const [serviceRouter, setServiceRouter] = useState({});
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [serviceAffichage, setServiceAffichage] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [check, setCheck] = useState(false);


    /**
     * Fonction pour afficher le message de succès
     * @returns {JSX.Element}
     */
    
    const successMessage = () => {
        document.getElementById("notification_success").removeAttribute("hidden");
        //après 3 secondes, on cache la notification
        setTimeout(function () {
            document.getElementById("notification_success").setAttribute("hidden", "hidden");
        }, 5000);
        setRefresh(!refresh);
    };

    const errorMessage = (txt) => {
        document.getElementById("notification_error").removeAttribute("hidden");
        const serviceError = document.getElementById("enc_error");
        serviceError.textContent = txt;
        //après 3 secondes, on cache la notification
        setTimeout(function () {
            document.getElementById("notification_error").setAttribute("hidden", "hidden");
        }, 3000);
        setRefresh(!refresh);
    };

    const handleChange = (evt) => {
        setServiceRouter({ ...serviceRouter, [evt.target.dataset.id]: evt.target.value });
    };

    const handleCheck = (evt) => {
        setCheck(check=>!check);
    };

    const handleSubmit = (evt) => {

        const cookies = parseCookies();

        let encaissement = {
            service: parseInt(serviceRouter.id),
            amount: parseFloat(check?serviceRouter.price_student:serviceRouter.price)
        };

        console.log(encaissement);
        axios.post('http://127.0.0.1:8000/api/collections/create', encaissement, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                console.log(response.data);
                successMessage(serviceRouter.name);
            })
            .catch((error) => {

                errorMessage(serviceRouter.name);
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

    useEffect(() => {
        if (!router.isReady) return;
        setServiceRouter(
            {
                ...serviceRouter,
                id: JSON.parse(query.service).id,
                name: JSON.parse(query.service).name,
                price: JSON.parse(query.service).price,
                price_student: JSON.parse(query.service).price_student,

            }
        );
    }, [router.isReady]);
    useEffect(() => {
        console.log('serv router', serviceRouter);
    }, [serviceRouter]);
    useEffect(() => {
        fetchEmployees();
    }, []);
    useEffect(() => {
        console.log("refresh");
    }, [refresh]);

    return (
        <>
            <Header />
            <div
                className="mb-3 d-flex flex-column justify-content-start align-items-center"
                style={{
                    height: "100vh",
                    background: "#b8aaa0",
                    boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                }}
            >
                <ul></ul>
                {/* Notifications */}
                <div id="notification_success" class="alert alert-success" role="alert" hidden>
                    <h4 class="alert-heading">Création réussie</h4>
                    <p> Encaissement ajouté </p>
                    <hr></hr>
                    <p class="mb-0">Vous pouvez consulter tous les encaissements en cliquant : <Link href="./menu_encaissement" class="alert-link">ICI</Link>
                    </p>
                </div>
                <div id="notification_error" class="alert alert-danger" role="alert" hidden>
                    <h4 class="alert-heading">Création Echouée</h4>
                    <p>Il y a un problème avec l'encaissement de : <a id='enc_error'> </a></p>
                </div>

                <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#b8aaa0" }}>
                    <div class="container-fluid text-center rounded" style={{ height: "8vh", width: "100vh", backgroundColor: "#FFFFFF" }}>
                        <div class="collapse navbar-collapse" id="text">
                            <a class="navbar-brand">Ajout d'un encaissement</a>
                            <ul class="navbar-nav ms-auto mb-5 ms-lg-3"></ul>
                        </div>
                    </div>
                </nav>
                <ul></ul>

                <div
                    className="mb-3 d-flex flex-column"
                    style={{
                        width: "100vh",
                        height: "auto",
                        borderRadius: "6px",
                        padding: "10px",
                        background: "whiteSmoke",
                        boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                    }}
                >
                    {/* TODO: FINIR LE TABLEAU */}
                    {/* Liste des encaissements */}
                    <table class="table mx-2 rounded text-center" style={{ backgroundColor: "#FFFFFF" }}>
                        <thead></thead>
                        <tbody>
                            <tr key={1}>
                                <td className="align-middle" scope="col">
                                    <div class="input-group mb-3">
                                        <div class="form-floating">
                                            <input type="text" defaultValue={serviceRouter.name} class="form-control" id="service_name" disabled />
                                            <label for="service_name">Service</label>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle" scope="col">
                                    <div class="input-group mb-3">
                                        <div class="form-floating">
                                            <input type="number" defaultValue={serviceRouter.price} class="form-control" id="service_price" data-id='price' placeholder="0" onChange={handleChange} />
                                            <label for="service_price">Montant</label>
                                        </div>
                                        <span class="input-group-text">CHF</span>
                                    </div>
                                </td>
                                <td className="align-middle" scope="col">
                                    <div class="input-group mb-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="service_discount" onClick={handleCheck}/>
                                            <label for="service_discount">Rabais étudiant</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Boutons de validation */}

                    <button type="button" class="btn btn-primary btn-lg" onClick={handleSubmit}>Enregistrer</button>

                </div>
            </div>
            <Footer />
        </>
    );
}
export default Encaissement_recap;