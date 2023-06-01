import { useEffect, useState } from "react";
import Header from "../header";
import { useRouter, Router } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import Footer from "../footer";
import { de } from "date-fns/locale";
import { ProgressBar } from './ProgressBar';


/**
 * @namespace 'recap_rdv.js'
 * @description This component provides the functionality to display the appointment's recap. This component sends the appointment's data to the database.
 * @returns {JSX.Element} A React functional component rendering the appointment's recap.
 */
export default function RecapRdv() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  /**
   * @constant services
   * @memberof 'recap_rdv.js'
   * @description An object of services.
   * @default {}
   */ 
  const [services, setServices] = useState({});

  /**
   * @constant coiffeurs
   * @memberof 'recap_rdv.js'
   * @description An object of employees.
   * @default {}
   */ 
  const [coiffeurs, setCoiffeurs] = useState({});

  /**
   * @constant heureDepart
   * @memberof 'recap_rdv.js'
   * @description The appointment's start time.
   * @default ''
   */ 
  const [heureDepart, setHeureDepart] = useState();

  /**
   * @constant heureFin
   * @memberof 'recap_rdv.js'
   * @description The appointment's end time.
   * @default ''
   */ 
  const [heureFin, setHeureFin] = useState();

  /**
   * @constant clients
   * @memberof 'recap_rdv.js'
   * @description A list of clients.
   * @default []
   */ 
  const [clients, setClients] = useState([]);

  /**
   * @constant description
   * @memberof 'recap_rdv.js'
   * @description The appointment's description.
   * @default ''
   */ 
  const [description, setDescription] = useState("");

  /**
   * @constant appointment
   * @memberof 'recap_rdv.js'
   * @description An object of appointment's data.
   * @ property {string} date - The appointment's date.
   * @ property {string} time - The appointment's time.
   * @ property {string} employee - The appointment's employee.
   * @ property {string} service - The appointment's service.
   * @ property {string} customer - The appointment's customer.
   * @ property {string} informations - The appointment's informations.
   * @default {date: null, time: null, employee: null, service: null, customer: null, informations: null}
   */ 
  const [appointment, setAppointment] = useState({
    date: null,
    time: null,
    employee: null,
    service: null,
    customer: null,
    informations: null,
  });

  /**
   * @constant myDate
   * @memberof 'recap_rdv.js'
   * @description Date object.
   * @default ''
   */
  const [myDate, setMyDate] = useState();

  /**
   * @constant router
   * @memberof 'recap_rdv.js'
   * @see {@link 'header.js'.router}
   */
  const router = useRouter();

  /**
   * @constant param
   * @memberof 'recap_rdv.js'
   * @see {@link 'calendrier_utilisateur.js'.param}
   */ 
  const param = router.query;

  /**
   * @constant cookies
   * @memberof 'recap_rdv.js'
   * @see {@link 'header.js'.cookies}
   */ 
  const cookies = parseCookies();

  useEffect(() => {
    console.log(param.employee);
    if (Object.keys(param).length !== 0) {
      console.log("param");
      console.log(param);
      localStorage.setItem("param", JSON.stringify(param));
    }
  }, []);

  /**
   * @function useEffect1
   * @memberof 'recap_rdv.js'
   * @description React hook that triggers the side effect function when the component is mounted.
   */
  useEffect(() => {
    const localparam = JSON.parse(localStorage.getItem("param"));
    console.log(localparam);
    if (localparam !== undefined || localparam !== null) {
      setServices(JSON.parse(localparam.service));
      setCoiffeurs(JSON.parse(localparam.employee));
      setMyDate(localparam.date);
      if (cookies.role === "employee" || cookies.role === "admin") {
        console.log(localparam.client);
        if (localparam.client != "") {
          setClients(JSON.parse(localparam.client));
        }
        else {
          setDescription(localparam.description);
        }
      }
    }
  }, []);


  useEffect(() => {
    const localparam = JSON.parse(localStorage.getItem("param"));
    if (localparam != undefined || localparam != null) {
      const date = new Date();
      const splitTime = localparam.time.split(":");
      date.setHours(splitTime[0]);
      date.setMinutes(splitTime[1]);
      date.setSeconds(0);
      console.log(date);
      const formattedTime = date.toLocaleTimeString("fr-FR", { hour12: false });
      
      setHeureDepart(formattedTime);
      //const durationSplit = services.duration.toString().split(":");
      if (services.duration != null) {
        console.log(typeof services.duration);
        const duration = services.duration;
        const splitDuration = duration.split(":");
        console.log(splitDuration[1]);
        console.log(splitDuration[0]);
        if (splitDuration[0] == "00") {
          const minuteDuration = parseInt(splitDuration[1]);
          const endDate = new Date(date.getTime() + minuteDuration * 60000);
          const formattedEndTime = endDate.toLocaleTimeString("fr-FR", {
            hour12: false,
          });
          setHeureFin(formattedEndTime);
          console.log(formattedEndTime);
        }
        else {
          const hourDuration = parseInt(splitDuration[0]);
          const minuteDuration = parseInt(splitDuration[1]);
          const endDate = new Date(date.getTime() + hourDuration * 3600000 + minuteDuration * 60000);
          const formattedEndTime = endDate.toLocaleTimeString("fr-FR", {
            hour12: false,
          });
          setHeureFin(formattedEndTime);
        }
        // format date from dd/mm/yyyy to yyyy-mm-dd

        let formattedDate;
        
        if (myDate.includes("/")) {
          const splitDate = myDate.split("/");
          formattedDate =
          splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
        } else {
          const splitDate = myDate.split(".");
          formattedDate = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
        }

          console.log(formattedDate);
          if (cookies.role === "customer") {

        setAppointment({
          ...appointment,
          date: formattedDate,
          time: heureDepart,
          employee: coiffeurs.id,
          service: services.id,
        });
      } else if (cookies.role === "employee" && param.client != "" || cookies.role === "admin" && param.client != "") {
        setAppointment({
          ...appointment,
          date: formattedDate,
          time: heureDepart,
          employee: coiffeurs.id,
          service: services.id,
          customer: clients.id,
        });
      }
      else if (cookies.role === "employee" && param.client == "" || cookies.role === "admin" && param.client == "") {
        console.log(description);
        setAppointment({
          ...appointment,
          date: formattedDate,
          time: heureDepart,
          employee: coiffeurs.id,
          service: services.id,
          informations: description,
        });
      }
    }
  }
  }, [services]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post(baseUrl + "appointments/create", appointment, {
        headers: {
          Authorization: `Token ` + cookies.csrftoken,
        },
      })
      .then((response) => {
        console.log(response.data);
        router.push("/components/prise_rendez_vous/confirmation_rdv");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <main>
        <ProgressBar currentStep={4} />
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Récapitulatif de réservation</h4>
              <ul className="list-group list-group-flush">
                {description === "" &&(
                  <li className="list-group-item">
                    <strong>Client:</strong> {clients.first_name} {clients.last_name}
                  </li>
                )}

              {(cookies.role === "employee" || cookies.role === "admin") && description !== "" &&(
                  <li className="list-group-item">
                    <strong>information:</strong> {description}
                  </li>
                )}

                <li className="list-group-item">
                  <strong>Coiffeur:</strong> {coiffeurs.first_name} {coiffeurs.last_name}
                </li>
                <li className="list-group-item">
                  <strong>Service:</strong> {services.name}
                </li>
                <li className="list-group-item">
                  <strong>Date:</strong> {myDate}
                </li>
                <li className="list-group-item">
                  <strong>Heure de début :</strong> {heureDepart}
                </li>
                <li className="list-group-item">
                  <strong>Heure de fin :</strong> {heureFin}
                </li>
                <li className="list-group-item">
                  <strong>Prix total :</strong> CHF {services.price}
                </li>
              </ul>
            </div>
          </div> <br />
          <button className="btn btn-primary" style={{backgroundColor: "#232627", border: "none"}} onClick={handleSubmit}>
            Confirmer le rendez-vous
          </button>
        </div>
      </main>
      <Footer />
    </>
  );  
}
