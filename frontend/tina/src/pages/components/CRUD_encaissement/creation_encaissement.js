import Header from '../header';
import Footer from '../footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from "next/head";


/**
 * @namespace 'creation_encaissement.js'
 * @description This component provides the functionality to create a new payment.
 * @returns {JSX.Element} A React component rendering the page to select a Service for the creation of a new payment
 */
export default function Creation_encaissement() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  /**
   * @memberof 'creation_encaissement.js'
   * @constant {string} urlServices  The URL to fetch the Services from the API
   */
  /**
   * @memberof 'creation_encaissement.js'
   * @constant {string} urlTypesOfService  The URL to fetch the TypesOfService from the API
   */
  /**
   * @memberof 'creation_encaissement.js'
   * @constant {string} pathname  The pathname to redirect to the page to create a new payment (encaissement)
   */
  /** 
   * @memberof 'creation_encaissement.js'
   * @constant {string} pathnameChooseService  The pathname to redirect after the service selection, to create a new payment (encaissement)
   */
  /**
   * @memberof 'creation_encaissement.js'
   * @constant {baseUrl} baseUrl  The base URL of the API
   */
  // Constantes pour les URL de l'API
  const urlServices = baseUrl + 'services/';
  const urlTypesOfService = baseUrl + 'typesofservice/';
  // Pathname pour la redirection de page
  const pathname = '/components/CRUD_encaissement/encaissement';
  const pathnameChooseService = '/components/CRUD_encaissement/encaissement';


  /**
   * @memberof 'creation_encaissement.js'
   * @constant {object} router 
   * @description The router object to redirect to another page after the service selection. It is from the Next.js library
   * @see {@link 'header.js'.router}
   */
  //Partie pour la redirection de page
  const router = useRouter();


  /**
   * @memberof 'creation_encaissement.js'
   * @constant {object} query  The query object to get the service selected from the previous page. It is from the Next.js library 
   * @function handleClick
   * @description the parameter 'service' is stringified then sent to the next page through the query object
   * Redirect to the next page with the service selected
   * @param {JSON} service 
   */
  const handleClick = (service) => {
    router.push({
      pathname: pathname,
      query: { service: JSON.stringify(service) },
    })
  };

  /**
   * @memberof 'creation_encaissement.js'
   * @property {object} encaissement_manuel variable to store the service selected from the previous page into a JSON object
   * @function handleClickEncManuel 
   * @description Function to redirect to the next page with the encaissement_manuel object
   * the parameter 'encaissement' is a premade service with the id 0, it is then stringified then sent to the next page through the query object
   * 
   */
  const handleClickEncManuel = () => {
    let encaissement_manuel = {
      name: "Encaissement manuel"
    };
    router.push({
      pathname: pathname,
      query: { service: JSON.stringify(encaissement_manuel) },
    })
  };

  /**
   * @memberof 'creation_encaissement.js'
   * @constant {object} lstServices
   * @description The list of services fetched from the API
   * @default {object} [] An empty list
   */
  //Partie pour les services et affichage etc
  const [lstServices, setLstServices] = useState([]);

  /**
   * @memberof 'creation_encaissement.js'
   * @constant {object} lstTypesOfService
   * @description The list of types of services fetched from the API
   * @default {object} [] An empty list
   */
  const [lstTypesOfService, setLstTypesOfService] = useState([]);

  // /**
  //  * @constant numCols
  //  * @memberof 'creation_encaissement.js'
  //  * @description To get number of columns
  //  * @summary This state variable is used to store the number of columns.
  //  * @summary The number of columns is calculated based on the number of types of service.
  //  * @returns {number}
  //  * @see {@link 'service_rdv.js'.numCols}
  //  */
  // const numCols = lstTypesOfService && lstTypesOfService.length <= 4 ? Math.floor(12 / lstTypesOfService.length) : 3;

  /**
   * @memberof 'creation_encaissement.js'
   * @function fetchTypeOfService
   * @description Function to fetch the types of services from the API
   * @param {String} duration string of the duration of a service
   * @returns {Integer}
   */
  // Function to format the duration
  const formatDuration = (duration) => {
    const hours = duration.split(":")[0] * 60;
    const minutes = duration.split(":")[1];
    return parseInt(hours) + parseInt(minutes);
  };


  /**
   * @memberof 'creation_encaissement.js'
   * @param {object} price it is the price of a service
   * @function priceWithoutCent
   * @description if the parameter 'price' is a string, it is then split into an array of 2 elements, the first element is the price without the cents. otherwise, it returns the price
   * @returns {object} the price of a service without the cents
   * 
   */
  // Function to get price without cents
  const priceWithoutCent = (price) => {
    if (typeof price !== "string") {
      return price;
    }
    const splitPrice = price.split(".");
    if (splitPrice.length === 1) {
      return splitPrice[0];
    }
    return splitPrice[0];
  };

  /**
   * 
   * @param {object} lstTypeOfService a list of types of services
   
   * @memberof 'creation_encaissement.js'
   * @function minPriceForATypeOfService
   * @description this function returns the minimum price for a type of service
   * @returns {object} the minimum price for a type of service
   */
  // Function to get the minimum price for a type of service
  const minPriceForATypeOfService = (lstTypeOfService) => {
    let val = 0;
    val = priceWithoutCent(lstServices
      .filter((service) => service.type_of_service === lstTypeOfService.id)
      .sort((a, b) => a.price - b.price)[0]?.price || 0)
    return val;
  }

  /**
   * @memberof 'creation_encaissement.js'
   * @param {String} urlTypesOfService the url to fetch the types of services from the API
   * @function fetchTypeOfService
   * @description Function to fetch the types of services from the API
   * @constant {object} cookies The cookies object to get the csrftoken
   * @see {@link 'header.js'.cookies}
   * 
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
   * @memberof 'creation_encaissement.js'
   * @param {String} urlServices the url to fetch the services from the API
   * @function fetchServices
   * @description Function to fetch the services from the API
   * @constant {object} cookies The cookies object to get the csrftoken
   * @see {@link 'header.js'.cookies}
   */
  const fetchServices = () => {
    const cookies = parseCookies();
    axios.get(urlServices, {
      headers: {
        Authorization: 'Token ' + cookies.csrftoken,
      },
    })
      .then((response) => {
        setLstServices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  /**
   * @memberof 'creation_encaissement.js'
   * @param {object} lstServices the list of services
   * @function useEffect
   * @description Function to refresh the page when the list of services is updated
   */
  useEffect(() => {
    console.log("refresh");
  }, [lstServices]);

  /**
   * @memberof 'creation_encaissement.js'
   * @function useEffect
   * @description Function to fetch the services and the types of services from the API when the page is loaded. It calls the functions fetchServices and fetchTypeOfService
   */
  useEffect(() => {
    fetchServices();
    fetchTypeOfService();
  }, []);
  return (
    <>
      <Head>
        <title>Tina - Choix du service avant encaissement</title>
        <meta name="description" content="Page de choix de service avant encaissement, de l'application Tina" />
      </Head>
      <Header />
      <main>
        <div className="container pt-5">
          <div className="container py-5">
            <div className="row justify-content-center text-center align-items-center">
              <div className="col-lg-15"> {/* Remplacez ceci par la taille de colonne que vous préférez */}
                <div className="card border-0 shadow-lg mb-3 d-flex flex-column rounded p-3 bg-light shadow-sm">
                  <div className="card-body text-center align-items-center">
                    <h1 className="card-title text-center">Ajout d'un encaissement</h1>
                    <button type="button" className='btn btn-outline-primary' onClick={handleClickEncManuel}>Encaissement manuel</button>

                    {/* Tableau des services */}
                    <div className="container mb-5 pt-5"> {/* Container for the services */}
                      <div className="row mb-5 justify-content-center text-center align-items-start">
                        {lstTypesOfService && // Check if types of service have been fetched before rendering the services
                          lstTypesOfService.map((typeOfService) => (
                            <div className="col-md-5 col-lg-3" key={typeOfService.id}> {/* Create a column for each service */}
                              <Card className="mb-3"> {/* Create a card to display each type of service */}
                                <Card.Body>
                                  <Card.Title style={{ color: "#232627", fontSize: "36px", marginBottom: "22px" }}>{typeOfService.name}</Card.Title> {/* Display the name of the service type */}
                                  <Card.Subtitle className="mb-2" style={{ color: "#F3B10E", fontSize: "28px" }}>
                                    À partir de CHF {minPriceForATypeOfService(typeOfService)}.-
                                  </Card.Subtitle> {/* Display the minimum price for each type of service */}
                                  <hr />
                                  <div>
                                    {lstServices &&
                                      lstServices
                                        .filter((service) => service.type_of_service === typeOfService.id) // Filter services based on their type
                                        .sort((a, b) => b.price - a.price) // Sort services by price in descending order
                                        .map((service) => (
                                          <div
                                            className="mb-3 d-flex flex-column"
                                            key={service.id}
                                            style={{
                                              background: "whiteSmoke",
                                              borderRadius: "6px",
                                              padding: "10px",
                                              boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                                            }}
                                          >
                                            <div>
                                              <Card.Text className="mb-1">{service.name}</Card.Text> {/* Display the name of the service */}
                                              <Card.Text className="mb-2">{formatDuration(service.duration)} minutes, CHF {priceWithoutCent(service.price)}.-</Card.Text> {/* Display the duration and price of the service */}
                                            </div>

                                            <Button
                                              id='btnChooseService' onClick={() => handleClick(service)}>
                                              Choisir
                                              <Link href={pathnameChooseService + service.id} style={{ color: "white" }}></Link> {/* Button to choose a service */}
                                            </Button> {/* Button to choose a service */}
                                          </div>
                                        ))}
                                  </div>
                                </Card.Body>
                                <Card.Footer className="text-muted" style={{ background: "white", alignSelf: "flex-end", border: "none" }}>
                                  Étudiant réduc 5.-
                                </Card.Footer> {/* Footer displaying a discount for students */}
                              </Card>
                            </div>
                          ))}
                      </div>
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
