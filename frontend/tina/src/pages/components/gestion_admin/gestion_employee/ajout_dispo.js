import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AjoutDispo() {

  const [dispo, setDispo] = useState([
    {
        date: "",
        start_hour: "",
        end_hour: "",
        employee: "",
        vacation: ""
    }
  ]);

  const  [employees, setEmployees] = useState([]);
  const router = useRouter();

  const fetchEmployees = () => {
    const cookies = parseCookies();
    axios.get('http://127.0.0.1:8000/api/employees/', {
      headers: {
        Authorization: `Token ` + cookies.csrftoken,
        },
        })
        .then((response) => {
          setEmployees(response.data);
          if (dispo.employee === undefined){
            setDispo({ ...dispo, employee: response.data[0].id});
          }
        }
        )
        .catch((error) => {
        console.log(error);
        }
        );
  }


  useEffect(() => {
    fetchEmployees();
  } , []);

  const handleSubmit =  (evt) => {
    const cookies = parseCookies();

    evt.preventDefault();

    console.log(dispo.employee);

    axios.post('http://127.0.0.1:8000/api/employees/' + dispo.employee +'/disponibilities/', dispo, {
      headers: {
        Authorization: `Token ` + cookies.csrftoken,
      },
    })
    .then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.data.vacation === false){
        alert("Disponibilité ajoutée");
      } else {
        alert("Vacances ajoutées");
      }
      router.push("/components/gestion_admin/dash_admin");
    })
    .catch((error) => {
      console.log(error);
    });

  }

  const handleChange = (evt) => {
      setDispo({ ...dispo, [evt.target.dataset.id]: evt.target.value});
  };

  return (
    <>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
              <Card className="border-0" style={{ backgroundColor: "#b8aaa0", marginTop: "-150px" }}>
                <Card.Body>
                  <h2 className="text-center mb-4">Tina Coiffure</h2>
                  <Card.Title className="text-center mb-4">Ajout d'une disponibilité ou de vacances pour un employé</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control data-id="date" type="date" placeholder="Date" value={dispo.date} onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control data-id="start_hour" type="time" placeholder="Heure de début" value={dispo.start_hour} onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control data-id="end_hour" type="time" placeholder="Heure de fin" value={dispo.end_hour} onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <select className='form-select' onChange={handleChange} data-id="employee" required> 
                        {employees.map((employee) => (
                          <option value={employee.id} >{employee.first_name} {employee.last_name} {"(" + employee.username + ")"}</option>
                        ))}
                      </select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <p>Qu'êtes vous en train d'ajouter ?</p>
                      <label htmlFor="vacation-oui" style={{marginRight:"8px"}}>Vacances</label>
                      <input type='radio' data-id="vacation" name="vacation" value={1} onChange={handleChange} style={{marginRight:"8px"}}/>
                      <label htmlFor="vacation-non" style={{marginRight:"8px"}}>Disponibilités</label>
                      <input type='radio' data-id="vacation" name="vacation" value={0} onChange={handleChange} required/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className='w-100 border-0"' style={{ backgroundColor: "black", border: 0 }}>
                      Ajouter 
                    </Button>
                    <Link href='./ajout_multiple_dispo' class="nav-link">Vous voulez en ajouter plusieurs ? cliquez ici !</Link>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}