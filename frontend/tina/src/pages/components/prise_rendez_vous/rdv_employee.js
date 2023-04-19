import { useEffect, useState, useRef } from 'react';
import Header from '../header';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Router from 'next/router';
import { useRouter } from 'next/router';

export default function Rdv_employee() {

    const [lstEmployee, setLstEmployee] = useState([]);
    const dataFetchedRef = useRef(false);
    let lstCompEmployee = [];
    const router = useRouter();
    const service_json = router.query;
    
    const fetchEmployee = () => {
        const cookies = parseCookies();
        axios.get('http://127.0.0.1:8000/api/employees/', {
            headers: {
                Authorization: 'Token '  + cookies.csrftoken,
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
            pathname: '/components/prise_rendez_vous/calendrier',
            query: { employee: JSON.stringify(e), service: service_json.service},
        })

    };

    const loadEmployee = () => {
        lstEmployee.map((e) => {
            lstCompEmployee.push(
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <br></br>
                    <div class="card">
                        <img class="card-img-top" src="https://placehold.co/286x180" alt="Placeholder"/>
                        <div class="card-body justify-content-center">
                            <h5 class="card-title text-center font-weight-bold">{e.first_name} {e.last_name}</h5>
                            <div class="text-center">
                                <button 
                                    type="button" 
                                    class="btn btn-primary"
                                    data-id={"btn "+e.id}
                                    
                                    onClick={() => handleOnClick(e)}>
                                        Choisir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return lstCompEmployee;
     };
    
    useEffect(() => {
        console.log(service_json);

        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchEmployee();
    }, []);

  return (
    <>
        <Header/>
        <br></br>
        <div class="container">
        <h2>Sélectionnez un coiffeur :</h2>
            <div class="row">
                {loadEmployee()}
            </div>
        </div>
        <br></br>
    </>
  );
}