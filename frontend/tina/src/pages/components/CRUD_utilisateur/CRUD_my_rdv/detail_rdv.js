import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../header';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Footer from '../../footer';
import {Modal, Button} from 'react-bootstrap';

/**
 * @namespace 'detail_rdv.js'
 * @description A page to display the details of an appointment
 * @returns {JSX.Element} - Return the html code of the detail_rdv page
 */

export default function DetailRdv() {
  /**
     * @memberof 'detail_rdv.js'
     * @constant {object} show 
     * @description state to show the modal
     * @default false
     */
  const [show, setShow] = useState(false);

  /**
   * @memberof 'detail_rdv.js'
   * @function handleClose
   * @description set the state show to false
   */
  const handleClose = () => setShow(false);

  /**
   * @memberof 'detail_rdv.js'
   * @function handleShow
   * @description set the state show to true
   */
  const handleShow = () => setShow(true);

   /**
     * @memberof 'detail_rdv.js'
     * @constant {object} show2 
     * @description state to show the modal
     * @default false
     */
  const [show2, setShow2] = useState(false);

  /**
   * @memberof 'detail_rdv.js'
   * @function handleClose
   * @description set the state show to false
   */
  const handleClose2 = () => setShow2(false);

  /**
   * @memberof 'detail_rdv.js'
   * @function handleShow
   * @description set the state show to true
   */
  const handleShow2 = () => setShow2(true);

/**
 * @memberof 'detail_rdv.js'
 * @constant {object} router
 * @description variable to use the router functions
 * @default useRouter()
 */
  const router = useRouter();

  /**
   * @memberof 'detail_rdv.js'
   * @constant {object} cookies
   * @description variable to use the cookies functions
   * @default parseCookies()
   */
  const cookies = parseCookies();

  /**
   * @memberof 'detail_rdv.js'
   * @constant {object} resQuery
   * @description variable to use the router query functions
   * @default router.query
   */
  const resQuery = router.query;

  /**
   * @memberof 'detail_rdv.js'
   * @constant {object} [services, setServices]
   * @description state to store the services
   * @default useState({})
   */
  const [services, setServices] = useState({});

  /**
   * @memberof 'detail_rdv.js'
   * @constant {object} [coiffeurs, setCoiffeurs]
   * @description state to store the employees
   * @default useState({})
   * @example useState({}) = {id: 1, name: "Jean", surname: "Dupont", ...}
   */
  const [coiffeurs, setCoiffeurs] = useState({});

  /**
   * @memberof 'detail_rdv.js'
   * @constant {object} [heureDepart, setHeureDepart]
   * @description state to store the start time of the appointment
   * @default useState({})
   * @example useState({}) = "10:00"
   */ 
  const [heureDepart, setHeureDepart] = useState();

  /**
   * @memberof 'detail_rdv.js'
   * @constant {object} [customers, setCustomers]
   * @description state to store the customers
   * @default useState({})
   * @example useState({}) = {id: 1, name: "Jean", surname: "Dupont", ...}
   */ 
  const [customers, setCustomers] = useState({});

  /**
   * @memberof 'detail_rdv.js'
   * @constant {object} [heureFin, setHeureFin]
   * @description state to store the end time of the appointment
   * @default useState({})
   * @example useState({}) = "11:00"
   */ 
  const [heureFin, setHeureFin] = useState();

  /**
   * @memberof 'detail_rdv.js'
   * @constant {object} [date, setDate]
   * @description state to store the date of the appointment
   * @default useState({})
   * @example useState({}) = "2021-06-01"
   */ 
  const [appointments, setAppointments] = useState([]);

  /**
   * @memberof 'detail_rdv.js'
   * @constant {object} [appointment, setAppointment]
   * @description state to store the appointment
   * @default useState({})
   * @example useState({}) = {id: 1, date: "2021-06-01", heureDepart: "10:00", heureFin: "11:00", ...}
   */
  const [appointment, setAppointment] = useState({});

  /**
   * @memberof 'detail_rdv.js'
   * @constant {String} baseUrl
   * @description variable to store the base of the url of the API
   * @default process.env.NEXT_PUBLIC_BASE_URL
   */  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  /**
   * @memberof 'detail_rdv.js'
   * @function useEffect
   * @description function to fetch the appointment
   */
  const fetchAppointment = async () => {
    try {
      const response = await axios.get(
        baseUrl + "my-appointments/",
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

  /**
   * @memberof 'detail_rdv.js'
   * @function useEffect
   * @description function to fetch the customers
   * @param {number} id
   * @example id = 1
   */
  const fetchCustomers = async (id) => {
    try {
    const response = await axios.get(
      baseUrl + "customers/" + id + "/",
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

  /**
   * @memberof 'detail_rdv.js'
   * @function useEffect
   * @description function to fetch the employees
   * @param {number} id
   * @example id = 1
   */ 
  const fetchEmployees = async (id) => {
    const cookies = parseCookies();
        axios.get(baseUrl + 'employees/' + id + "/", {
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

  /**
   * @memberof 'detail_rdv.js'
   * @function useEffect
   * @description function to fetch the services
   * @param {number} id
   * @example id = 1
   */ 
  const fetchServices = async (id) => {
    axios
      .get(baseUrl + "services/" + id + "/", {
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

  /**
   * @memberof 'detail_rdv.js'
   * @function useEffect
   * @description function to create the end time of the appointment
   */
    const createHeureFin = () => {
      if (appointment) {
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
        if (appointment.duration != null) {
          console.log(typeof appointment.duration);
          const duration = appointment.duration;
          const splitDuration = duration.split(":");
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
            console.log("test");
            const hourDuration = parseInt(splitDuration[0]);
            const minuteDuration = parseInt(splitDuration[1]);
            const endDate = new Date(date.getTime() + hourDuration * 3600000 + minuteDuration * 60000);
            const formattedEndTime = endDate.toLocaleTimeString("fr-FR", {
              hour12: false,
            });
            setHeureFin(formattedEndTime);
            console.log(formattedEndTime);
          }
          // format date from dd/mm/yyyy to yyyy-mm-dd
          const splitDate = appointment.date.split("/");
          const formattedDate =
          splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
        }
      }
    }
    };

  /**
   * @memberof 'detail_rdv.js'
   * @function useEffect
   * @description useEffect to fetch the appointment
   */
  useEffect(() => {
    fetchAppointment();
  }, []);

  /**
   * @memberof 'detail_rdv.js'
   * @function useEffect
   * @description useEffect to find the appointment
   */ 
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

  /**
   * @memberof 'detail_rdv.js'
   * @function useEffect
   * @description useEffect to fetch the services, employees and customers
   */ 
  useEffect(() => {
    if (appointment) {
      console.log(appointment);
      fetchServices(appointment.service);
      fetchEmployees(appointment.employee);
      fetchCustomers(appointment.customer);
      console.log(customers);
    }
  }, [appointment]);

  /**
   * @memberof 'detail_rdv.js'
   * @function useEffect
   * @description useEffect to create the end time of the appointment
   */
  useEffect(() => {
    createHeureFin();
  }, [appointment, services]);

  /**
   * @memberof 'detail_rdv.js'
   * @function handleClick
   * @description function to cancel the appointment
   * @param {Object} evt
   * @example evt = {id: 1, date: "2021-06-01", time: "10:00:00", customer: 1, service: 1, …}
   */ 
  const handleClick = async (evt) => {
    evt.preventDefault();
    const response = await fetch(baseUrl + "appointments/" + resQuery.id + "/cancel", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + cookies.csrftoken,
      }
    });

    if (response.ok) {
      console.log("ok");
      handleClose();
      handleShow2();
    } else {
      alert("Une erreur est survenue, le rendez-vous n'a pas été annulé. Veuillez réessayer, si cela ne fonctionne toujours pas, appelez le salon.");
    }
    
  }

  /**
   * @memberof 'detail_rdv.js'
   * @function handleClick2
   * @description function to redirect to the calendar
   * @param {Object} evt
   * @example evt = {id: 1, date: "2021-06-01", time: "10:00:00", customer: 1, service: 1, …}
   */ 
  const handleClick2 = async (evt) => {
    evt.preventDefault();
    handleClose2();
    router.push("/components/CRUD_utilisateur/calendrier_utilisateur"); 
  };

  /**
   * @memberof 'detail_rdv.js'
   * @function handleRedirect
   * @description function to redirect to the calendar
   * @param {Object} evt
   * @example evt = {id: 1, date: "2021-06-01", time: "10:00:00", customer: 1, service: 1, …}
   */ 
  const handleRedirect = (evt) => {
    evt.preventDefault();
    router.push("/components/CRUD_utilisateur/calendrier_utilisateur");
  };
  
  return (
    <>
        <Header />
        {/* Modal pour la suppression */}
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} transparent>
                <Modal.Header closeButton>
                    <Modal.Title>ANNULATION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Voulez-vous vraiment annuler ce rendez-vous ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Retour
                    </Button>
                    <Button variant="danger" onClick={handleClick}>
                        Annuler le rendez-vous
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2} backdrop="static" keyboard={false} transparent>
                <Modal.Header closeButton>
                    <Modal.Title>ANNULATION CONFRIMÉE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Votre annulation a bien été prise en compte.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClick2}>
                        Retourner à mon calendrier
                    </Button>
                </Modal.Footer>
            </Modal>
        <main>
          {appointment && services && customers && coiffeurs && (
        <div className="container" style={{marginTop: "10%"}}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Récapitulatif de réservation</h4>
              <ul className="list-group list-group-flush">
                {Object.keys(customers).length !== 0 && cookies.role == "employee" && (
                <li className="list-group-item">
                  <strong>Client:</strong> {customers.first_name} {customers.last_name}
                </li>
                )}
                <li className="list-group-item">
                  <strong>Coiffeur :</strong> {coiffeurs.first_name} {coiffeurs.last_name}
                </li>
                {appointment.informations && (
                <li className="list-group-item">
                  <strong>information:</strong> {appointment.informations}
                </li>
                )}
                {appointment.service && (
                <li className="list-group-item">
                  <strong>Service:</strong> {services.name}
                </li>
                )}
                <li className="list-group-item">
                  <strong>Date:</strong> {appointment.date}
                </li>
                <li className="list-group-item">
                  <strong>Heure de début :</strong> {appointment.time}
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
          <button className="btn btn-danger" style={{backgroundColor: "#BB2D3B", border: "none"}} onClick={handleShow}>
            Annuler le rendez-vous
          </button>
        </div>
          )}
          {appointment == undefined && (
            <div className="container" style={{marginTop: "10%"}}>
              <h1>Une erreur est survenue</h1><br /> 
              <button className="btn btn-primary" style={{backgroundColor: "#232627", border: "none"}} onClick={handleRedirect}>
                Revenir au calendrier
              </button>
            </div>
          )}
      </main>
      <Footer />
    </>
  );
}