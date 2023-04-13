import Header from './header-black';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRef } from 'react';

export default function Formulaire_services() {

    const [service, setService] = useState([
        {
            type_of_service: 0,
        }
      ]);
    const [compteur, setCompteur] = useState(1);

    const [listTypeOfService, setListTypeOfService] = useState([]);
    
    const dataFetchedRef = useRef(false);

    const handleChange = (evt) => {
        setService({ ...service, [evt.target.dataset.id]: evt.target.value });
        console.log(service);
    };

    const handleSelect = (evt) => {
        console.log(evt.target.value);
        setService({ ...service, [evt.target.dataset.id]: evt.target.value });
    };
    const addService = (evt) => {
        evt.preventDefault();
        setCompteur(compteur + 1);
    };

    const handleSubmit =  (evt) => {
        console.log(evt);
        // for (let i = 0; i < compteur; i++) {}
        let lst = {
            'name':'',
            'price':0,
            'price_student':0,
            'type_of_service':0,

        };
        let s = '';
        for (s in service) {
            
            console.log(s);
        };

        // const cookies = parseCookies();

        // axios.post('http://127.0.0.1:8000/api/services/', service, {
        //     headers: {
        //         Authorization: 'Token '  + cookies.csrftoken,
        //     },
        //     })
        //     .then((response) => {
        //     console.log(response.data);
        //     })
        //     .catch((error) => {
        //     console.log(error);
        //     });

    };

    const fetchTypeOfService = () => {
        const cookies = parseCookies();
        axios.get('http://127.0.0.1:8000/api/typesofservice/', {
            headers: {
                Authorization: 'Token '  + cookies.csrftoken,
            },
            })
            .then((response) => {
                setListTypeOfService(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadServices = () => {
        
        for (let i = 1; i <= compteur && i == lstNvServices.length+1; ++i) {
            lstNvServices.push(
                <div>

                    <div class="row mb-3">
                        <label for={"service_titre"+i} class="col-sm-2 col-form-label">Service{i} titre</label>
                        <div class="col-auto">
                        <input type="text" class="form-control" id={"service_titre"+i} data-id={"name"+i} placeholder={'Le titre du service '+i} onChange={handleChange}></input>
                        </div>
                    </div>
                        
                    <div class="row mb-3">
                        <label for={"service_prix"+i} class="col-sm-2 col-form-label">Service{i} prix</label>
                        <div class="col-auto">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                <div class="input-group-text">CHF</div>
                                </div>
                                <input type="number" class="form-control" id={"service_prix"+i} data-id={"price"+i} placeholder="0" onChange={handleChange}></input>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for={"service_studentprice"+i} class="col-sm-2 col-form-label">Service{i} prix etudiant</label>
                        <div class="col-auto">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                <div class="input-group-text">CHF</div>
                                </div>
                                <input type="number" class="form-control" id={"service_studentprice"+i} data-id={"price_student"+i} placeholder="0" onChange={handleChange}></input>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for={"service_temps"+i} class="col-sm-2 col-form-label">Service{i} duree</label>
                        <div class="col-auto">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                <div class="input-group-text">Min</div>
                                </div>
                                <input type="number" class="form-control" id={"service_temps"+i} data-id={"duration"+i} placeholder="0" onChange={handleChange}></input>
                            </div>
                        </div>
                    </div>

                </div>    
            );
        }
        return lstNvServices;
    };

    let lstNvServices = [];

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchTypeOfService();
    }, [compteur]);

    return (
        <>
            <Header/>
            <div className="d-flex flex-column justify-content-start align-items-center" style={{height:"auto", backgroundColor: "#b8aaa0" }}>
                <ul></ul>
                <form>
                    <div class="row mb-3">
                    <select class="form-select" aria-label="Default select example" data-id="type_of_service" onChange={handleSelect}>
                    {listTypeOfService.map(item => {
                        return (<option key={item.id} value={item.id}>{item.name}</option>);
                    })}
                    </select>
                    </div>
                    
                    <div>
                        {loadServices()}
                    </div>

                    <div class="row mb-3">
                        <div class="col-auto">
                            <button type="button" class="btn btn-outline-secondary" onClick={addService}>Ajouter un service</button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-auto">
                            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Sauvegarder</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}