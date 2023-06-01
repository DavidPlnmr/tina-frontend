import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { set } from 'date-fns';

/**
 * @namespace 'services.js'
 * @description page that allows the user to see all the services and to modify or delete them
 * @returns {JSX.Element}
 */
export default function Services() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Constantes pour les URL de l'API
  /**
   * @memberof 'services.js'
   * @constant {String} urlServices URL of the API for the services
  */
  /** 
   * @memberof 'services.js'
   * @constant {String} urlTypesOfService URL of the API for the types of service
   */
  /**
   * @memberof 'services.js'
  * @constant {String} pathnameChooseService Pathname for the redirection of page when the user wants to modify a service
   */
  /**
   * @memberof 'services.js'
  * @constant {String} pathnameAdd Pathname for the redirection of page when the user wants to add a new service
   */
  const urlServices = baseUrl + 'services/';
  const urlTypesOfService = baseUrl + 'typesofservice/';
  // Pathname pour la redirection de page
  const pathnameChooseService = '/components/gestion_admin/gestion_services/form_services_modify';
  const pathnameAdd = "/components/gestion_admin/gestion_services/form_typesofservice";


  /**
   * @memberof 'services.js'
   * @constant {Array} lstServices Array that contains all the services
   * @default {Array} lstServices []
  */ 

  /**
   * @memberof 'services.js'
   * @constant {Array} lstTypesOfService Array that contains all the types of service
   * @default {Array} lstTypesOfService []
   */
  const [lstServices, setLstServices] = useState([]);
  const [lstTypesOfService, setLstTypesOfService] = useState([]);

  /**
   * @memberof 'services.js'
   * @constant {object} router The router object to redirect to another page after the service selection. It is from the Next.js library
   * @see {@link 'header.js'.router}
   */
  const router = useRouter();

  /**
   * @memberof 'services.js'
   * @constant {String} buttonModify ClassName of the button to modify a service
   */
  /**
   * @memberof 'services.js'
   * @constant {String} modificationMode Mode of the modification Text shown in the navbar
    */
  /**
   * @memberof 'services.js'
   * @constant {String} buttonDelete ClassName of the button to delete a service
    */
  /**
   * @memberof 'services.js'
   * @constant {String} modeModify Mode the page is in
    */
  /**
   * @memberof 'services.js'
   * @constant {String} btnChooseService ClassName of the button to choose a service

   */
  const [buttonModify, setButtonModify] = useState(
    "btn btn-outline-primary"
  );
  // const [modificationMode, setModificationMode] = useState(
  //   ""
  // );
  const [buttonDelete, setButtonDelete] = useState(
    "btn btn-outline-danger"
  );
  const [modeModify, setModeModify] = useState('');
  const [btnChooseService, setBtnChooseService] = useState(
    "btn btn-dark"
  );


  /**
   * @memberof 'services.js'
   * @function handleClickModify
   * @description Function that changes the mode of the page to modify a service. When the user clicks on the button to modify a service, the mode of the page changes to 'modify' or '' if the mode was already 'modify'
   *
   */
  const handleClickModify = () => {
    if (modeModify !== 'modify') {
      setModeModify(() => 'modify');
    } else {
      setModeModify(() => '');
    }
  };

  /**
   * @memberof 'services.js'
   * @function handleClickDelete
   * @description Function that changes the mode of the page to delete a service. When the user clicks on the button to delete a service, the mode of the page changes to 'delete' or '' if the mode was already 'delete'
   *
   */
  const handleClickDelete = () => {
    if (modeModify !== 'delete') {
      setModeModify(() => 'delete');
    } else {
      setModeModify(() => '');
    }
  };

  //partie de la modal
  /**
   * @memberof 'services.js'
   * @constant {Boolean} show Boolean that indicates if the modal is shown or not
   * @default {Boolean} show false
   */
  const [show, setShow] = useState(false);

  /**
   * @memberof 'services.js'
   * @function handleClose
   * @description Function that closes the modal by setting the boolean show to false
   */
  const handleClose = () => setShow(false);
  /**
   * @memberof 'services.js'
   * @function handleShow 
   * @description Function that shows the modal by setting the boolean show to true
   *
   */
  const handleShow = () => setShow(true);

  /**
   * @memberof 'service.js'
   * @constant {Srting} the text that is shown in the modal, type of service or service
   */
  const [modalText, setModalText] = useState("")

  /**
   * @memberof 'services.js'
   * @param {String} newName Name of the service that has been deleted
   * @function deleteMessage
   * @description Function that shows a notification when a service has been deleted. sets the notification to visible and changes the text of the notification to the name of the service that has been to be deleted. it hides the notification after 3 seconds
   */
  const deleteMessage = (newName) => {

    document.getElementById("notification_delete").removeAttribute("hidden");
    const serviceError = document.getElementById("service_error");
    serviceError.textContent = newName;
    //après 3 secondes, on cache la notification
    setTimeout(function () {
      if (document.getElementById("notification_delete") != null) {
        document.getElementById("notification_delete").setAttribute("hidden", "hidden");
      }
    }, 5000);

  };

  /**
   * @memberof 'services.js'
   * @constant {String} deleteType Define wether the user wants to delete a service or a type of service
   * @default {String} deleteType ""
   */
  const [deleteType, setDeleteType] = useState("");

  /**
   * @memberof 'serivces.js'
   * @constant {Boolean} tosHidden define the state of the deletion button, hidden or not
   * @default true
   */
  const [tosHidden, setTosHidden] = useState(true);

  /**
   * @memberof 'services.js'
   * @function handleConfirmDelete
   * @description Function that deletes a service, used in the modal. deletes the service from the database and from the list of services
   * @see {@link 'services.js'.handleClose}
   * @see {@link 'services.js'.deleteMessage}
   * @see {@link 'services.js'.lstServices}
   * @see {@link 'services.js'.urlServices}
   * @see {@link 'services.js'.infoModify}
   *
   */
  const handleConfirmDelete = () => {
    console.log("delete type: ", deleteType);
    console.log("tos", infoTypeOfService);
    handleClose();

    let s = infoModify.service;
    let t = infoTypeOfService
    const cookies = parseCookies();

    if (deleteType === "serv") {
      lstServices.splice(lstServices.indexOf(s), 1);
      axios.delete(urlServices + s.id + '/', {
        headers: {
          Authorization: 'Token ' + cookies.csrftoken,
        },
      })
        .then((response) => {
          console.log(response.data);
          deleteMessage(s.name);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (deleteType === "tos") {
      lstTypesOfService.splice(lstTypesOfService.indexOf(t), 1);
      axios.delete(urlTypesOfService + infoTypeOfService.id + "/", {
        headers: {
          Authorization: 'Token ' + cookies.csrftoken,
        }
      }).then((response) => {
        console.log(response);
        fetchTypeOfService();
        deleteMessage(t.name);
      })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /**
   * @memberof 'services.js'
   * @constant {object} infoModify Object that contains the service and the type of service that are being modified or deleted
   * @default {object} infoModify {service: {}, typeOfService: {}}
   */
  const [infoModify, setInfoModify] = useState({
    service: {},
    typeOfService: {},
  });
  /**
   * @memberof 'services.js'
   * @constant {object} infoTypeOfService Object that contains the type of serivce that is deleted
   * @default {}
   */
  const [infoTypeOfService, setInfoTypeOfService] = useState({});

  /**
   * @memberof 'services.js'
   * @function fetchTypeOfService
   * @description Function that fetches the types of service from the database. fetches the types of service from the database and sets the list of types of service to the response of the request
   * @see {@link 'services.js'.urlTypesOfService}
   * @see {@link 'services.js'.setLstTypesOfService}
   * @see {@link 'header.js'.cookies}
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
        setLstTypesOfService(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  /**
   * @memberof 'services.js'
   * @function fetchServices
   * @description Function to fetch the services from the API
   * @see {@link 'header.js'.cookies}
   * @see {@link 'gestion_encaissement.js'.fetchServices}
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
   * @memberof 'services.js'
   * @function handleChooseService
   * @description Function that handle the choice of a service to be modified or deleted. if the mode is 'modify', the user is redirected to the page to modify the service, if the mode is 'delete', the modal is shown.
   * @param {object} service JSON object that contains the service to be modified or deleted
   * @param {object} typeOfService JSON object that contains the type of service to be modified or deleted
   * @see {@link 'services.js'.infoModify}
   * @see {@link 'services.js'.handleShow}
   * @see {@link 'services.js'.pathnameChooseService}
   * @see {@link 'services.js'.router}
   */
  const handleChooseService = (service, typeOfService) => {
    setDeleteType("serv");
    setModalText("service");
    setInfoModify({ service: service, typeOfService: typeOfService });
    if (modeModify === 'modify') {
      router.push({
        pathname: pathnameChooseService,
        query: { typeOfService: JSON.stringify(typeOfService), service: JSON.stringify(service) },
      })
    } else if (modeModify === 'delete') {
      handleShow();
    }
  };

  /**
   * @memberof 'services.js'
   * @param typeOfService
   * @function handleDeleteTypeOfService
   * @description function that deletes a type of service. when the type of service is deleted, the page is refreshed
   * @see {@link 'services.js'.fetchTypeOfService}
   * return {void}
   */
  const handleDeleteTypeOfService = (typeOfService) => {
    setDeleteType("tos");
    setModalText("type de service");
    setInfoTypeOfService(typeOfService);
    if (modeModify === 'delete') {
      handleShow();
    }
  }

  // Function to format the duration
  /**
   * @memberof 'services.js'
   * @function formatDuration 
   * @description Function that formats the duration of the service
   * @param {Integer} duration duration of the service
   * @see {@link 'creation_encaissement.js'.formatDuration}
   * @returns {Integer} duration of the service in minutes
   */
  const formatDuration = (duration) => {
    const hours = duration.split(":")[0] * 60;
    const minutes = duration.split(":")[1];
    return parseInt(hours) + parseInt(minutes);
  };
  // Function to get price without cents
  /**
   * @memberof 'services.js'
   * @function priceWithoutCent
   * @description Function that gets the price of the service without cents
   * @param {Float} price price of the service
   * @see {@link 'creation_encaissement.js'.priceWithoutCent}
   * @returns {string} price of the service without cents
   */
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

  // // Setting number of columns for services
  // /**
  //  * @memberof 'services.js'
  //  * @see {@link 'creation_encaissement.js'.numCols}
  //  */
  // const numCols = lstTypesOfService ? Math.floor(12 / lstTypesOfService.length) : 4;

  /**
   * 
   * @param {object} lstTypeOfService a list of types of services
   * @description this function returns the minimum price for a type of service
   * @memberof 'services.js'
   * @function minPriceForATypeOfService
   * @returns {object} the minimum price for a type of service
   * @see {@link 'creation_encaissement.js'.minPriceForATypeOfService}
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
   * @memberof 'services.js'
   * @param {Array} lstServices list of services
   * @function useEffect
   * @description function that refreshes the page when the list of services is updated
   */
  useEffect(() => {
    console.log("refresh");
  }, [lstServices, lstTypesOfService]);


  /**
   * @memberof 'services.js'
   * @function useEffect
   * @description function that fetches the services and the types of service when the page is loaded
   * @see {@link 'services.js'.fetchServices}
   * @see {@link 'services.js'.fetchTypeOfService}
   */
  useEffect(() => {
    fetchServices();
    fetchTypeOfService();
  }, []);


  /**
   * @memberof 'services.js'
   * @param {String} modeModify mode of modification
   * @function useEffect
   * @description function that changes the mode of modification and the buttons when the mode of modification is changed. if the mode is 'modify', the button 'modify' is blue and the button 'delete' is red, if the mode is 'delete', the button 'modify' is white and the button 'delete' is red
   * @see {@link 'services.js'.buttonModify}
   * @see {@link 'services.js'.buttonDelete}
   * @see {@link 'services.js'.btnChooseService}
   * @see {@link 'services.js'.modificationMode}
   * @see {@link 'services.js'.modeModify}
   */
  useEffect(() => {
    if (modeModify === 'delete') {
      //changer le bouton
      setButtonDelete(() => "btn btn-danger");
      setButtonModify(() => "btn btn-outline-primary");
      setBtnChooseService(() => "btn btn-danger");
      setTosHidden(false);
      // //changer la navbar
      // setModificationMode(() => "MODE SUPPRESSION");
    } else if (modeModify === 'modify') {
      setTosHidden(true);
      //changer le bouton
      setButtonModify(() => "btn btn-primary");
      setButtonDelete(() => "btn btn-outline-danger");
      setBtnChooseService(() => "btn btn-primary");
      // //changer la navbar
      // setModificationMode(() => "MODE MODIFICATION");
    } else if (modeModify === '') {
      setTosHidden(true);
      // setModificationMode(() => "");
      setButtonModify(() => "btn btn-outline-primary");
      setButtonDelete(() => "btn btn-outline-danger");
      setBtnChooseService(() => "btn btn-dark");
    }
  }, [modeModify]);

  return (
    <>
      {/* Modal pour la suppression */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} transparent="true">
        <Modal.Header closeButton>
          <Modal.Title>SUPPRESSION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous vraiment supprimer ce {modalText} ?
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

      {/* Notification de suppression */}
      <div id="notification_delete" className="alert alert-warning" role="alert" hidden>
        <h4 className="alert-heading">{modalText} supprimé</h4>
        <p>Le {modalText} " <a id='service_error'> </a> " a été supprimé</p>
      </div>

      <div className="container pt-5">
        <div className="container py-5">
          <div className="row justify-content-center text-center align-items-center">
            <div className="col-lg-15"> {/* Remplacez ceci par la taille de colonne que vous préférez */}
              <div className="card border-0 shadow-lg mb-3 d-flex flex-column rounded p-3 bg-light shadow-sm">
                <div className="card-body text-center align-items-center">
                  <h1 className="card-title text-center">Gestion des services</h1>
                  <div className="btn-group mx-auto my-auto" >
                    <button type="button" className={`${buttonDelete} mb-2 mb-md-0 me-1`} style={{ marginLeft: "10px" }} onClick={handleClickDelete}>Supprimer</button>
                    <button type="button" className={`${buttonModify} mb-2 mb-md-0 me-1`} onClick={handleClickModify}>Modifier</button>
                    <button type="button" className="btn btn-primary mb-2 mb-md-0">
                      <Link href={pathnameAdd} className="nav-link">
                        Ajouter
                      </Link>
                    </button>
                  </div>

                  {/* Tableau des services */}
                  <div className="container pt-5"> {/* Container for the services */}
                    <div className="row mb-5 justify-content-center text-center align-items-start">
                      {lstTypesOfService && // Check if types of service have been fetched before rendering the services
                        lstTypesOfService.map((typeOfService) => (
                          <div className={'col-md-6 col-lg-3'} key={typeOfService.id}> {/* Create a column for each service */}
                            <Card className="mb-4 position-relative"> {/* Create a card to display each type of service */}
                              <Button hidden={tosHidden} variant="danger" className="position-absolute top-0 end-0 m-2" onClick={() => handleDeleteTypeOfService(typeOfService)}>
                                X
                              </Button>
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
                                            id='btnChooseService'
                                            className={btnChooseService}
                                            onClick={() => handleChooseService(service, typeOfService)}
                                            disabled={modeModify === ''}
                                          >
                                            {modeModify === 'delete' ? 'Supprimer' : modeModify === 'modify' ? 'Modifier' : 'Choisir'}
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
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}