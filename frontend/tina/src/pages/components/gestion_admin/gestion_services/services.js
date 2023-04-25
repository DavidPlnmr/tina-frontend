import { useEffect, useState } from 'react';
import Header from '../../header';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';


export default function Services() {
  const [lstServices, setLstServices] = useState([]);
  const [lstTypesOfService, setLstTypesOfService] = useState([]);

  const fetchTypeOfService = () => {
        const cookies = parseCookies();
        axios.get('http://127.0.0.1:8000/api/typesofservice/', {
            headers: {
                Authorization: 'Token '  + cookies.csrftoken,
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
              Authorization: 'Token '  + cookies.csrftoken,
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
  const loadComponents = () => {
    let lstComponents = [];
    lstServices.map((s) => {
      lstComponents.push(      
        <div class="row">
          <p>{s.name}</p>
          <p>{s.description}</p>
          <p>{s.price}</p>
          <p>{s.duration}</p>
          <p>{s.type_of_service}</p>
        </div>
      );
    });
    return lstComponents;
  };

  useEffect(() => {
    fetchServices();
    fetchTypeOfService();

  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
        <ul></ul>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor:"#b8aaa0"}}>
          <div class="container-fluid" style={{ height: "8vh", width:"100vh", backgroundColor: "#FFFFFF" }}>
              <a class="navbar-brand" href="#">Gestion des services</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              <button type="button" class="btn btn-outline-dark">Options</button>
              <ul class="navbar-nav me-2 mb-2 mb-lg-0">
              </ul>
              <button type="button" class="btn btn-outline-dark">Modifier</button>
              <ul class="navbar-nav me-2 mb-2 mb-lg-0">
              </ul>
              <button type="button" class="btn btn-primary">
                <Link href="/components/gestion_admin/gestion_services/form_typesofservice" class="nav-link">
                  Ajouter
                </Link>
              </button>
                
            </div>
          </div>
        </nav>

        <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
          <div class="container">


            {/* partie à remplacer par le loop de services */}
            {loadComponents()}

            <div class="row">
              <div class="col-lg-8 col-md-10 col-sm-12">
                <br></br>
                <div class="card">
                  <div class="card-body justify-content-center">
                    <ul></ul>
                    <h5 class="card-title text-center font-weight-bold">Demander à Milaz le code</h5>
                    <br></br>
                    <div class="text-center">
                      <button 
                        type="button" 
                        class="btn btn-primary"
                        data-id={"btn "}        
                        onClick={() => console.log("bouton service clic")}>
                        Choisir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>





          </div>
        </div>

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>

      </div>
    </>
  );
}