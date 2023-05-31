import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from "next/head";
import Header from "@/pages/components/header";
import Footer from "@/pages/components/footer";

export default function AjoutDispo() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const [dispo, setDispo] = useState([
        {
            date: "",
            start_hour: "",
            end_hour: "",
            employee: "",
            vacation: ""
        }
    ]);

    const  [employees, setEmployees] = useState([]);
    const router = useRouter();

    const fetchEmployees = () => {
        const cookies = parseCookies();
        axios.get(baseUrl + 'employees/', {
            headers: {
                Authorization: `Token ` + cookies.csrftoken,
            },
        })
            .then((response) => {
                    setEmployees(response.data);
                    if (dispo.employee === undefined){
                        setDispo({ ...dispo, employee: response.data[0].id});
                    }
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

    const handleSubmit =  (evt) => {
        const cookies = parseCookies();

        evt.preventDefault();

        console.log(dispo.employee);

        axios.post(baseUrl + 'employees/' + dispo.employee +'/disponibilities/', dispo, {
            headers: {
                Authorization: `Token ` + cookies.csrftoken,
            },
        })
            .then((response) => {
                console.log(response);
                console.log(response.data);
                if (response.data.vacation === false){
                    alert("Disponibilité ajoutée");
                } else {
                    alert("Vacances ajoutées");
                }
                router.push("/components/gestion_admin/dash_admin");
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const handleChange = (evt) => {
        setDispo({ ...dispo, [evt.target.dataset.id]: evt.target.value});
    };

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
                                <Card className="shadow-lg p-3 bg-body rounded">
                                    <Card.Body>
                                        <h2 className="text-center mb-4">Tina Coiffure</h2>
                                        <Card.Title className="text-center mb-4">Ajout d'une disponibilité ou de vacances pour un employé</Card.Title>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control data-id="date" type="date" value={dispo.date} onChange={handleChange} required/>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Heure de début</Form.Label>
                                                <Form.Control data-id="start_hour" type="time" value={dispo.start_hour} onChange={handleChange} required/>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Heure de fin</Form.Label>
                                                <Form.Control data-id="end_hour" type="time" value={dispo.end_hour} onChange={handleChange} required/>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Employé</Form.Label>
                                                <Form.Select data-id="employee" onChange={handleChange} required>
                                                    {employees.map((employee) => (
                                                        <option value={employee.id}>{employee.first_name} {employee.last_name} {"(" + employee.username + ")"}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Qu'êtes vous en train d'ajouter ?</Form.Label>
                                                <Form.Check type='radio' data-id="vacation" name="vacation" label="Vacances" value={1} onChange={handleChange} />
                                                <Form.Check type='radio' data-id="vacation" name="vacation" label="Disponibilités" value={0} onChange={handleChange} required/>
                                            </Form.Group>

                                            <Button variant="primary" type="submit" className='w-100'>
                                                Ajouter
                                            </Button>
                                            <Link href='./ajout_multiple_dispo' className="nav-link text-center mt-3">Vous voulez en ajouter plusieurs ? cliquez ici !</Link>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}