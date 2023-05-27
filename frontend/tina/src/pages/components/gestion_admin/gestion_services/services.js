import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';

/**
 * @namespace 'services.js'
 * @description page that allows the user to see all the services and to modify or delete them
 * @returns {JSX.Element}
 */
export default function Services() {

  // Constantes pour les URL de l'API
  /**
   * @memberof 'services.js'
   * @constant {String} urlServices URL of the API for the services
   * @constant {String} urlTypesOfService URL of the API for the types of service
   * @constant {String} pathnameChooseService Pathname for the redirection of page when the user wants to modify a service
   * @constant {String} pathnameAdd Pathname for the redirection of page when the user wants to add a new service
   */
  const urlServices = 'http://localhost:8000/api/services/';
  const urlTypesOfService = 'http://localhost:8000/api/typesofservice/';
  // Pathname pour la redirection de page
  const pathnameChooseService = '/components/gestion_admin/gestion_services/form_services_modify';
  const pathnameAdd = "/components/gestion_admin/gestion_services/form_typesofservice";


  /**
   * @memberof 'services.js'
   * @constant {Array} lstServices Array that contains all the services
   * @constant {Array} lstTypesOfService Array that contains all the types of service
   * @default {Array} lstServices []
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
   * @constant {String} modificationMode Mode of the modification Text shown in the navbar
   * @constant {String} buttonDelete ClassName of the button to delete a service
   * @constant {String} modeModify Mode the page is in
   * @constant {String} btnChooseService ClassName of the button to choose a service
   * 
   * 
   */
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
  const [btnChooseService, setBtnChooseService] = useState(
    "btn btn-dark"
  );


  /**
   * @memberof 'services.js'
   * @function handleClickModify Function that changes the mode of the page to modify a service
   * @description When the user clicks on the button to modify a service, the mode of the page changes to 'modify' or '' if the mode was already 'modify'
   * 
   */
  const handleClickModify = () => {
    console.log("Mode Modification");
    if (modeModify != 'modify') {
      setModeModify(modeModify => 'modify');
    } else {
      setModeModify(modeModify => '');
    }
  };

  /**
   * @memberof 'services.js'
   * @function handleClickDelete Function that changes the mode of the page to delete a service
   * @description When the user clicks on the button to delete a service, the mode of the page changes to 'delete' or '' if the mode was already 'delete'
   * 
   */
  const handleClickDelete = () => {
    console.log("Mode Suppression");
    if (modeModify != 'delete') {
      setModeModify(modeModify => 'delete');
    } else {
      setModeModify(modeModify => '');
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
   * @function handleClose Function that closes the modal by setting the boolean show to false
   */
  const handleClose = () => setShow(false);
  /**
   * @memberof 'services.js'
   * @function handleShow Function that shows the modal by setting the boolean show to true
   * 
   */
  const handleShow = () => setShow(true);

  /**
   * @memberof 'services.js'
   * @param {String} newName Name of the service that has been deleted
   * @function deleteMessage Function that shows a notification when a service has been deleted
   * @description sets the notification to visible and changes the text of the notification to the name of the service that has been to be deleted. it hides the notification after 3 seconds
   */
  const deleteMessage = (newName) => {
    document.getElementById("notification_delete").removeAttribute("hidden");
    const serviceError = document.getElementById("service_error");
    serviceError.textContent = newName;
    //après 3 secondes, on cache la notification
    setTimeout(function () {
      document.getElementById("notification_delete").setAttribute("hidden", "hidden");
    }, 3000);

  };

  /**
   * @memberof 'services.js'
   * @function handleConfirmDelete Function that deletes a service, used in the modal
   * @description deletes the service from the database and from the list of services
   * @see {@link 'services.js'.handleClose}
   * @see {@link 'services.js'.deleteMessage}
   * @see {@link 'services.js'.lstServices}
   * @see {@link 'services.js'.urlServices}
   * @see {@link 'services.js'.infoModify}
   * 
   */
  const handleConfirmDelete = () => {
    handleClose();
    let s = infoModify.service;
    lstServices.splice(lstServices.indexOf(s), 1);
    const cookies = parseCookies();
    axios.delete(urlServices+s.id+'/', {
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
   * @function fetchTypeOfService Function that fetches the types of service from the database
   * @description fetches the types of service from the database and sets the list of types of service to the response of the request
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
   * @param {String} urlServices the url to fetch the services from the API
   * @function fetchServices Function to fetch the services from the API
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
   * @function handleChooseService Function that handle the choice of a service to be modified or deleted
   * @description if the mode is 'modify', the user is redirected to the page to modify the service, if the mode is 'delete', the modal is shown.
   * @param {object} service JSON object that contains the service to be modified or deleted
   * @param {object} typeOfService JSON object that contains the type of service to be modified or deleted
   * @see {@link 'services.js'.infoModify}
   * @see {@link 'services.js'.handleShow}
   * @see {@link 'services.js'.pathnameChooseService}
   * @see {@link 'services.js'.router}
   */
  const handleChooseService = (service, typeOfService) => {
    setInfoModify({ service: service, typeOfService: typeOfService });
    if (modeModify === 'modify') {
      console.log("Modification du service " + service.name);
      router.push({
        pathname: pathnameChooseService,
        query: { typeOfService: JSON.stringify(typeOfService), service: JSON.stringify(service) },
      })
    } else if (modeModify === 'delete') {
      handleShow();
    }
  };

  //Partie du code de milaz

  // Function to format the duration
  /**
   * @memberof 'services.js'
   * @function formatDuration Function that formats the duration of the service
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
   * @function priceWithoutCent Function that gets the price of the service without cents 
   * @param {Float} price price of the service
   * @see {@link 'creation_encaissement.js'.priceWithoutCent}
   * @returns {Integer} price of the service without cents
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

  // Setting number of columns for services
  /**
   * @memberof 'services.js'
   * @see {@link 'creation_encaissement.js'.numCols}
   */
  const numCols = lstTypesOfService ? Math.floor(12 / lstTypesOfService.length) : 4;
  // Function to get the minimum price for a type of service
  /**
   * @memberof 'services.js'
   * @see {@link 'creation_encaissement.js'.minPriceForATypeOfService}
   * @param {Array} lstTypeOfService list of types of service
   * @returns 
   */
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
   * @function useEffect function that refreshes the page when the list of services is updated
   */
  useEffect(() => {
    console.log("refresh");
  }, [lstServices]);


  /**
   * @memberof 'services.js'
   * @function useEffect function that fetches the services and the types of service when the page is loaded
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
   * @function useEffect function that changes the mode of modification and the buttons when the mode of modification is changed
   * @description if the mode is 'modify', the button 'modify' is blue and the button 'delete' is red, if the mode is 'delete', the button 'modify' is white and the button 'delete' is red
   * @see {@link 'services.js'.buttonModify}
   * @see {@link 'services.js'.buttonDelete}
   * @see {@link 'services.js'.btnChooseService}
   * @see {@link 'services.js'.modificationMode}
   * @see {@link 'services.js'.modeModify}
   */
  useEffect(() => {
    if (modeModify === 'delete') {
      //changer le bouton
      setButtonDelete(buttonDelete => "btn btn-danger");
      setButtonModify(buttonModify => "btn btn-outline-primary");
      setBtnChooseService(btnChooseService => "btn btn-danger");
      //changer la navbar
      setModificationMode(modificationMode => "MODE SUPPRESSION");
    } else if (modeModify === 'modify') {
      //changer le bouton
      setButtonModify(buttonModify => "btn btn-primary");
      setButtonDelete(buttonDelete => "btn btn-outline-danger");
      setBtnChooseService(btnChooseService => "btn btn-primary");
      //changer la navbar
      setModificationMode(modificationMode => "MODE MODIFICATION");
    } else if (modeModify === '') {
      setModificationMode(modificationMode => "");
      setButtonModify(buttonModify => "btn btn-outline-primary");
      setButtonDelete(buttonDelete => "btn btn-outline-danger");
      setBtnChooseService(btnChooseService => "btn btn-dark");
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
            Voulez-vous vraiment supprimer ce service ?
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

      
      {/* Nav Bar pour les services */}
      <div className="d-flex flex-column justify-content-start align-items-center">
        <ul></ul>

        {/* Notification de suppression */}
      <div id="notification_delete" className="alert alert-warning" role="alert" hidden>
        <h4 className="alert-heading">Service supprimé</h4>
        <p>Le service " <a id='service_error'> </a> " a été supprimé</p>

      </div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#F6F8F7" }}>
          <div className="container-fluid text-center rounded" style={{ height: "8vh", width: "100vh" }}>
            <div className="collapse navbar-collapse" id="text">
              <a className="navbar-brand">Gestion des services</a>
              <ul className="navbar-nav ms-auto mb-5 ms-lg-3"></ul>
              <i className="navbar-text">
                {modificationMode}
              </i>
            </div>
            <div className="collapse navbar-collapse" id="buttons">
              <ul className="navbar-nav ms-auto"></ul>
              <button type="button" className={buttonDelete} onClick={handleClickDelete}>Supprimer</button>
              <ul className="navbar-nav ms-1"></ul>
              <button type="button" className={buttonModify} onClick={handleClickModify}>Modifier</button>
              <ul className="navbar-nav ms-1"></ul>
              <button type="button" className="btn btn-primary">
                <Link href={pathnameAdd} className="nav-link">
                  Ajouter
                </Link>
              </button>
            </div>
          </div>
        </nav>


        {/* Tableau des services */}
        <div className="container pt-5"> {/* Container for the services */}
          <div className="row">
            {lstTypesOfService && // Check if types of service have been fetched before rendering the services
              lstTypesOfService.map((typeOfService) => (
                <div className={`col-md-${numCols}`} key={typeOfService.id}> {/* Create a column for each service */}
                  <Card className="mb-4"> {/* Create a card to display each type of service */}
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
                                  disabled={modeModify === '' ? true : false}
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
              ))}
          </div>
        </div>
      </div>
    </>
  );
}