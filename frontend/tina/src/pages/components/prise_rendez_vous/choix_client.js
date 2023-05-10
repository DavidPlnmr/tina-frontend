import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Header from '../header';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

export default function ChoixClient() {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const cookies = parseCookies();
    const param = useRouter().query;
    const router = useRouter();

    useEffect(() => {
        fetchCustomers();
        }, []);

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

    const handleSearch = (evt) => {
        const searchValue = evt.target.value;
        const filtered = clients.filter((client) => {
            return client.first_name.toLowerCase().includes(searchValue.toLowerCase()) || client.last_name.toLowerCase().includes(searchValue.toLowerCase()) || client.username.toLowerCase().includes(searchValue.toLowerCase()) || client.email.toLowerCase().includes(searchValue.toLowerCase()) || client.tel_number.toLowerCase().includes(searchValue.toLowerCase());
        });
        setFilteredClients(filtered);
    }

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
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th className='d-none d-sm-block'>Nom d'utilisateur</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
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
    </>
  );
}