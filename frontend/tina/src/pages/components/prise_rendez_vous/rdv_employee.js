import { useEffect, useState } from "react";
import Header from "../header";
import { parseCookies } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../footer";
import Head from "next/head";
import {Button, Card, Container, Row} from "react-bootstrap";
import { FaUserAlt } from 'react-icons/fa';

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


    /**
     * @memberof 'Rdv_employee.js'
     * @function useEffect
     * @description on page load, fetch the list of employees, if the router is ready
     */
    useEffect(() => {
        if (!router.isReady) { return; }
        fetchEmployee();

    }, [router.isReady]);

    /**
     * @memberof 'Rdv_employee.js'
     * @function loadEmployee
     * @description Load the list of employees to be displayed
     * @see {@link 'Rdv_employee.js'.lstEmployee}
     * @see {@link 'Rdv_employee.js'.handleOnClick}
     * @return {JSX.Element}
     */
    const loadEmployee = () => {
        return lstEmployee.map((e) => (
            <div key={e.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <Card className="h-100 shadow bg-white rounded">
                    <Card.Body className="d-flex flex-column align-items-center text-center">
                        <div className="d-flex mb-2 justify-content-center">
                            <FaUserAlt size={70} className="align-self-center text-primary mt-3"/>
                        </div>
                        <Card.Title className="mb-2 text-dark">
                            {e.first_name} {e.last_name}
                        </Card.Title>
                        <Button variant="dark" className="mt-auto font-weight-bold w-75 align-self-center" data-id={"btn " + e.id} onClick={() => handleOnClick(e)}>
                            Choisir
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        ));
    };

    return (
        <>
            <Head>
                <title>Tina - Prise de rendez-vous</title>
                <meta name="description" content="Page de prise de rendez-vous de l'application Tina" />
            </Head>
            <Header />
            <main className="my-5">
                <Container>
                    <div className="text-center mb-5">
                        <h4 className="display-4 fw-bold">Sélectionnez un coiffeur</h4>
                        <hr className="border-top border-dark w-25 mx-auto my-4"/>
                    </div>
                    <Row>{loadEmployee()}</Row>
                </Container>
            </main>
            <Footer />
        </>
    );
}
