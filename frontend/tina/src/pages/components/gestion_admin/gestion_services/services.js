import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';


export default function Services() {
  const [lstServices, setLstServices] = useState([]);
  const [lstTypesOfService, setLstTypesOfService] = useState([]);
  const [buttonModify, setButtonModify] = useState(
    "btn btn-outline-dark"
  );
  const [modificationMode, setModificationMode] = useState(
    ""
  );
  const [mode, setMode] = useState(true);

  const router = useRouter();



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

  const handleClickModify = (evt) => {
    console.log("Mode Modification");
    setMode(mode => !mode);
  };

  const handleChooseService = (service, typeOfService) => {
    console.log("Service choisi", service, typeOfService, mode);
    router.push({
      pathname: '/components/gestion_admin/gestion_services/form_services',
      query: { typeOfService: JSON.stringify(typeOfService), service: JSON.stringify(service), mode: mode },
    })
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
    return price.split(".")[0];
  }
  // Setting number of columns for services
  const numCols = lstTypesOfService ? Math.floor(12 / lstTypesOfService.length) : 4;
  // Function to get the minimum price for a type of service
  const minPriceForATypeOfService = (lstTypeOfService) => {
    return priceWithoutCent
      (lstServices
        .filter((service) => service.type_of_service === lstTypeOfService.id)
        .sort((a, b) => a.price - b.price)[0].price);
  }

  useEffect(() => {
    fetchServices();
    fetchTypeOfService();
    if (mode) {
      //changer le bouton
      setButtonModify(buttonModify => "btn btn-outline-dark");
      //changer la navbar
      setModificationMode(modificationMode => "");
    } else {
      //changer le bouton
      setButtonModify(buttonModify => "btn btn-dark");
      //changer la navbar
      setModificationMode(modificationMode => "MODE MODIFICATION");
    }

  }, [mode]);

  return (
    <>
      {/* Nav Bar pour les services */}
      <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
        <ul></ul>
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
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0"></ul>
              <button type="button" class={buttonModify} onClick={handleClickModify}>Modifier</button>
              <button type="button" class="btn btn-primary ms-lg-2">
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
                                  variant="primary"
                                  style={{
                                    background: "#232627",
                                    alignSelf: "flex-end",
                                    borderColor: "#232627",
                                    transition: "all 0.2s ease-in-out",
                                  }}
                                  onClick={() => handleChooseService(service, typeOfService)}
                                  onMouseOver={(e) => (e.target.style.background = "#383a3d")}
                                  onMouseOut={(e) => (e.target.style.background = "#232627")}
                                  disabled={mode}
                                >
                                  Choisir
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

        {/* Pagination */}

        {/* <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav> */}

      </div>
    </>
  );
}