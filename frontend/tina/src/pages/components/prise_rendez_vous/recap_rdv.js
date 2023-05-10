import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Header from "../header";
import { useRouter, Router } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import { el } from "date-fns/locale";

export default function RecapRdv() {
  const [services, setServices] = useState({});
  const [coiffeurs, setCoiffeurs] = useState({});
  const [heureDepart, setHeureDepart] = useState();
  const [heureFin, setHeureFin] = useState();
  const [clients, setClients] = useState([]);
  const [description, setDescription] = useState("");
  const [appointment, setAppointment] = useState({
    date: null,
    time: null,
    employee: null,
    service: null,
    customer: null,
    informations: null,
  });
  const [myDate, setMyDate] = useState();
  const router = useRouter();
  const param = router.query;
  const cookies = parseCookies();

  useEffect(() => {
    setServices(JSON.parse(param.service));
    setCoiffeurs(JSON.parse(param.employee));
    setMyDate(param.date);
    if (cookies.role === "employee") {
      console.log(param.client);
      if (param.client != "") {
        setClients(JSON.parse(param.client));
      }
      else {
        setDescription(param.description);
      }
    }
  }, []);

  useEffect(() => {
    const date = new Date();
    const splitTime = param.time.split(":");
    date.setHours(splitTime[0]);
    date.setMinutes(splitTime[1]);
    date.setSeconds(0);
    console.log(date);
    const formattedTime = date.toLocaleTimeString("fr-FR", { hour12: false });
    console.log(formattedTime);
    setHeureDepart(formattedTime);
    //const durationSplit = services.duration.toString().split(":");
    if (services.duration != null) {
      console.log(typeof services.duration);
      const duration = services.duration;
      const splitDuration = duration.split(":");
      console.log(splitDuration[1]);
      const minuteDuration = parseInt(splitDuration[1]);
      const endDate = new Date(date.getTime() + minuteDuration * 60000);
      const formattedEndTime = endDate.toLocaleTimeString("fr-FR", {
        hour12: false,
      });
      setHeureFin(formattedEndTime);
      console.log(formattedEndTime);
      // format date from dd/mm/yyyy to yyyy-mm-dd
      const splitDate = myDate.split("/");
      const formattedDate =
        splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
        if (cookies.role === "customer") {

      setAppointment({
        ...appointment,
        date: formattedDate,
        time: heureDepart,
        employee: coiffeurs.id,
        service: services.id,
      });
    } else if (cookies.role === "employee" && param.client != "") {
      setAppointment({
        ...appointment,
        date: formattedDate,
        time: heureDepart,
        employee: coiffeurs.id,
        service: services.id,
        customer: clients.id,
      });
    }
    else if (cookies.role === "employee" && param.client == "") {
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
  }, [services]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(appointment.date);
    console.log(appointment);
    axios
      .post("http://127.0.0.1:8000/api/appointments/create", appointment, {
        headers: {
          Authorization: `Token ` + cookies.csrftoken,
        },
      })
      .then((response) => {
        console.log(response.data);
        router.push("/components/prise_rendez_vous/confirmation_rdv");
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="container " style={{ marginTop: "270px" }}>
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
            {cookies.role === "employee" && clients != "" && (
              <tr>
                <td>Client</td>
                <td>{clients.first_name + " " + clients.last_name}</td>
              </tr>
            )}

            {cookies.role === "employee" && description != "" &&(
              <tr>
                <td>Description</td>
                <td>{description}</td>
              </tr>
            )
            }
            <tr>
              <td>Date</td>
              <td>{myDate}</td>
            </tr>
            <tr>
              <td>Heure de départ</td>
              <td>{heureDepart}</td>
            </tr>
            <tr>
              <td>Heure de fin</td>
              <td>{heureFin}</td>
            </tr>
            <br />
            <button
              type="button"
              onClick={handleSubmit}
              class="btn btn-primary no-border"
              style={{ backgroundColor: "#232627" }}
            >
              Confirmer
            </button>
          </tbody>
        </table>
      </div>
    </>
  );
}
