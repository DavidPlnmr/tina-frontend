import React from "react";
import { useState, useEffect, useRef } from 'react';
import styles from "./CardService.module.scss";
import Header from "@/pages/components/header";
import axios from "axios";
import {parseCookies} from "nookies";
import Router from "next/router";

// Composant qui affiche une liste de types de service et leurs services associés
export default function ServiceRDV() {

    // States
    const [typesOfService, setTypesOfService] = useState(null);
    const [services, setServices] = useState(null);

    // Référence utilisée pour ne pas refetcher les données après la première fois
    const dataFetchedRef = useRef(false);

    // Cookies
    const cookies = parseCookies();

    // Fonction pour récupérer les types de service
    const fetchTypeOfService = () => {
        axios.get('http://127.0.0.1:8000/api/typesofservice/', {
            headers: {
                Authorization: 'Token '  + cookies.csrftoken,
            },
        })
            .then((response) => {
                setTypesOfService(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Fonction pour récupérer les services
    const fetchServices = () => {
        axios.get('http://127.0.0.1:8000/api/services/', {
            headers: {
                Authorization: 'Token '  + cookies.csrftoken,
            },
        })
            .then((response) => {
                setServices(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Fonction appelée lorsqu'un service est choisi
    const handleChooseService = (service) => {
        Router.push({
            pathname: "/components/prise_rendez_vous/rdv_employee",
            query: { service: JSON.stringify(service) }
        });
    };

    // useEffect pour récupérer les types de service et les services associés
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchTypeOfService();
        fetchServices();
    }, []);


    // Affichage de la liste des types de service et des services associés
    return (
        <>
            <Header/>

            <div className="container">
                <div className="row">
                    {typesOfService && typesOfService.map(typeOfService => (
                        <div className="col-md-4" key={typeOfService.id}>
                            <div className={styles.cardService}>
                                <p className={styles.titre}>{typeOfService.name}</p>
                                <p className={styles.sousTitre}>À partir de 20.-</p>
                                <div className={styles.separateur} />
                                {services && services.filter(service => service.type_of_service === typeOfService.id)
                                    .map(service => (
                                        <div className={styles.conteneurDesc} key={service.id}>
                                            <div className={styles.description}>
                                                <p className={styles.textDesc}>
                                                    {service.name}
                                                    <br />
                                                    {service.name}
                                                    <br />
                                                    {service.duration} minutes, CHF {service.price}-
                                                </p>
                                                <div className={styles.bouttonChoisir} onClick={() => handleChooseService(service)}>
                                                    <p className={styles.textBoutton}>Choisir</p>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};