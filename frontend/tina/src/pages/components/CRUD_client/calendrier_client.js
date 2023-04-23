import { useState, useRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Header from "../header";
import axios from "axios";
import { parseCookies } from "nookies";


export default function CalendrierClient() {
    const [calendar, setCalendar] = useState(null);
    const calendarEl = useRef(null);
    const [events, setEvents] = useState([]);
    const event = useRef(false);
    const cookies = parseCookies();
    const [service, setService] = useState();

  
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
                appointments.map(async (appointment) => {
                  // Fetch service info for each appointment
                  const response2 = await axios.get(
                    "http://127.0.0.1:8000/api/services/" + appointment.service + "/",
                    {
                      headers: {
                        Authorization: "Token " + cookies.csrftoken,
                      },
                    }
                  );
                  const service = response2.data;

                  const response3 = await axios.get(
                    "http://127.0.0.1:8000/api/employees/" + appointment.employee + "/",
                    {
                      headers: {
                        Authorization: "Token " + cookies.csrftoken,
                      },
                    }
                  );
                    const employee = response3.data;
                  // Create event object with service info
                  return {
                    id: appointment.id,
                    title: `Service : ${service.name} avec ${employee.first_name} ${employee.last_name}`,
                    start: `${appointment.date}T${appointment.time}`,
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
  
    useEffect(() => {
      if (calendarEl.current !== null) {
        const newCalendar = new Calendar(calendarEl.current, {
          initialView: "timeGridWeek",
          firstDay: 1,
          allDaySlot: false,
          slotDuration: "00:15:00",
          slotEventOverlap: false,
          slotMinTime: "09:00:00",
          slotMaxTime: "19:00:00",
          headerToolbar: {
            start: "prev,next today",
            center: "title",
            end: "timeGridWeek,listWeek",
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
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
          locale: "fr", // définit la langue du calendrier en français
          eventContent: function (info) {
            const available = info.event.extendedProps.available;
            const backgroundColor = available ? "green" : "green"; // Détermine la couleur de fond en fonction de la disponibilité
            const textColor = available ? "white" : "black"; // Détermine la couleur du texte en fonction de la disponibilité
            return {
              html: `<div style="text-align: center; background-color: ${backgroundColor}; color: white; font-size:12px;"><b><div>${info.event.start.toLocaleTimeString(
                [],
                { hour: "numeric", minute: "2-digit" }
              )}</div><br><div >${info.event.title}</div></b></div>`,
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
        <div className="container">
          <div
            ref={calendarEl}
            className="mx-auto"
            style={{ marginTop: "100px", marginBottom: "100px" }}
          ></div>
        </div>
      </>
  );
}