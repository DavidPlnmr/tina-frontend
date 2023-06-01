import { useEffect, useState } from "react";
import Header from "../../header";
import { useRouter, Router } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import Footer from "../../footer";
import { Modal, Button } from "react-bootstrap";

/**
 * @namespace 'detail_employee.js'
 * @description This component provides the functionality to display the details of an employee.
 * @returns {JSX.Element} A React functional component rendering the details of an employee.
 */
export default function DetailEmployee() {

  /**
   * @constant show
   * @memberof 'detail_employee.js'
   * @description A boolean to show or hide the modal.
   */ 
  const [show, setShow] = useState(false);

  /**
   * @constant handleClose
   * @memberof 'detail_employee.js'
   * @description A function to close the modal.
   */ 
  const handleClose = () => setShow(false);

  /**
   * @constant handleShow
   * @memberof 'detail_employee.js'
   * @description A function to show the modal.
   */ 
  const handleShow = () => setShow(true);

  /**
   * @memberof 'detail_employee.js'
   * @constant baseUrl
   * @description A string to store the base of the url of the API.
   */ 
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  /**
   * @constant coiffeurs
   * @memberof 'detail_employee.js'
   * @description An object of employees.
   * @default {}
   */ 
  const [coiffeurs, setCoiffeurs] = useState({});

  /**
   * @constant router
   * @memberof 'detail_employee.js'
   * @see {@link 'header.js'.router}
   */
  const router = useRouter();

  /**
   * @constant param
   * @memberof 'detail_employee.js'
   * @see {@link 'calendrier_utilisateur.js'.param}
   */ 
  const param = router.query;

  /**
   * @constant cookies
   * @memberof 'detail_employee.js'
   * @see {@link 'header.js'.cookies}
   */ 
  const cookies = parseCookies();

  /**
   * @memberof 'detail_employee.js'
   * @function useEffect
   * @description A React hook that is executed when the component is mounted.
   */ 
  useEffect(() => {
    if (!router.isReady) return;
    setCoiffeurs(JSON.parse(param.employee));
    localStorage.setItem("employee", JSON.stringify(coiffeurs));
  }, [router.isReady]);

  /**
   * @memberof 'detail_employee.js'
   * @function handleDelete
   * @description A function to delete an employee.
   */ 
  const handleDelete = () => {
    console.log(coiffeurs.id);
    axios.delete(baseUrl + "employees/" + coiffeurs.id + "/", {
      headers: {
        Authorization: "Token " + cookies.csrftoken,
      },
    })
    .then((response) => {
      console.log(response);
      alert("L'employé a bien été supprimé");
    router.push("./display_employee");
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * @memberof 'detail_employee.js'
 * @function handleUpdate
 * @description A function to update an employee.
 */ 
const handleUpdate = () => {
  router.push({
    pathname: "./modif_employee_admin",
    query: { employee: JSON.stringify(coiffeurs)},
  });
}

  return (
    <>
      <Header />
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} transparent>
                <Modal.Header closeButton>
                    <Modal.Title>SUPPRESSION DE COMPTE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Voulez-vous vraiment supprimer cet employé ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
      <main>
        {coiffeurs && (
      <div className="container" style={{ marginTop: "10%" }}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Détail de l'employé</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nom, Prénom : </b> {coiffeurs.last_name + " " + coiffeurs.first_name}
                </li>
                <li className="list-group-item">
                  <b>Email : </b> {coiffeurs.email}
                </li>
                <li className="list-group-item">
                  <b>Username : </b> {coiffeurs.username}
                </li>
              </ul>
            </div>
          </div> <br />
        <button
              type="button"
              class="btn btn-primary no-border"
              style={{ backgroundColor: "#232627", border: "none" }}
              onClick={handleUpdate}
            >
              Modifier l'employé
            </button> &nbsp;&nbsp;&nbsp; 
            <button
              type="button"
              class="btn btn-primary no-border"
              style={{ backgroundColor: "#DC3545", border: "none" }}
              onClick={handleShow}
            >
              Supprimer l'employé
            </button>
      </div>
        )}
      </main>
      <Footer />
    </>
  );
}
