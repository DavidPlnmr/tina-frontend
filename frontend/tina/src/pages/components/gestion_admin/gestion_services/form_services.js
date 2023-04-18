import Header from './header-black';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRef } from 'react';

export default function Formulaire_services() {

    const [service1, setService1] = useState([
        {
            type_of_service: 0,
            name: '',
            price: 0,
            price_student: 0,
            duration: 0,
        }
      ]);
    const [service2, setService2] = useState([
    {
        type_of_service: 0,
        name: '',
        price: 0,
        price_student: 0,
        duration: 0,
    }
    ]);
    const [service3, setService3] = useState([
        {
            type_of_service: 0,
            name: '',
            price: 0,
            price_student: 0,
            duration: 0,
        }
      ]);
      
    const [compteur, setCompteur] = useState(1);

    const [listTypeOfService, setListTypeOfService] = useState([]);
    
    const dataFetchedRef = useRef(false);

    const handleChange1 = (evt) => {
        setService1({ ...service1, [evt.target.dataset.id]: evt.target.value });
        console.log(service1);
    };
    const handleChange2 = (evt) => {
        setService2({ ...service2, [evt.target.dataset.id]: evt.target.value });
        console.log(service2);
    };
    const handleChange3 = (evt) => {
        setService3({ ...service3, [evt.target.dataset.id]: evt.target.value });
        console.log(service3);
    };
    const chooseHandleChange = (i) => {
        if (i == 1){
            return handleChange1;
        }
        else if (i == 2){
            return handleChange2;
        }
        else if (i == 3){
            return handleChange3;
        }
    };

    const handleSelect = (evt) => {
        console.log(evt.target.value);
        setService1({ ...service1, [evt.target.dataset.id]: evt.target.value });
        setService2({ ...service2, [evt.target.dataset.id]: evt.target.value });
        setService3({ ...service3, [evt.target.dataset.id]: evt.target.value });
    };
    const addService = (evt) => {
        evt.preventDefault();
        if (compteur < 3){
            setCompteur(compteur + 1);
        }
        
    };

    const handleSubmit =  (evt) => {
        console.log(evt);
        console.log(service1);
        console.log(service2);
        console.log(service3);
        
        //boucle for pour envoyer les services
        for (let i = 1; i <= compteur; ++i) {
            if (i == 1){
                if(service1.type_of_service !=null && service1.name != '' && service1.price != 0 && service1.price_student != 0 && service1.duration != 0){
                    postService(service1);
                }
            }
            else if (i == 2){
                if(service2.type_of_service !=null && service2.name != '' && service2.price != 0 && service2.price_student != 0 && service2.duration != 0){
                    postService(service2);
                }
            }
            else if (i == 3){
                if (service3.type_of_service !=null && service3.name != '' && service3.price != 0 && service3.price_student != 0 && service3.duration != 0){
                    postService(service3);
                }
            }
        };

    };

    const postService = (s) => {
        const cookies = parseCookies();

        axios.post('http://127.0.0.1:8000/api/services/', s, {
            headers: {
                Authorization: 'Token '  + cookies.csrftoken,
            },
            })
            .then((response) => {
            console.log(response.data);
            })
            .catch((error) => {
            console.log(error);
            });

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
                        <input type="text" class="form-control" id={"service_titre"+i} data-id={"name"} placeholder={'Le titre du service '+i} onChange={chooseHandleChange(i)}></input>
                        </div>
                    </div>
                        
                    <div class="row mb-3">
                        <label for={"service_prix"+i} class="col-sm-2 col-form-label">Service{i} prix</label>
                        <div class="col-auto">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                <div class="input-group-text">CHF</div>
                                </div>
                                <input type="number" class="form-control" id={"service_prix"+i} data-id={"price"} placeholder="0" onChange={chooseHandleChange(i)}></input>
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
                                <input type="number" class="form-control" id={"service_studentprice"+i} data-id={"price_student"} placeholder="0" onChange={chooseHandleChange(i)}></input>
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
                                <input type="time" class="form-control" id={"service_temps"+i} data-id={"duration"} placeholder="0" onChange={chooseHandleChange(i)}></input>
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
                        <option key='0' value='0'>Sélectionnez un type de service...</option>
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