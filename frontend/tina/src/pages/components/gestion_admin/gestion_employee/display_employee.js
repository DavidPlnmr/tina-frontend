import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Header from '../../header';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Head from "next/head";
import Footer from '../../footer';

/**
 * @namespace 'choix_client.js'
 * @description This component provides the functionality to choose a client from a list.
 * @returns {JSX.Element} A React functional component rendering the client list.
 */
export default function DisplayAndDeleteEmployee() {

    /**
     * @constant clients
     * @memberof 'choix_client.js'
     * @description A list of clients.
     * @default []
     */ 
    const [employees, setEmployees] = useState([]);

    /**
     * @constant filteredClients
     * @memberof 'choix_client.js'
     * @description A list of clients filtered by the search bar.
     * @default []
     */
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    /**
     * @constant cookies
     * @memberof 'choix_client.js'
     * @see {@link 'header.js'.cookies}
     */
    const cookies = parseCookies();

    /**
     * @constant param
     * @memberof 'choix_client.js'
     * @see {@link 'calendrier.js'.param}
     */ 
    const param = useRouter().query;

    /**
     * @constant router
     * @memberof 'choix_client.js'
     * @see {@link 'header.js'.router}
     */
    const router = useRouter();

    /**
     * @function useEffect
     * @memberof 'choix_client.js'
     * @description A React hook that fetches the clients list from the database.
     */
    useEffect(() => {
        fetchCustomers();
        }, []);

    /**
     * @function fetchCustomers
     * @memberof 'choix_client.js'
     * @description Fetches the clients list from the database.
     * @returns {Array} A list of clients.
     */     
    const fetchCustomers = () => {
        axios.get('http://127.0.0.1:8000/api/employees/', {
        headers: {
                Authorization: `Token ` + cookies.csrftoken,
            },
            })
            .then((response) => {
                setEmployees(response.data);
                if (filteredEmployees.length === 0) {
                    console.log("filteredClients is empty");
                    setFilteredEmployees(response.data);
                }
            }
            )
            .catch((error) => {
                console.log(error);
            }
        );
    }

    /**
     * @function handleSearch
     * @memberof 'choix_client.js'
     * @description Filters the clients list by the search bar.
     * @param {Event} evt The event that triggered the function.
     * @returns {Array} A list of clients filtered by the search bar.
     */ 
    const handleSearch = (evt) => {
        const searchValue = evt.target.value;
        const filtered = employees.filter((employee) => {
            return employee.first_name.toLowerCase().includes(searchValue.toLowerCase()) || employee.last_name.toLowerCase().includes(searchValue.toLowerCase()) || employee.username.toLowerCase().includes(searchValue.toLowerCase()) || employee.email.toLowerCase().includes(searchValue.toLowerCase()) || employee.tel_number.toLowerCase().includes(searchValue.toLowerCase());
        });
        setFilteredClients(filtered);
    }

    /**
     * @function handleClickClient
     * @memberof 'choix_client.js'
     * @description Redirects to the 'recap_rdv' page.
     * @param {Object} client The client object.
     */
    const handleClickClient = (employee) => {
        router.push({
            pathname: "./detail_employee",
            query: {
                employee : JSON.stringify(employee)
            },
            });
    }

  return (
    <>
        <Header />
        <main>
        <div className='container my-5'>
            <div className='row'>
                <div className='col-md-8'>
                <input type="text" placeholder="Rechercher un client" className="form-control-lg mb-2" onChange={handleSearch}/>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th className='d-none d-sm-block'>Nom d'utilisateur</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody style={{cursor:"pointer"}}>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.id} onClick={() =>  handleClickClient(employee) }>
                            <td >{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td className='d-none d-sm-block'>{employee.username}</td>
                            <td>{employee.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </main>
        <Footer />
    </>
  );
}