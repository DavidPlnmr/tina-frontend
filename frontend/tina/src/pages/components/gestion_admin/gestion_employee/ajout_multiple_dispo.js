import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from "next/head";
import Header from "@/pages/components/header";
import Footer from "@/pages/components/footer";

/**
 * @namespace 'ajout_multiple_dispo.js'
 * @description this component manage the disponibilities of the employee
 * @returns {JSX.Element} The JSX code for the user profile component.
 */
export default function AjoutMultipleDispo() {

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @constant {String} baseUrl
   * @description variable to store the base of the url of the API
   * @default process.env.NEXT_PUBLIC_BASE_URL
   */ 
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @constant {String} dispo
   * @description variable to store the disponibility of the employee
   * @default useState
   */ 
  const [dispo, setDispo] = useState({start_date: "", end_date: "", disponibilities: {}});

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @constant {String} disponibilities
   * @description variable to store the disponibilities of the employee
   * @default useState
   */
  const [disponibilities, setDisponibilities] = useState({start_hour: "", end_hour: ""});

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @constant {String} employees
   * @description variable to store the list of employees
   * @default useState
   */ 
  const [employees, setEmployees] = useState([]);

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @constant {String} employee
   * @description variable to store the employee
   * @default useState
   */ 
  const [employee, setEmployee] = useState("1");

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @constant {String} days
   * @description variable to store the days
   * @default useState
   */ 
  const [days, setDays] = useState("monday");

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @constant {String} listDispo
   * @description variable to store the list of disponibilities
   * @default useState
   */
  const [listDispo, setListDispo] = useState([]);

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @constant {String} router
   * @description variable to store the router
   * @default useRouter
   */
  const router = useRouter();
  useRef(false);

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @function fetchEmployees
   * @description function to fetch the list of employees
   */
  const fetchEmployees = () => {
    axios.get(baseUrl + 'employees/', {
      headers: {
        Authorization: `Token ` + cookies.csrftoken,
      },
    })
        .then((response) => {
              setEmployees(response.data);
            }
        )
        .catch((error) => {
              console.log(error);
            }
        );
  }

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @function useEffect
   * @description function to fetch the list of employees
   * @param {String} fetchEmployees
   */ 
  useEffect(() => {
    fetchEmployees();
  } , []);

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @function handleChangeDispo
   * @description function to handle the change of disponibilities
   * @param {String} evt
   */ 
  const handleChangeDispo = (evt) => {
    setDispo({ ...dispo, [evt.target.dataset.id]: evt.target.value});
  }

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @constant {String} cookies
   * @description variable to store the cookies
   * @default parseCookies
   */ 
  const cookies = parseCookies();

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @function handleChange
   * @description function to handle the change of disponibilities
   * @param {String} evt
   */ 
  const handleChange = (evt) => {

    setDisponibilities({ ...disponibilities, [evt.target.dataset.id]: evt.target.value});
    console.log(disponibilities);
  }

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @function handleChangeEmployee
   * @description function to handle the change of employee
   * @param {String} evt
   */
  const handleChangeEmployee = (evt) => {
    setEmployee(evt.target.value);
  }

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @function handleChangeDays
   * @description function to handle the change of days
   * @param {String} evt
   */
  const handleChangeDays = (evt) => {
    console.log(evt.target.value);
    setDays(evt.target.value);
  }

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @function handleSubmit
   * @description function to handle the submit of disponibilities
   */ 
  const handleSubmit =  (evt) => {
    evt.preventDefault();
    const myObj = { [days]: disponibilities };
    const newList = [...listDispo, myObj];
    setListDispo(newList);

    if (days !== undefined) {
      setDispo({
        ...dispo,
        disponibilities: {
          ...dispo.disponibilities,
          [days]: disponibilities
        }
      });
    }
  }

  /**
   * @memberof 'ajout_multiple_dispo.js'
   * @function handleSubmitDispo
   * @description function to handle the submit of disponibilities
   */ 
  useEffect(() => {
    if (listDispo.length > 0) {
      const id = employee;
      console.log(id);
      console.log(dispo);
      axios.post(baseUrl + 'employees/' + id +'/disponibilities/bulk', dispo, {
        headers: {
          Authorization: `Token ` + cookies.csrftoken,
        },
      })
          .then((response) => {
                console.log(dispo);

                alert("Disponibilité ou vacance ajoutée ou modifiée avec succès");
                router.push('/');
              }
          )
          .catch((error) => {
                console.log(error);
                alert("Erreur lors de l'ajout de la disponibilité");
              }
          );
    }
  }, [listDispo]);


  return (
      <>
        <Head>
          <meta charSet="utf-8"/>
          <title>Tina - Ajout d'une disponibilité ou de vacances pour un employé</title>
        </Head>
        <Header/>
        <main>
          <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <Card className="shadow-lg p-3 bg-body rounded mt-5">
                    <Card.Body>
                      <h2 className="text-center mb-4">Tina Coiffure</h2>
                      <Card.Title className="text-center mb-4">Ajout de multiples disponibilités ou vacances</Card.Title>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Date de début</Form.Label>
                          <Form.Control data-id="start_date" type="date" value={dispo.start_date} onChange={handleChangeDispo} required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Date de fin</Form.Label>
                          <Form.Control data-id="end_date" type="date" value={dispo.end_date} onChange={handleChangeDispo} required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Heure de début</Form.Label>
                          <Form.Control data-id="start_hour" type="time" value={disponibilities.start_hour} onChange={handleChange} required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Heure de fin</Form.Label>
                          <Form.Control data-id="end_hour" type="time" value={disponibilities.end_hour} onChange={handleChange} required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Employé</Form.Label>
                          <Form.Select data-id="employee" onChange={handleChangeEmployee} required>
                            {employees.map((employee) => (
                                <option value={employee.id}>{employee.first_name} {employee.last_name} {"(" + employee.username + ")"}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Jours</Form.Label>
                          <Form.Select data-id="days" onChange={handleChangeDays} required>
                            <option value="monday">Lundi</option>
                            <option value="tuesday">Mardi</option>
                            <option value="wednesday">Mercredi</option>
                            <option value="thursday">Jeudi</option>
                            <option value="friday">Vendredi</option>
                            <option value="saturday">Samedi</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Qu'êtes vous en train d'ajouter ?</Form.Label>
                          <Form.Check type='radio' data-id="vacation" name="vacation" label="Vacances" value={1} onChange={handleChange} />
                          <Form.Check type='radio' data-id="vacation" name="vacation" label="Disponibilités" value={0} onChange={handleChange} required/>
                        </Form.Group>

                        <Button variant="primary" className='w-100' onClick={handleSubmit}>
                          Ajouter
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
  );
}