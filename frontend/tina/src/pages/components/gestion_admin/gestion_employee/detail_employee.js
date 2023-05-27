import { useEffect, useState } from "react";
import Header from "../../header";
import { useRouter, Router } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import Footer from "../../footer";

/**
 * @namespace 'recap_rdv.js'
 * @description This component provides the functionality to display the appointment's recap. This component sends the appointment's data to the database.
 * @returns {JSX.Element} A React functional component rendering the appointment's recap.
 */
export default function DetailEmployee() {

  /**
   * @constant coiffeurs
   * @memberof 'recap_rdv.js'
   * @description An object of employees.
   * @default {}
   */ 
  const [coiffeurs, setCoiffeurs] = useState({});

  /**
   * @constant router
   * @memberof 'recap_rdv.js'
   * @see {@link 'header.js'.router}
   */
  const router = useRouter();

  /**
   * @constant param
   * @memberof 'recap_rdv.js'
   * @see {@link 'calendrier_utilisateur.js'.param}
   */ 
  const param = router.query;

  /**
   * @constant cookies
   * @memberof 'recap_rdv.js'
   * @see {@link 'header.js'.cookies}
   */ 
  const cookies = parseCookies();

  useEffect(() => {
    if (!router.isReady) return;
    setCoiffeurs(JSON.parse(param.employee));
    localStorage.setItem("employee", JSON.stringify(coiffeurs));
  }, [router.isReady]);

  const handleDelete = () => {
    console.log(coiffeurs.id);
    if (confirm("Voulez-vous vraiment supprimer cet employé ?")) {
    axios.delete("http://127.0.0.1:8000/api/employees/" + coiffeurs.id + "/", {
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
}

const handleUpdate = () => {
  router.push({
    pathname: "./modif_employee_admin",
    query: { employee: JSON.stringify(coiffeurs)},
  });
}

  return (
    <>
      <Header />
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
              onClick={handleDelete}
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
