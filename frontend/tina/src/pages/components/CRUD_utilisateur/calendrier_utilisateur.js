import { useState, useRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import Header from "../header";
import axios from "axios";
import { addMinutes } from 'date-fns';
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Footer from "../footer";


export default function CalendrierClient() {
    const [calendar, setCalendar] = useState(null);
    const calendarEl = useRef(null);
    const [events, setEvents] = useState([]);
    const event = useRef(false);
    const cookies = parseCookies();
    const router = useRouter();
    let customer = null;
    let information = null;

    const handleClick = (id) => {
      router.push({
        pathname: "/components/CRUD_utilisateur/CRUD_my_rdv/detail_rdv",
        query: {id: id},
      });
    };

  
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
                appointments.filter((a) =>{return a.status === "pending" || a.status === "accepted"}).map(async (appointment) => {
                  
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
                    console.log(appointment.customer);
                    let response4 = null;
                    if (appointment.customer != null) {
                       response4 = await axios.get(
                        "http://127.0.0.1:8000/api/customers/" + appointment.customer + "/",
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
                    const start = new Date(`${appointment.date}T${appointment.time}`);
                    const end = addMinutes(start, service.duration.slice(3, 5));
                    if (cookies.role === "customer") {
                        myTitle = `Service : ${service.name} avec ${employee.first_name} ${employee.last_name} (cliquez pour gérer le rendez-vous)`;
                      
                    } else if (cookies.role === "employee") {
                      if (appointment.customer != null) {
                        myTitle = `Service : ${service.name} avec le client ${customer.first_name} ${customer.last_name} (cliquez pour gérer le rendez-vous)`;
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
  
    useEffect(() => {
      if (calendarEl.current !== null) {
        const newCalendar = new Calendar(calendarEl.current, {
          initialView: "listWeek",
          firstDay: 1,
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
          eventContent: function (info) {
            const available = info.event.extendedProps.available;
            const backgroundColor = available ? "#1338BE" : "#1338BE" ; // Détermine la couleur de fond en fonction de la disponibilité
            const title = info.event.title;
            const textColor = available ? "white" : "black"; // Détermine la couleur du texte en fonction de la disponibilité
            return {
              html: `<div style="text-align: center; background-color: ${backgroundColor}; color: white; font-size:12px;"><div >${title}</div></b></div>`,
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
                      background-color: #1AA7EC; /* gris clair */ !important
                      color: white; 
                  }
                  .fc-timegrid-event {
                      background-color: #1AA7EC; /* gris clair */ !important
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
        <Footer />
      </>
  );
}