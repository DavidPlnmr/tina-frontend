import Header from '../header';
import Footer from '../footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from "next/head";

/**
 * @namespace 'encaissement.js'
 * @description this page is used to show a overview of the encaissement and to create a new encaissement
 * @returns {JSX.Element}
 */
function Encaissement_recap() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    /**
     * @memberof 'encaissement.js'
     * @constant {string} urlCreate
     * @constant {string} pathnameModal - the pathname to the link redirecting the user after the modal is shown
     */
    //Constantes pour les URL de l'API
    const urlCreate = baseUrl + 'collections/create';
    //Pathname pour la redirection de page
    const pathnameModal = './menu_encaissement';

    /**
     * @memberof 'encaissement.js'
     * @constant {String} isValid String that contains the class to apply to the input
     * @default {String} isValid ""
     */
    const [isValid, setIsValid] = useState("");

    /**
     * @memberof 'encaissement.js'
     * @constant {object} router
     * @constant {object} query
     * @see {@link 'header.js'.router}
     */
    const router = useRouter();
    const query = router.query;

    /**
   * @constant user
   * @memberof 'encaissement.js'
   * @see {@link 'header.js'.user}
   * @description State variable holding the currently logged-in user's information.
   * @default {{email: "", username: "", last_name: "", first_name: ""}}
   * @property {string} email - The authenticated user's email address.
   * @property {string} username - The authenticated user's username.
   * @property {string} last_name - The authenticated user's last name.
   * @property {string} first_name - The authenticated user's first name.
   */
    const [, setUser] = useState({
        email: "",
        username: "",
        last_name: "",
        first_name: "",
    });

    /** 
     * @memberof 'encaissement.js'
     * @constant {object} serviceRouter 
    */
    const [serviceRouter, setServiceRouter] = useState({});

    /**
     * @memberof 'encaissement.js'
     * @constant {boolean} refresh
     */
    const [refresh, setRefresh] = useState(false);

    /**
     * @memberof 'encaissement.js'
     * @constant {boolean} check 
     */
    const [check, setCheck] = useState(false);


    /**
     * @constant cookies
     * @memberof 'encaissement.js'
     * @see {@link 'header.js'.cookies}
     * @type {object}
     * @description An object containing all of the user's cookies.
     */
    const cookies = parseCookies();

    /**
     * @constant token
     * @memberof 'encaissement.js'
     * @see {@link 'header.js'.token}
     * @description State variable holding the currently logged-in user's authentication token.
     * @default null
     */
    const [token, setToken] = useState(null);

    /** 
     * @memberof 'encaissement.js'
     * @function successMessage 
     * @description the function to show the success message then hide it after 5 seconds and refresh the page
    */

    const successMessage = () => {
        document.getElementById("notification_success").removeAttribute("hidden");
        //après 3 secondes, on cache la notification
        setTimeout(function () {
            if (document.getElementById("notification_success") != null) {
                document.getElementById("notification_success").setAttribute("hidden", "hidden");
            }
        }, 5000);
        setRefresh(!refresh);
    };


    /**
     * @memberof 'encaissement.js'
     * @function errorMessage 
     * @param {String} txt - the text to show in the error message
     * @description the function to show the error message then hide it after 3 seconds and refresh the page
     */
    const errorMessage = (txt) => {
        document.getElementById("notification_error").removeAttribute("hidden");
        const serviceError = document.getElementById("enc_error");
        serviceError.textContent = txt;
        //après 3 secondes, on cache la notification
        setTimeout(function () {
            if (document.getElementById("notification_error") != null) {
                document.getElementById("notification_error").setAttribute("hidden", "hidden");
            }
        }, 3000);
        setRefresh(!refresh);
    };

    /**
     * @memberof 'encaissement.js'
     * @function checkEncManuel
     * @description the function to check if the encaissement is manual or not and hide the student price if it is not, since the price won't be defined
     */
    const checkEncManuel = () => {
        if (serviceRouter.id == null) {
            document.getElementById("rabais_etudiant").setAttribute("hidden", "hidden");
        }
        else {
            document.getElementById("rabais_etudiant").removeAttribute("hidden");
        }
    };


    /**
     * @memberof 'encaissement.js'
     * @param {object} evt - the event object
     * @function handleChange 
     */
    const handleChange = (evt) => {
        setServiceRouter({ ...serviceRouter, [evt.target.dataset.id]: evt.target.value });
    };


    /**
     * @function handleCheck
     */
    const handleCheck = () => {
        setCheck(check => !check);
    };

    /**
     * @memberof 'encaissement.js'
     * @function handleSubmit 
     * @description the function to handle the submit of the form and create a new encaissement by sending a post request to the API
     * @var {object} encaissement
     * @see {@link 'encaissement.js'.urlCreate}
     * @see {@link 'header.js'.cookies}
     */
    const handleSubmit = () => {

        const cookies = parseCookies();

        let encaissement = {
            service: parseInt(serviceRouter.id),
            amount: parseFloat(check ? serviceRouter.price_student : serviceRouter.price)
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
     * @function useEffect 
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



    useEffect(() => {
        checkEncManuel();
    }, [serviceRouter]);

    /**
     * @memberof 'encaissement.js'
     * @param {boolean} refresh - the boolean to refresh the page
     * @function useEffect
     */
    useEffect(() => {
        console.log("refresh");
    }, [refresh]);

    /**
     * @function useEffect
     * @memberof 'encaissement.js'
     * @see {@link 'header.js'.useEffect}
     * @description This useEffect hook sets the token and user's information based on the cookies when the component mounts or updates.
     * @returns {void}
     */
    useEffect(() => {
        setToken(cookies.csrftoken);

        if (token) {
            setUser({
                email: cookies.email,
                username: cookies.username,
                last_name: cookies.last_name,
                first_name: cookies.first_name,
            });
        }
    }, [token]);

    /**
     * @memberof 'form_typesofservice.js'
     * @function useEffect
     * @description checks if the name of the type of service is valid or not
     */
    useEffect(() => {
        if (serviceRouter.price == null || serviceRouter.price == "") {
            setIsValid("is-invalid");
        } else if (serviceRouter.price === 0) {
            setIsValid("");
        } else {
            setIsValid("is-valid");
        }
    }, [serviceRouter.price]
    );

    return (
        <>
            <Head>
                <title>Tina - Récapitulatif de l'encaissement</title>
                <meta name="description" content="Page récapitulative avant encaissement de l'application Tina" />
            </Head>
            <Header />
            <main>
                <div className="container py-5">
                    <div className="row justify-content-center text-center align-items-center">
                        <div className="col-lg-15"> {/* Remplacez ceci par la taille de colonne que vous préférez */}
                            <div className="card border-0 shadow-lg mb-3 d-flex flex-column rounded p-3 bg-light shadow-sm">
                                <div className="card-body justify-content-center text-center align-items-center">
                                    <h1 className="card-title text-center mb-5">Ajout d'un encaissement</h1>

                                    <div className="mb-3 d-flex flex-column justify-content-start align-items-center rounded my-5">
                                        <ul></ul>
                                        {/* Notifications */}
                                        <div id="notification_success" className="alert alert-success" role="alert" hidden>
                                            <h4 className="alert-heading">Création réussie</h4>
                                            <p> Encaissement ajouté </p>

                                            {token && cookies.role === "admin" && (
                                                <div>
                                                    <hr></hr>
                                                    <p className="mb-0">Vous pouvez consulter tous les encaissements en cliquant : <Link href={pathnameModal} className="alert-link">ICI</Link>
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                        <div id="notification_error" className="alert alert-danger" role="alert" hidden>
                                            <h4 className="alert-heading">Création Echouée</h4>
                                            <p>Il y a un problème avec l'encaissement de : <a id='enc_error'> </a></p>
                                        </div>

                                        <div
                                            className="mb-3 d-flex flex-column"

                                        >
                                            {/* Liste des encaissements */}
                                            <table className="table mx-2 rounded text-center" style={{
                                                width: "100vh",
                                                height: "auto",
                                                borderRadius: "6px",
                                                padding: "10px",
                                                background: "whiteSmoke",
                                                boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                                            }}>
                                                <thead></thead>
                                                <tbody>
                                                    <tr key={1}>
                                                        <td className="align-middle" scope="col">
                                                            <div className="input-group mb-3">
                                                                <div className="form-floating">
                                                                    <input type="text" defaultValue={serviceRouter.name} className="form-control" id="service_name" disabled />
                                                                    <label for="service_name">Service</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle" scope="col">
                                                            <div className="input-group mb-3">
                                                                <div className="form-floating">
                                                                    <input type="number" defaultValue={!check ? serviceRouter.price : serviceRouter.price_student} className={"form-control " + isValid} id="service_price" data-id='price' placeholder="0" onChange={handleChange} />
                                                                    <label for="service_price">Montant</label>
                                                                </div>
                                                                <span className="input-group-text">CHF</span>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle" scope="col" id='rabais_etudiant'>
                                                            <div className="input-group mb-3">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="service_discount" onClick={handleCheck} />
                                                                    <label for="service_discount">Rabais étudiant</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            {/* Boutons de validation */}

                                            <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Enregistrer</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
export default Encaissement_recap;