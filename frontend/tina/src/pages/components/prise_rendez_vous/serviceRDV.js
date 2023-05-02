import React, { useState, useEffect, useRef } from "react";
import Header from "@/pages/components/header";
import axios from "axios";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { Card, Button } from "react-bootstrap";
import Footer from "@/pages/components/footer";

export default function ServiceRDV() {
  // Defining state variables and a ref variable
  const [typesOfService, setTypesOfService] = useState(null); // To store types of services
  const [services, setServices] = useState(null); // To store services
  const dataFetchedRef = useRef(false); // To check if data is already fetched or not

  // Getting cookies and router
  const cookies = parseCookies();
  const router = useRouter();

  // Function to fetch types of service
  const fetchTypeOfService = () => {
    axios
      .get("http://127.0.0.1:8000/api/typesofservice/", {
        headers: {
          Authorization: "Token " + cookies.csrftoken,
        },
      })
      .then((response) => {
        setTypesOfService(response.data); // Setting types of service in the state variable
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to fetch services
  const fetchServices = () => {
    axios
      .get("http://127.0.0.1:8000/api/services/", {
        headers: {
          Authorization: "Token " + cookies.csrftoken,
        },
      })
      .then((response) => {
        setServices(response.data); // Setting services in the state variable
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to format the duration
  const formatDuration = (duration) => {
    const hours = duration.split(":")[0] * 60;
    const minutes = duration.split(":")[1];
    return parseInt(hours) + parseInt(minutes);
  };

  // Function to get price without cents
  const priceWithoutCent = (price) => {
    return price.split(".")[0];
  };

  // Function to get the minimum price for a type of service
  const minPriceForATypeOfService = (typeOfService) => {
    return priceWithoutCent(
      services
        .filter((service) => service.type_of_service === typeOfService.id)
        .sort((a, b) => a.price - b.price)[0].price
    );
  };

  // Function to handle choosing of a service
  const handleChooseService = (service) => {
    console.log(service);
    router.push({
      pathname: "/components/prise_rendez_vous/rdv_employee",
      query: { service: JSON.stringify(service) },
    });
  };

  // Effect hook to fetch data
  useEffect(() => {
    if (dataFetchedRef.current) return; // Fetch data only once
    dataFetchedRef.current = true;
    fetchTypeOfService();
    fetchServices();
    Promise.all([fetchTypeOfService(), fetchServices()]).then(() => {
      // Fetching types of service and services
      console.log("Data fetched");
    });
  }, []);

  // Setting number of columns for services
  const numCols = typesOfService ? Math.floor(12 / typesOfService.length) : 4;

  // Rendering component
  return (
    <>
      <Header /> {/* Render the Header component */}
      <div className="container pt-5">
        {" "}
        {/* Container for the services */}
        <div className="row">
          {typesOfService && // Check if types of service have been fetched before rendering the services
            typesOfService.map((typeOfService) => (
              <div className={`col-md-${numCols}`} key={typeOfService.id}>
                {" "}
                {/* Create a column for each service */}
                <Card className="mb-4">
                  {" "}
                  {/* Create a card to display each type of service */}
                  <Card.Body>
                    <Card.Title
                      style={{
                        color: "#232627",
                        fontSize: "36px",
                        marginBottom: "22px",
                      }}
                    >
                      {typeOfService.name}
                    </Card.Title>{" "}
                    {/* Display the name of the service type */}
                    <Card.Subtitle
                      className="mb-2"
                      style={{ color: "#F3B10E", fontSize: "28px" }}
                    >
                      À partir de CHF {minPriceForATypeOfService(typeOfService)}
                      .-
                    </Card.Subtitle>{" "}
                    {/* Display the minimum price for each type of service */}
                    <hr />
                    <div>
                      {services &&
                        services
                          .filter(
                            (service) =>
                              service.type_of_service === typeOfService.id
                          ) // Filter services based on their type
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
                                <Card.Text className="mb-1">
                                  {service.name}
                                </Card.Text>{" "}
                                {/* Display the name of the service */}
                                <Card.Text className="mb-2">
                                  {formatDuration(service.duration)} minutes,
                                  CHF {priceWithoutCent(service.price)}.-
                                </Card.Text>{" "}
                                {/* Display the duration and price of the service */}
                              </div>
                              <Button
                                variant="primary"
                                style={{
                                  background: "#232627",
                                  alignSelf: "flex-end",
                                  borderColor: "#232627",
                                  transition: "all 0.2s ease-in-out",
                                }}
                                onClick={() => handleChooseService(service)}
                                onMouseOver={(e) =>
                                  (e.target.style.background = "#383a3d")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.background = "#232627")
                                }
                              >
                                Choisir
                              </Button>{" "}
                              {/* Button to choose a service */}
                            </div>
                          ))}
                    </div>
                  </Card.Body>
                  <Card.Footer
                    className="text-muted"
                    style={{
                      background: "white",
                      alignSelf: "flex-end",
                      border: "none",
                    }}
                  >
                    Étudiant réduc 5.-
                  </Card.Footer>{" "}
                  {/* Footer displaying a discount for students */}
                </Card>
              </div>
            ))}
        </div>
      </div>
      <Footer /> {/* Render the Footer component */}
    </>
  );
}
