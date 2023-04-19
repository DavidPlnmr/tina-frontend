import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../header';
import { useRouter, Router } from 'next/router';

export default function RecapRdv() {
    const [services, setServices] = useState({});
    const [coiffeurs, setCoiffeurs] = useState({});
    const [heureDepart, setHeureDepart] = useState();
    const [heureFin, setHeureFin] = useState();
    const [appointment , setAppointment] = useState({id: null, date: null, time: null, employee: null, service: null, customer: null, informations: null, statut : "pending"});
    const router = useRouter();
    const param = router.query;

    useEffect(() => {
        console.log(param);
        setServices(JSON.parse(param.service));
        setCoiffeurs(JSON.parse(param.employee));
    }, []);

    useEffect(() => {
        const date = new Date();
        const splitTime = param.time.split(":");
        date.setHours(splitTime[0]);
        date.setMinutes(splitTime[1]);
        date.setSeconds(0);
        console.log(date);
        const formattedTime = date.toLocaleTimeString('fr-FR', { hour12: false });
        console.log(formattedTime);
        setHeureDepart(formattedTime);
        //const durationSplit = services.duration.toString().split(":");
        if (services.duration != null) {
            console.log(typeof(services.duration));
            const duration = services.duration;
            const splitDuration = duration.split(":");
            console.log(splitDuration[1]);
            const minuteDuration = parseInt(splitDuration[1]);
            const endDate = new Date(date.getTime() + minuteDuration * 60000);
            const formattedEndTime = endDate.toLocaleTimeString('fr-FR', { hour12: false });
            setHeureFin(formattedEndTime);
            console.log(formattedEndTime);
        }
        
    } , [services]);

        
  return (
    <>
    <Header/>
    <div className='container ' style={{marginTop: "270px"}}>
        <h2>Récapitulatif du rendez-vous : </h2>
            <table class="table">
                <tbody>
                    <tr>
                    <td>Service </td>
                    <td>{services.name}</td>
                    </tr>
                    <tr>
                    <td>Coiffeur</td>
                    <td>{coiffeurs.first_name + " " + coiffeurs.last_name}</td>
                    </tr>
                    <tr>
                    <td>Heure de départ</td>
                    <td>{heureDepart}</td>
                    </tr>
                    <tr>
                    <td>Heure de fin</td>
                    <td>{heureFin}</td>
                    </tr><br/>
                    <button type="button" onClick={handleSubmit} class="btn btn-primary no-border" style={{backgroundColor : "#232627"}}>Confirmer</button>
                </tbody>
            </table>
        </div>
    </>
  );
}