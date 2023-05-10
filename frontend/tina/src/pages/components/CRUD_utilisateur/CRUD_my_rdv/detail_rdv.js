import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../header';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Footer from '../../footer';



export default function DetailRdv() {
  const router = useRouter();
  const cookies = parseCookies();
  const resQuery = router.query;
  const [services, setServices] = useState({});
  const [coiffeurs, setCoiffeurs] = useState({});
  const [heureDepart, setHeureDepart] = useState();
  const [customers, setCustomers] = useState({});
  const [heureFin, setHeureFin] = useState();
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState({});

  const fetchAppointment = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/my-appointments/",
        {
          headers: {
            Authorization: "Token " + cookies.csrftoken,
          },
        }
      );
      const appointments = response.data;
      setAppointments(appointments);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomers = async (id) => {
    try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/customers/" + id + "/",
      {
        headers: {
          Authorization: "Token " + cookies.csrftoken,
        },
      }
    );
    const customers = response.data;
    setCustomers(customers);
  } catch (error) {
    console.log(error);
  }
  };

  const fetchEmployees = async (id) => {
    const cookies = parseCookies();
        axios.get('http://127.0.0.1:8000/api/employees/' + id + "/", {
            headers: {
                Authorization: 'Token ' + cookies.csrftoken,
            },
            })
            .then((response) => {
                setCoiffeurs(response.data); // Setting employees in the state variable
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

  const fetchServices = async (id) => {
    axios
      .get("http://127.0.0.1:8000/api/services/" + id + "/", {
        headers: {
          Authorization: "Token " + cookies.csrftoken,
        },
      })
      .then((response) => {
        setServices(response.data); // Setting services in the state variable
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    };

    const createHeureFin = () => {
      if (appointment.time != null) {
        console.log(appointment);
        const date = new Date();
        const splitTime = appointment.time.split(":");
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
          const splitDate = appointment.date.split("/");
          const formattedDate =
          splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
        }
      }
    };

  useEffect(() => {
    fetchAppointment();
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      console.log(appointments);
      const appointment = appointments.find(
        (appointment) => appointment.id == resQuery.id
      );
      console.log(appointment);
      setAppointment(appointment);
    }
  }, [appointments]);

  useEffect(() => {
    if (appointment) {
      console.log(appointment);
      fetchServices(appointment.service);
      fetchEmployees(appointment.employee);
      fetchCustomers(appointment.customer);
    }
  }, [appointment]);

   useEffect(() => {
    
    createHeureFin();
  }, [appointment, services]);

  const handleClick = async (evt) => {
    evt.preventDefault();
    const result = confirm("Êtes-vous sûr de vouloir annuler le rendez-vous ?");
    if (result === true) {
      const response = await fetch("http://127.0.0.1:8000/api/appointments/" + resQuery.id + "/cancel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + cookies.csrftoken,
        }
      });

      if (response.ok) {
        alert("Le rendez-vous a bien été annulé");
        router.push("/components/CRUD_utilisateur/calendrier_utilisateur");
      } else {
        alert("Une erreur est survenue, le rendez-vous n'a pas été annulé. Veuillez réessayer, si cela ne fonctionne toujours pas, appelez le salon.");
      }
    } 
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
            {cookies.role == "customer" ? (
            <tr>
                <td>Coiffeur</td>
                <td>{coiffeurs.last_name + " " + coiffeurs.first_name}</td>
            </tr>
            ) : (
            <tr>
                <td>Client</td>
                <td>{customers.last_name + " " + customers.first_name}</td>
            </tr>
            )}
            <tr>
              <td>Date</td>
              <td>{appointment.date}</td>
            </tr>
            <tr>
              <td>Heure de départ</td>
              <td>{appointment.time}</td>
            </tr>
            <tr>
              <td>Heure de fin</td>
              <td>{heureFin}</td>
            </tr>
            <br />
            <button
              type="button"
              class="btn btn-primary no-border"
              style={{ backgroundColor: "#C21A09", borderColor: "#C21A09" }}
              onClick={handleClick}
            >
              Annuler le rendez-vous
            </button>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}