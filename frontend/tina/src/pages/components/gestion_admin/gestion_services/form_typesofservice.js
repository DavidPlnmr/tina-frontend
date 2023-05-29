import Header from '../../header';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Head from "next/head";
import Footer from "@/pages/components/footer";
import Table from "react-bootstrap/Table";

/**
 * @namespace 'form_typesofservice.js'
 * @description page that allows the user to create a new type of service or to add a new service to an existing type of service
 * @returns {JSX.Element}
 */
export default function Formulaire_typesofservice() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // Constantes pour les URL de l'API
    /**
     * @memberof 'form_typesofservice.js'
     * @constant {String} urlTypesOfService URL of the API for the types of service
     * @constant {String} pathnameModal Pathname for the redirection of page after the creation of a new type of service
     * @constant {String} pathnameNewService Pathname for the redirection of page when the user wants to create a new service
     */
    const urlTypesOfService = baseUrl + 'typesofservice/';
    // Pathname pour la redirection de page
    /**
     * @memberof 'services.js'
     * @constant {Array} lstTypesOfService Array that contains all the types of service
     * @constant {Array} lstTOSNames Array that contains all the names of the types of service
     * @default {Array} lstTypesOfService []
     * @default {Array} lstTOSNames []
     * @see{@link 'services.js'.lstTypesOfService}
     */
    const [lstTOSNames, setLstTOSNames] = useState([]);
    const [lstTypesOfService, setLstTypesOfService] = useState([]);

    /**
     * @memberof 'form_typesofservice.js'
     * @constant {Object} typeOfService Object that contains the name of the type of service
     * @constant {String} typeOfService.name Name of the type of service
     * @default {String} typeOfService.name ""
     */
    const [typeOfService, setTypeOfService] = useState(
        {
            name: "",
        }
    );

    /**
     * @memberof 'form_typesofservice.js'
     * @function handleChangeType Function that allows the user to change the name of the type of service
     * @description takes the value of the input and changes the value of the name of the type of service
     * @param {object} evt - event
     */
    const handleChangeType = (evt) => {
        setTypeOfService({ ...typeOfService, [evt.target.dataset.id]: evt.target.value });
    };

    /**
     * @memberof 'form_typesofservice.js'
     * @function fetchTypeOfService Function that fetches the types of service from the database
     * @description fetches the types of service from the database and sets the list of types of service to the response of the request
     * @see {@link 'services.js'.fetchTypeOfService}
     */
    const fetchTypeOfService = () => {
        const cookies = parseCookies();
        axios.get(urlTypesOfService, {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                setLstTypesOfService(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * @memberof 'form_typesofservice.js'
     * @function loadTOSNames
     * @description loads the names of the types of service in an array
     */
    const loadTOSNames = () => {
        let lstTOSNames = [];
        lstTypesOfService.map((tos) => {
            lstTOSNames.push(tos.name.toLowerCase());
        });
        setLstTOSNames(lstTOSNames);
    };

    /**
     * @memberof 'form_typesofservice.js'
     * @constant {String} isValid String that contains the class to apply to the input
     * @default {String} isValid ""
     *
     */
    const [isValid, setIsValid] = useState("");


    const [serviceExistsError, setServiceExistsError] = useState(false);

    /**
     * @memberof 'form_typesofservice.js'
     * @function handleSubmit Function that allows the user to create a new type of service
     * @description posts the new type of service in the database and shows a notification if the creation is successful or not
     * @see {@link 'form_typesofservice.js'.urlTypesOfService}
     * @see {@link 'form_typesofservice.js'.typeOfService}
     */
    const handleSubmit = () => {
        if (typeOfService.name !== "") {
            if (lstTOSNames.includes(typeOfService.name.toLowerCase())) {
                setServiceExistsError(true);
            } else {
                const cookies = parseCookies();

                axios.post(urlTypesOfService, typeOfService, {
                    headers: {
                        Authorization: 'Token ' + cookies.csrftoken,
                    },
                })
                    .then((response) => {
                        console.log(response.data);

                        setLstTypesOfService(prevState => [...prevState, response.data]);
                        setServiceExistsError(false);

                        // Réinitialise le typeOfService pour vider l'input
                        setTypeOfService({name: ""});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };



    /**
     * @memberof 'form_typesofservice.js'
     * @function useEffect
     * @description calls the function fetchTypeOfService when the page is loaded
     * @return {void}
     */
    useEffect(() => {
        fetchTypeOfService();
        console.log(lstTypesOfService);
    }, []);


    /**
     * @memberof 'form_typesofservice.js'
     * @function loadTOSNames
     * @description loads the names of the types of service in an array, when lstTypesOfService is loaded
     */
    useEffect(() => {
        loadTOSNames();
    }, [lstTypesOfService]);

    /**
     * @memberof 'form_typesofservice.js'
     * @function useEffect
     * @description checks if the name of the type of service is valid or not
     */
    useEffect(() => {
            if (lstTOSNames.includes(typeOfService.name.toLowerCase())) {
                setIsValid("is-invalid");
            } else if (typeOfService.name !== "") {
                setIsValid("is-valid");
            }else{
                setIsValid("");
            }
        }, [typeOfService.name]
    );

    return (
        <>
            <Head>
                <title>Tina - Création de type de service</title>
                <meta name="description" content="Page pour la création de type de service de l'application Tina" />
            </Head>
            <Header />
            <main>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow-lg mt-4 rounded">
                                <div className="card-body">
                                    <h1 className="card-title text-center text-">Liste des types de service</h1>

                                    {/* Boutons Retour aux services et Ajouter un service */}
                                    <div className="d-flex justify-content-center mt-3 mb-4">
                                        <Link href="menu_services" passHref>
                                            <button className="btn btn-outline-secondary" style={{ marginRight: '10px' }}>
                                                Retour aux services
                                            </button>
                                        </Link>
                                        <Link href="form_services" passHref>
                                            <button className="btn btn-outline-primary">
                                                Ajouter un service
                                            </button>
                                        </Link>
                                    </div>

                                    <Table className="table-hover">
                                        <thead className="rounded" style={{ backgroundColor: "#232627", color: "#F6F8F7" }}>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Type</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {lstTypesOfService.map((tos, index) => (
                                            <tr key={tos.id}>
                                                <td>{index + 1}</td>
                                                <td>{tos.name}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td colSpan="2">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <input type="text" className={"form-control " + isValid} data-id="name" onChange={handleChangeType} id="type_of_service" value={typeOfService.name} style={{ marginRight: "5px"}} />
                                                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>Créer</button>
                                                </div>
                                                {serviceExistsError && <div className="text-danger">Le type de service existe déjà</div>}
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </Table>
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
