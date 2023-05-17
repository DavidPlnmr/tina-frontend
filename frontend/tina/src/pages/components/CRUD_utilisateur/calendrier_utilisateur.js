import { useState, useRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import Header from "../header";
import axios from "axios";
import { addMinutes } from "date-fns";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Footer from "../footer";

/**
 * @namespace CalendrierClient
 * @description Composant qui permet de créer le calendrier de l'utilisateur.
 * @returns {JSX.Element}
 */

export default function CalendrierClient() {
  /**
   * @constant calendar
   * @default null
   * @memberof CalendrierClient
   * @description Cette constante est un useState qui contient le calendrier.
   */
  const [calendar, setCalendar] = useState(null);

  /**
   * @constant calendarEl
   * @description Cette constante contient le calendrier.
   * @default null
   * @memberof CalendrierClient
   * @type {object}
   */
  const calendarEl = useRef(null);

  /**
   * @constant events
   * @description Cette constante est un useState contient les évènements du calendrier.
   * @default []
   * @memberof CalendrierClient
   * @type {array}
   */
  const [events, setEvents] = useState([]);
  const event = useRef(false);
  const cookies = parseCookies();
  const router = useRouter();
  let customer = null;
  let information = null;

  /**
   * @function handleClick
   * @description Cette fonction permet de rediriger l'utilisateur vers la page de détail d'un rendez-vous en passant l'id du rendez-vous en paramètre.
   * @param {number} id L'id du rendez-vous.
   * @returns {void}
   * @memberof CalendrierClient
   */
  const handleClick = (id) => {
    router.push({
      pathname: "/components/CRUD_utilisateur/CRUD_my_rdv/detail_rdv",
      query: { id: id },
    });
  };

  /**
   * @function useEffect1
   * @returns {void}
   * @memberof CalendrierClient
   * @async
   * @description Cette fonction permet de faire les appels API pour récupérer les rendez-vous de l'utilisateur et les données spécifiques du rendez-vous.
   */
  useEffect(() => {
    const fetchAppointments = async () => {
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
        console.log(appointments);

        if (appointments.length > 0) {
          const newEvents = await Promise.all(
            appointments
              .filter((a) => {
                return a.status === "pending" || a.status === "confirmed";
              })
              .map(async (appointment) => {
                // Fetch service info for each appointment
                const response2 = await axios.get(
                  "http://127.0.0.1:8000/api/services/" +
                    appointment.service +
                    "/",
                  {
                    headers: {
                      Authorization: "Token " + cookies.csrftoken,
                    },
                  }
                );
                const service = response2.data;

                const response3 = await axios.get(
                  "http://127.0.0.1:8000/api/employees/" +
                    appointment.employee +
                    "/",
                  {
                    headers: {
                      Authorization: "Token " + cookies.csrftoken,
                    },
                  }
                );
                console.log(appointment.customer);
                let response4 = null;
                if (appointment.customer != null) {
                  response4 = await axios.get(
                    "http://127.0.0.1:8000/api/customers/" +
                      appointment.customer +
                      "/",
                    {
                      headers: {
                        Authorization: "Token " + cookies.csrftoken,
                      },
                    }
                  );
                  customer = response4.data;
                } else {
                  response4 = appointment.informations;
                  information = response4;
                }

                const employee = response3.data;
                let myTitle = "";
                const start = new Date(
                  `${appointment.date}T${appointment.time}`
                );
                const end = addMinutes(start, service.duration.slice(3, 5));
                if (cookies.role === "customer") {
                  myTitle = `Service : ${service.name} avec ${employee.first_name} ${employee.last_name} / (cliquez pour gérer le rendez-vous)`;
                } else if (cookies.role === "employee") {
                  if (appointment.customer != null) {
                    myTitle = `Service : ${service.name} / avec le client ${customer.first_name} ${customer.last_name} (cliquez pour gérer le rendez-vous)`;
                  } else {
                    myTitle = `Service : ${service.name} / informations : ${information} (cliquez pour gérer le rendez-vous)`;
                  }
                }

                // Create event object with service info
                return {
                  id: appointment.id,
                  title: myTitle,
                  start: start.toISOString(),
                  end: end.toISOString(),
                  allDay: false,
                  service: service, // add service info to event object
                };
              })
          );
          setEvents(newEvents);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  /**
   * @function useEffect2
   * @returns {void}
   * @async
   * @memberof CalendrierClient
   * @description Cette fonction permet d'envoyer les évenements dans le calendrier ansi que d'appeler handleclick'.
   */

  useEffect(() => {
    if (calendar !== null && events.length > 0) {
      if (event.current) return;
      event.current = true;
      calendar.addEventSource(events);
      // Ajouter la classe 'event-passe' aux événements passés
      const maintenant = new Date();
      const eventsPasse = calendar
        .getEvents()
        .filter((event) => event.start < maintenant);
      eventsPasse.forEach((event) => {
        event.setProp("classNames", ["event-passe"]);
      });

      calendar.setOption("eventClick", (info) => {
        handleClick(info.event.id);
      });
    }
  }, [events]);

  /**
   * @function useEffect3
   * @returns {void}
   * @async
   * @memberof CalendrierClient
   * @description Cette fonction permet de définir le calendrier et d'afficher les évènements.
   */
  useEffect(() => {
    if (calendarEl.current !== null) {
      const newCalendar = new Calendar(calendarEl.current, {
        initialView: "listWeek",
        firstDay: 1,
        height: "auto",
        allDaySlot: false,
        slotDuration: "00:15:00",
        slotEventOverlap: false,
        slotMinTime: "09:00:00",
        slotMaxTime: "19:00:00",
        headerToolbar: {
          start: "prev,next today",
          center: "title",
          end: "listWeek",
        },
        views: {
          timeGridWeek: {
            type: "timeGrid",
            duration: { weeks: 1 },
            buttonText: "Semaine",
            contentHeight: 500,
            slotLabelFormat: {
              hour: "numeric",
              minute: "2-digit",
              omitZeroMinute: false,
              meridiem: "narrow",
            },
          },
        },
        plugins: [listPlugin],
        locale: "fr", // définit la langue du calendrier en français
        buttonText: {
          today: "aujourd'hui",
        },
        eventContent: function (info) {
          const available = info.event.extendedProps.available;
          const backgroundColor = available ? "#2A4494" : "#2A4494"; // Détermine la couleur de fond en fonction de la disponibilité
          const title = info.event.title.split(" / ");
          const textColor = available ? "white" : "black"; // Détermine la couleur du texte en fonction de la disponibilité
          return {
            html: `<div style="text-align: center; background-color: ${backgroundColor}; color: white; font-size:12px;"><div >${title[0]}</div><div >${title[1]}</div></b></div>`,
          };
        },
      });

      setCalendar(newCalendar);
      newCalendar.render();

      return () => {
        newCalendar.destroy();
      };
    }
  }, [calendarEl]);

  return (
    <>
      <style>
        {`@media (max-width: 600px) {
        .fc-today-button {
          display: none;
        }
      }`}
      </style>
      <Header />
      <div className="container">
        <div
          ref={calendarEl}
          className="mx-auto"
          style={{ marginTop: "5%", marginBottom: "510px" }}
        ></div>
      </div>
      <Footer />
    </>
  );
}
