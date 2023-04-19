import { useState, useRef, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import Header from '../header';
import axios from 'axios';
import { parseCookies } from 'nookies';

export default function Calendrier() {
  const [calendar, setCalendar] = useState(null);
  const calendarEl = useRef(null);
  const [events, setEvents] = useState([]);  
  const event = useRef(false);
const cookies = parseCookies();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/appointments/', {
          headers: {
            Authorization: 'Token ' + cookies.csrftoken,
          },
        });
        const appointments = response.data;
        const newEvents = appointments.map(appointment => {
            
            console.log("heure : "  + appointment.time);
            const startTime = `${appointment.date}T${appointment.time}`;
            const endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes() + 30);
            return {
              title: `Rendez-vous avec ${appointment.customer}`,
              start: startTime,
              // end 30 minutes après le début
                end: endTime.toISOString(),
              allDay: false,
            };
          });
          setEvents(newEvents);
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
      console.log(events);
      // Ajouter la classe 'event-passe' aux événements passés
      const maintenant = new Date();
      const eventsPasse = calendar.getEvents().filter((event) => event.start < maintenant);
      eventsPasse.forEach((event) => {
        event.setProp('classNames', ['event-passe']);
      });
    }
  }, [events]);
  
  useEffect(() => {

    if (calendarEl.current !== null) {
        const newCalendar = new Calendar(calendarEl.current, {
            initialView: 'timeGridWeek',
            firstDay: 1,
            allDaySlot: false,
            slotDuration: '00:15:00',
            slotEventOverlap: false,
            headerToolbar: {
                start: 'prev,next today',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek'
            },
            views: {
              timeGridWeek: {
                type: 'timeGrid',
                duration: { weeks: 1 },
                buttonText: 'Semaine',
                contentHeight: 500,
                slotLabelFormat: {
                  hour: 'numeric',
                  minute: '2-digit',
                  omitZeroMinute: false,
                  meridiem: 'narrow'
                },
              },
            },
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
            locale: 'fr', // définit la langue du calendrier en français
            eventContent: function(info) {
                const available = info.event.extendedProps.available;
                const backgroundColor = available ? 'green' : 'gray'; // Détermine la couleur de fond en fonction de la disponibilité
                const textColor = available ? 'white' : 'black'; // Détermine la couleur du texte en fonction de la disponibilité
                return {
                  html: `<div style="background-color: ${backgroundColor}; color: ${textColor};">${info.timeText}</div>`,
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
                    background-color: #a0a0a0; /* gris clair */ !important
                    color: #a0a0a0; /* couleur de texte grisé */
                    display: none; /* masque les événements */
                }
                .fc-timegrid-event {
                    background-color: #a0a0a0; /* gris clair */ !important
                }
                
            `}
        </style>
        <Header/>
            <div className='container'>
                <div ref={calendarEl} className='mx-auto' style={{marginTop: "100px"}}></div>
            </div>

    </>
  );
  
  
}
