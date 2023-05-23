import { useState, useRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Header from "../header";
import axios from "axios";
import { parseCookies } from "nookies";
import { useRouter, Router } from "next/router";
import Footer from "../footer";

/**
 * @namespace 'calendrier.js'
 * @description This component provides the functionality to create and manage the appointments's calendar.
 * @returns {JSX.Element} A React functional component rendering the calendar interface.
 */
export default function Calendrier() {

  /**
   * @constant calendar
   * @memberof 'calendrier.js'
   * @see {@link 'calendrier_client.js'.calendar}
   */
  const [calendar, setCalendar] = useState(null);

  /**
   * @constant calendarEl
   * @memberof 'calendrier.js'
   * @see {@link 'calendrier_client.js'.calendarEl}
   */
  const calendarEl = useRef(null);

  /**
   * @constant events
   * @memberof 'calendrier.js'
   * @see {@link 'calendrier_client.js'.events}
   */
  const [events, setEvents] = useState([]);

  /**
   * @constant event
   * @memberof 'calendrier.js'
   * @see {@link 'calendrier_client.js'.event}
   */
  const event = useRef(false);

  /**
   * @constant cookies
   * @memberof 'calendrier.js'
   * @see {@link 'header.js'.cookies}
    */
  const cookies = parseCookies();

  /**
   * @constant router
   * @memberof 'calendrier.js'
   * @see {@link 'header.js'.router}
   */
  const router = useRouter();

  /**
   * @constant param
   * @memberof 'calendrier.js'
   * @description The query parameters of the current URL.
   */
  const param = router.query;

  /**
   * @function handleClick
   * @memberof 'calendrier.js'
   * @description This function redirects the user to the next page and passes the selected time and date as query parameters.
   * @param {string} time The selected time.
   * @param {string} date The selected date.
   * @returns {void}
   */
  const handleClick = (time, date) => {
    if (cookies.role === "customer") {
      router.push({
        pathname: "/components/prise_rendez_vous/recap_rdv",
        query: {
          time: time,
          service: param.service,
          employee: param.employee,
          date: date,
        },
      });
    } else {
      router.push({
        pathname: "/components/prise_rendez_vous/choix_client",
        query: {
          time: time,
          service: param.service,
          employee: param.employee,
          date: date,
        },
      });
    }
  };

  /**
   * @function useEffect1
   * @memberof 'calendrier.js'
   * @description This effect performs API calls to fetch user appointments and specific appointment data. It's run once when the component mounts.
   * @returns {void}
   * @async
   */
  useEffect(() => {
    console.log("param : ");
    console.log(param);
    if (param.service === undefined || param.employee === undefined) {
      router.push("./service_rdv");
    }
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/appointment_available/?service=" +
            JSON.parse(param.service).id +
            "&employee=" +
            JSON.parse(param.employee).id,
          {
            headers: {
              Authorization: "Token " + cookies.csrftoken,
            },
          }
        );
        const appointments = response.data;
        const newEvents = appointments.flatMap((appointment) => {
          return appointment.hours.map((hour) => {
            const startTime = `${appointment.date}T${hour}`;
            const endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes() + 15);

            return {
              title: `Rendez-vous avec ${appointment.customer}`,
              start: startTime,
              // end 30 minutes après le début
              end: endTime.toISOString(),
              allDay: false,
            };
          });
        });
        setEvents(newEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  /**
   * @function useEffect2
   * @memberof 'calendrier.js'
   * @description This effect is responsible for sending events to the calendar and calling the handleClick function. It runs when the events state changes.
   * @returns {void}
   * @async
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
        handleClick(
          info.event.start.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
          info.event.start.toLocaleDateString()
        );
      });
    }
  }, [events]);

  /**
   * @function useEffect3
   * @memberof 'calendrier.js'
   * @description This effect sets up the calendar and displays the events. It's run once when the component mounts.
   * @returns {void}
   * @async
   */
  useEffect(() => {
    const widthThreshold = 600; // Seuil de largeur d'écran en pixels
    const sizeScreen = window.innerWidth;
    const initialView = sizeScreen < widthThreshold ? "timeGridDay" : "timeGridWeek";
  
    if (calendarEl.current !== null) {
      const newCalendar = new Calendar(calendarEl.current, {
        initialView,
        firstDay: 1,
        allDaySlot: false,
        slotDuration: "00:15:00",
        slotEventOverlap: false,
        slotMinTime: "09:00:00",
        slotMaxTime: "19:00:00",
        height: "auto",
        headerToolbar: {
          start: "prev,next today",
          center: "title",
          end: initialView,
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
          timeGridDay: {
            type: "timeGrid",
            duration: { days: 1 },
            buttonText: "Jour",
            contentHeight: 500,
            slotLabelFormat: {
              hour: "numeric",
              minute: "2-digit",
              omitZeroMinute: false,
              meridiem: "narrow",
            },
          },
        },
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        locale: "fr", // définit la langue du calendrier en français
        eventContent: function (info) {
          const available = info.event.extendedProps.available;
          const backgroundColor = available ? "#4B7F52" : "#4B7F52"; // Détermine la couleur de fond en fonction de la disponibilité
          const textColor = available ? "white" : "white"; // Détermine la couleur du texte en fonction de la disponibilité
          return {
            html: `<b><div style="text-align: center; cursor: pointer; background-color: ${backgroundColor}; color: ${textColor}; border: "none">${info.event.start.toLocaleTimeString(
              [],
              { hour: "numeric", minute: "2-digit" }
            )}</div></b>`,
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
      <style type="text/css">
        {`
                  .fc-event-main {
                    background-color: green; /* gris clair */ !important
                    color: white; 
                }
                .fc-timegrid-event {
                    background-color: green; /* gris clair */ !important
                }
                
            `}
      </style>
      <Header />
      <div className="container" style={{minHeight: "100vh"}}>
        <div
          ref={calendarEl}
          className="mx-auto"
          style={{ marginTop: "100px", marginBottom: "100px" }}
        ></div>
      </div>
      <Footer />
    </>
  );
}
