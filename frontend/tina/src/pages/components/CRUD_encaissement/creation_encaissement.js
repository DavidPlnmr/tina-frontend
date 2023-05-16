import Header from '../header';
import Footer from '../footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function Creation_encaissement() {

  //Partie pour la redirection de page
  const router = useRouter();
  const handleClick = (service) => {
    router.push({
      pathname: '/components/CRUD_encaissement/encaissement',
      query: { service: JSON.stringify(service) },
    })
  };
  const handleClickEncManuel = (evt) => {
    let encaissement_manuel = {
      id: 0,
      name: "Encaissement manuel",
      duration: "00:00:00",
      price: "00.00",
      price_student: "00.00",
      type_of_service: 0
    };
    router.push({
      pathname: '/components/CRUD_encaissement/encaissement',
      query: { service: JSON.stringify(encaissement_manuel) },
    })
  };

  //Partie pour les services et affichage etc
  const [lstServices, setLstServices] = useState([]);
  const [lstTypesOfService, setLstTypesOfService] = useState([]);
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

  useEffect(() => {
    console.log("refresh");
  }, [lstServices]);

  useEffect(() => {
    fetchServices();
    fetchTypeOfService();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "auto", backgroundColor: "#b8aaa0" }}>
        <ul></ul>

        {/* Sélection de service */}
        {/* Nav Bar pour les services */}
        <div className="d-flex flex-column justify-content-start align-items-center" style={{ backgroundColor: "#b8aaa0" }}>
          <ul></ul>
          <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#b8aaa0" }}>
            <div class="container-fluid text-center rounded" style={{ height: "8vh", width: "100vh", backgroundColor: "#FFFFFF" }}>
              <div class="collapse navbar-collapse" id="text">
                <a class="navbar-brand">Ajout d'un encaissement</a>
                <ul class="navbar-nav ms-auto mb-5 ms-lg-3"></ul>
              </div>
              <div class="collapse navbar-collapse" id="buttons">
                <ul class="navbar-nav ms-auto"></ul>
                <button type="button" className='btn btn-outline-primary' onClick={handleClickEncManuel}>Encaissement manuel</button>
                <ul class="navbar-nav ms-1"></ul>
              </div>
            </div>
          </nav>

          {/* Tableau des services */}
          <div className="container mb-5 pt-5"> {/* Container for the services */}
            <div className="row mb-5">
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
                                    id='btnChooseService' onClick={() => handleClick(service)}>
                                    Choisir
                                    <Link href={`./encaissement/${service.id}`} style={{ color: "white" }}></Link> {/* Button to choose a service */}
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
      <Footer />
    </>
  );
}
