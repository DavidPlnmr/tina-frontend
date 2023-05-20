import Header from '../header';
import Footer from '../footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { useRouter } from 'next/router';
import { set } from 'date-fns';

/**
 * @namespace 'encaissement.js'
 * @description this page is used to show a overview of the encaissement and to create a new encaissement
 * @returns {JSX.Element}
 */
function Encaissement_recap() {

    /**
     * @memberof 'encaissement.js'
     * @constant {string} urlCreate - the url to create a new encaissement 
     * @constant {string} pathnameModal - the pathname to the link redirecting the user after the modal is shown
     */
    //Constantes pour les URL de l'API
    const urlCreate = 'http://localhost:8000/api/collections/create/';
    //Pathname pour la redirection de page
    const pathnameModal = './menu_encaissement';
    

    /**
     * @memberof 'encaissement.js'
     * @constant {object} router - the router object to get the query
     * @constant {object} query - the query object to get the service from the url
     * @see {@link 'header.js'.router}
     */
    const router = useRouter();
    const query = router.query;


    /** 
     * @memberof 'encaissement.js'
     * @constant {object} serviceRouter - the object containing the service from the url
    */
    const [serviceRouter, setServiceRouter] = useState({});

    /**
     * @memberof 'encaissement.js'
     * @constant {boolean} refresh - the boolean to refresh the page
     */
    const [refresh, setRefresh] = useState(false);

    /**
     * @memberof 'encaissement.js'
     * @constant {boolean} check - the boolean to check if the encaissement is for a student
     */
    const [check, setCheck] = useState(false);


    /** 
     * @memberof 'encaissement.js'
     * @function successMessage - the function to show the success message then hide it after 5 seconds
     * @description the function to show the success message then hide it after 5 seconds and refresh the page
    */
    
    const successMessage = () => {
        document.getElementById("notification_success").removeAttribute("hidden");
        //après 3 secondes, on cache la notification
        setTimeout(function () {
            document.getElementById("notification_success").setAttribute("hidden", "hidden");
        }, 5000);
        setRefresh(!refresh);
    };


    /**
     * @memberof 'encaissement.js'
     * @function errorMessage - the function to show the error message then hide it after 3 seconds 
     * @param {String} txt - the text to show in the error message
     * @description the function to show the error message then hide it after 3 seconds and refresh the page
     */
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


    /**
     * @memberof 'encaissement.js'
     * @param {object} evt - the event object
     * @function handleChange - the function to handle the change of the input  
     */
    const handleChange = (evt) => {
        setServiceRouter({ ...serviceRouter, [evt.target.dataset.id]: evt.target.value });
    };


    /**
     * @memberof 'encaissement.js'
     * @function handleCheck - the function to handle the change of the checkbox
     * @param {object} evt - the event object
     */
    const handleCheck = (evt) => {
        setCheck(check=>!check);
    };

    /**
     * @memberof 'encaissement.js'
     * @function handleSubmit - the function to handle the submit of the form
     * @description the function to handle the submit of the form and create a new encaissement by sending a post request to the API
     * @var {object} encaissement - the object containing the data to create a new encaissement
     * @see {@link 'encaissement.js'.urlCreate}
     * @see {@link 'header.js'.cookies}
     */
    const handleSubmit = () => {

        const cookies = parseCookies();

        let encaissement = {
            service: parseInt(serviceRouter.id),
            amount: parseFloat(check?serviceRouter.price_student:serviceRouter.price)
        };

        console.log(encaissement);
        axios.post(urlCreate, encaissement, {
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

    /**
     * @memberof 'encaissement.js'
     * @param {boolean} router.isReady - the boolean to check if the router is ready to be used
     * @function useEffect - the function to set the serviceRouter object with the service from the url 
     * 
     */
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


    /**
     * @memberof 'encaissement.js'
     * @param {boolean} refresh - the boolean to refresh the page
     * @function useEffect - the function to refresh the page when the refresh state changes
     */
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
                    <p class="mb-0">Vous pouvez consulter tous les encaissements en cliquant : <Link href={pathnameModal} class="alert-link">ICI</Link>
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
                                            <input type="number" defaultValue={!check?serviceRouter.price:serviceRouter.price_student} class="form-control" id="service_price" data-id='price' placeholder="0" onChange={handleChange} />
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