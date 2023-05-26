import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Header from '../header';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Head from "next/head";
import Footer from '../footer';

/**
 * @namespace 'choix_client.js'
 * @description This component provides the functionality to choose a client from a list.
 * @returns {JSX.Element} A React functional component rendering the client list.
 */
export default function ChoixClient() {

    /**
     * @constant clients
     * @memberof 'choix_client.js'
     * @description A list of clients.
     * @default []
     */ 
    const [clients, setClients] = useState([]);

    /**
     * @constant filteredClients
     * @memberof 'choix_client.js'
     * @description A list of clients filtered by the search bar.
     * @default []
     */
    const [filteredClients, setFilteredClients] = useState([]);

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
        axios.get('http://127.0.0.1:8000/api/customers/', {
        headers: {
                Authorization: `Token ` + cookies.csrftoken,
            },
            })
            .then((response) => {
                setClients(response.data);
                if (filteredClients.length === 0) {
                    console.log("filteredClients is empty");
                    setFilteredClients(response.data);
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
        const filtered = clients.filter((client) => {
            return client.first_name.toLowerCase().includes(searchValue.toLowerCase()) || client.last_name.toLowerCase().includes(searchValue.toLowerCase()) || client.username.toLowerCase().includes(searchValue.toLowerCase()) || client.email.toLowerCase().includes(searchValue.toLowerCase()) || client.tel_number.toLowerCase().includes(searchValue.toLowerCase());
        });
        setFilteredClients(filtered);
    }

    /**
     * @function handleClick
     * @memberof 'choix_client.js'
     * @description Redirects to the 'no_client_rdv' page.
     */
    const handleClick = () => {
        const cookies = parseCookies();
        router.push({
            pathname: "../prise_rendez_vous/no_client_rdv",
            query: {
              time: param.time,
              service: param.service,
              employee: param.employee,
              date: param.date,
              client : null
            },
          });
    }

    /**
     * @function handleClickClient
     * @memberof 'choix_client.js'
     * @description Redirects to the 'recap_rdv' page.
     * @param {Object} client The client object.
     */
    const handleClickClient = (client) => {
        router.push({
            pathname: "../prise_rendez_vous/recap_rdv",
            query: {
                time: param.time,
                service: param.service,
                employee: param.employee,
                date: param.date,
                client : JSON.stringify(client)
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
                <div className='col-md-4'>
                <button type="button" className="btn btn-primary w-100 mb-2" style={{ backgroundColor: "#C21A09", borderColor: "#C21A09" }} onClick={handleClick}>
                    Pas de compte
                </button>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th className='d-none d-sm-block'>Nom d'utilisateur</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody style={{cursor:"pointer"}}>
                    {filteredClients.map((client) => (
                        <tr key={client.id} onClick={() =>  handleClickClient(client) }>
                            <td >{client.first_name}</td>
                            <td>{client.last_name}</td>
                            <td className='d-none d-sm-block'>{client.username}</td>
                            <td>{client.email}</td>
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