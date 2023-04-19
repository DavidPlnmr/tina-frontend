import { useState, useRef, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import Header from '../header';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter, Router } from 'next/router';


export default function Calendrier() {
  const [calendar, setCalendar] = useState(null);
  const calendarEl = useRef(null);
  const [events, setEvents] = useState([]);  
  const event = useRef(false);
  const cookies = parseCookies();
  const router = useRouter();
  const param  = router.query;

const handleClick = (time, date) => {
  router.push({
    pathname: "/components/prise_rendez_vous/recap_rdv",
    query: { time: time, service: param.service, employee: param.employee, date: date },
  });
};

  useEffect(() => {
    console.log("param : ");
    console.log(param);
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/appointment_available/?service=' + JSON.parse(param.service).id, {
          headers: {
            Authorization: 'Token ' + cookies.csrftoken,
          },
        });
        const appointments = response.data;
        const newEvents = appointments.flatMap(appointment => {
          return appointment.hours.map(hour => {
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

  useEffect(() => {
    if (calendar !== null && events.length > 0) {
         if (event.current) return;
        event.current = true;
      calendar.addEventSource(events);
      // Ajouter la classe 'event-passe' aux événements passés
      const maintenant = new Date();
      const eventsPasse = calendar.getEvents().filter((event) => event.start < maintenant);
      eventsPasse.forEach((event) => {
        event.setProp('classNames', ['event-passe']);
      });

      calendar.setOption('eventClick', (info) => {
        handleClick(info.event.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), info.event.start.toLocaleDateString());
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
            slotMinTime: '09:00:00',
            slotMaxTime: '19:00:00',
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
                const backgroundColor = available ? 'green' : 'green'; // Détermine la couleur de fond en fonction de la disponibilité
                const textColor = available ? 'white' : 'black'; // Détermine la couleur du texte en fonction de la disponibilité
                return {
                  html: `<b><div style="text-align: center; background-color: ${backgroundColor}; color: white;">${info.event.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div></b>`,
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
        <Header/>
            <div className='container'>
                <div ref={calendarEl} className='mx-auto' style={{marginTop: "100px"}}></div>
            </div>

    </>
  );
  
  
}
