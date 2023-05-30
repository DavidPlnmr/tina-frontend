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


export default function AjoutMultipleDispo() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [dispo, setDispo] = useState({start_date: "", end_date: "", disponibilities: {}});


  const [disponibilities, setDisponibilities] = useState({start_hour: "", end_hour: ""});

  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("1");

  const [days, setDays] = useState("monday");

  const [listDispo, setListDispo] = useState([]);

  const router = useRouter();
  useRef(false);
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


  useEffect(() => {
    fetchEmployees();
  } , []);

  const handleChangeDispo = (evt) => {
    setDispo({ ...dispo, [evt.target.dataset.id]: evt.target.value});
  }

  const cookies = parseCookies();

  const handleChange = (evt) => {

    setDisponibilities({ ...disponibilities, [evt.target.dataset.id]: evt.target.value});
    console.log(disponibilities);
  }

  const handleChangeEmployee = (evt) => {
    setEmployee(evt.target.value);
  }


  const handleChangeDays = (evt) => {
    console.log(evt.target.value);
    setDays(evt.target.value);
  }

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
          <meta charSet="utf-8" />
          <title>Tina Coiffure - Ajout de multiples disponibilités ou vacances</title>
        </Head>
        <Header />
        <main>
          <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <Card className="shadow-lg p-3 bg-body rounded mt-n5">
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
                        <Link href='../gestion_employee/ajout_dispo' className="nav-link text-center mt-3">Vous voulez en ajouter un seul ? cliquez ici !</Link>
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