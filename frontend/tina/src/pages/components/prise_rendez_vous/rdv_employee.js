import { useEffect, useState, useRef } from "react";
import Header from "../header";
import { parseCookies } from "nookies";
import axios from "axios";
import Router from "next/router";
import { useRouter } from "next/router";
import Footer from "../footer";
import Head from "next/head";

/**
 * @namespace 'Rdv_employee.js'
 * @description Page to select an employee for the appointment
 * @returns {JSX.Element}
 */
export default function Rdv_employee() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  /**
   * @memberof 'Rdv_employee.js'
   * @constant urlEmployees
   * @description URL of the API to fetch the list of employees
   */
  const urlEmployees = baseUrl + "employees/"

  /**
   * @memberof 'Rdv_employee.js'
   * @constant urlNextPage
   * @description URL of the next page to redirect to
   */
  const urlNextPage = "/components/prise_rendez_vous/calendrier"

  /**
   * @memberof 'Rdv_employee.js'
   * @constant router
   * @see {@link 'header.js'.router}
   */
  const router = useRouter();
  /**
   * @memberof 'Rdv_employee.js'
   * @constant service_json
   * @description Service selected by the user, passed as a query parameter
   */
  const service_json = router.query;
  /**
   * @memberof 'Rdv_employee.js'
   * @constant lstEmployee
   * @description List of employees fetched from the API
   * @see {@link 'Rdv_employee.js'.fetchEmployee}
   * @default []
   */
  const [lstEmployee, setLstEmployee] = useState([]);
  /**
   * @memberof 'Rdv_employee.js'
   * @constant lstCompEmployee
   * @description List of employees to be displayed
   * @see {@link 'Rdv_employee.js'.loadEmployee}
   * @default []
   */
  let lstCompEmployee = [];
 

  /**
   * @memberof 'Rdv_employee.js'
   * @function fetchEmployee
   * @description Fetch the list of employees from the API
   */
  const fetchEmployee = () => {
    const cookies = parseCookies();
    axios
      .get(urlEmployees, {
        headers: {
          Authorization: "Token " + cookies.csrftoken,
        },
      })
      .then((response) => {
        setLstEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnClick = (e) => {
    router.push({
      pathname: urlNextPage,
      query: { employee: JSON.stringify(e), service: service_json.service },
    });
  };

  const loadEmployee = () => {
    lstEmployee.map((e) => {
      lstCompEmployee.push(
        <div key={e.id} className="col-lg-3 col-md-6 col-sm-12">
          <br></br>
          <div className="card">
            <div className="card-body justify-content-center">
              <ul></ul>
              <h5 className="card-title text-center font-weight-bold">
                {e.first_name} {e.last_name}
              </h5>
              <br></br>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-id={"btn " + e.id}
                  style={{ backgroundColor: "#232627", border: "none" }}
                  onClick={() => handleOnClick(e)}
                >
                  Choisir
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return lstCompEmployee;
  };

  /**
   * @memberof 'Rdv_employee.js'
   * @function useEffect
   * @description on page load, fetch the list of employees, if the router is ready
   */
  useEffect(() => {
    if (!router.isReady) { return; }
    fetchEmployee();

  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Tina - Prise de rendez-vous</title>
        <meta name="description" content="Page de prise de rendez-vous de l'application Tina" />
      </Head>
      <Header />
      <br></br>

      <div>
        <main>
          <div className="container">
            <h2>Sélectionnez un coiffeur :</h2>
            <div className="row">{loadEmployee()}</div>
          </div>
        </main>
      </div>

      <Footer />

    </>
  );
}
