import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';


export default function Services() {
  const [lstServices, setLstServices] = useState([]);
  const [lstTypesOfService, setLstTypesOfService] = useState([]);
  const router = useRouter();

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

  //partie de la modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const errorMessage = (newName) => {
    document.getElementById("notification_delete").removeAttribute("hidden");
    const serviceError = document.getElementById("service_error");
    serviceError.textContent = newName;
    //après 3 secondes, on cache la notification
    setTimeout(function () {
      document.getElementById("notification_delete").setAttribute("hidden", "hidden");
    }, 3000);

  };

  const handleConfirmDelete = () => {
    handleClose();
    let s = infoModify.service;
    lstServices.splice(lstServices.indexOf(s), 1);
    const cookies = parseCookies();
    axios.delete('http://127.0.0.1:8000/api/services/'+s.id+'/', {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
        })
            .then((response) => {
                console.log(response.data);
                errorMessage(s.name);
            })
            .catch((error) => {
                console.log(error);
            });
  };

  const [infoModify, setInfoModify] = useState({
    service: {},
    typeOfService: {},
  });//[service, typeOfService]

  const fetchTypeOfService = () => {
    const cookies = parseCookies();
    axios.get('http://127.0.0.1:8000/api/typesofservice/', {
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

  const fetchServices = () => {
    const cookies = parseCookies();
    axios.get('http://127.0.0.1:8000/api/services/', {
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

  const handleChooseService = (service, typeOfService) => {
    setInfoModify({ service: service, typeOfService: typeOfService });
    if (modeModify === 'modify') {
      console.log("Modification du service " + service.name);
      router.push({
        pathname: '/components/gestion_admin/gestion_services/form_services_modify',
        query: { typeOfService: JSON.stringify(typeOfService), service: JSON.stringify(service) },
      })
    } else if (modeModify === 'delete') {
      handleShow();
    }
  };

  //Partie du code de milaz

  // Function to format the duration
  const formatDuration = (duration) => {
    const hours = duration.split(":")[0] * 60;
    const minutes = duration.split(":")[1];
    return parseInt(hours) + parseInt(minutes);
  };
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

  // Setting number of columns for services
  const numCols = lstTypesOfService ? Math.floor(12 / lstTypesOfService.length) : 4;
  // Function to get the minimum price for a type of service
  const minPriceForATypeOfService = (lstTypeOfService) => {
    let val = 0;
    val = priceWithoutCent(lstServices
      .filter((service) => service.type_of_service === lstTypeOfService.id)
      .sort((a, b) => a.price - b.price)[0]?.price || 0)
    return val;
  }

  useEffect(() => {
    console.log("refresh");
  }, [lstServices]);

  useEffect(() => {
    fetchServices();
    fetchTypeOfService();
  }, []);

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
      <div className="d-flex flex-column justify-content-start align-items-center" style={{ backgroundColor: "#b8aaa0" }}>
        <ul></ul>

        {/* Notification de suppression */}
      <div id="notification_delete" className="alert alert-warning" role="alert" hidden>
        <h4 className="alert-heading">Service supprimé</h4>
        <p>Le service " <a id='service_error'> </a> " a été supprimé</p>

      </div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#b8aaa0" }}>
          <div class="container-fluid text-center rounded" style={{ height: "8vh", width: "100vh", backgroundColor: "#FFFFFF" }}>
            <div class="collapse navbar-collapse" id="text">
              <a class="navbar-brand">Gestion des services</a>
              <ul class="navbar-nav ms-auto mb-5 ms-lg-3"></ul>
              <i class="navbar-text">
                {modificationMode}
              </i>
            </div>
            <div class="collapse navbar-collapse" id="buttons">
              <ul class="navbar-nav ms-auto"></ul>
              <button type="button" class={buttonDelete} onClick={handleClickDelete}>Supprimer</button>
              <ul class="navbar-nav ms-1"></ul>
              <button type="button" class={buttonModify} onClick={handleClickModify}>Modifier</button>
              <ul class="navbar-nav ms-1"></ul>
              <button type="button" class="btn btn-primary">
                <Link href="/components/gestion_admin/gestion_services/form_typesofservice" class="nav-link">
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