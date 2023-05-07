import { useEffect, useState } from 'react';
import Header from '../../header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { set } from 'date-fns';

export default function AjoutDispo() {

  const [dispo, setDispo] = useState([
    {
        date: "",
        start_hour: "",
        end_hour: "",
        employee: "",
        vacation: "0"
    }
  ]);

  const  [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    const cookies = parseCookies();
    axios.get('http://127.0.0.1:8000/api/employees/', {
      headers: {
        Authorization: `Token ` + cookies.csrftoken,
        },
        })
        .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
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

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit =  (evt) => {
    const cookies = parseCookies();

    evt.preventDefault();

    if (dispo.vacation == "on") {
      setDispo({ ...dispo, vacation: "1" });
    }

    if (dispo.vacation == "") {
      console.log("test");
      setDispo({ ...dispo, vacation: "0" });
    }
    console.log(dispo);

    axios.post('http://127.0.0.1:8000/api/employees/' + dispo.employee +'/disponibilities/', dispo, {
      headers: {
        Authorization: `Token ` + cookies.csrftoken,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  const handleChange = (evt) => {
    console.log(evt.target.value);
    if (dispo.vacation == "" || evt.target.value == "off") {
      setDispo({ ...dispo, [evt.target.dataset.id]: evt.target.value, vacation: "0" });
    } else {
      setDispo({ ...dispo, [evt.target.dataset.id]: evt.target.value, vacation: "1" });
    }
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
                  <Card.Title className="text-center mb-4">Ajout d'une disponibilité d'un employé</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control data-id="date" type="date" placeholder="Date" value={dispo.date} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control data-id="start_hour" type="time" placeholder="Heure de début" value={dispo.start_hour} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control data-id="end_hour" type="time" placeholder="Heure de fin" value={dispo.end_hour} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <select className='form-select' onChange={handleChange} data-id="employee" > 
                        {employees.map((employee) => (
                          <option value={employee.id} >{employee.first_name} {employee.last_name} {"(" + employee.username + ")"}</option>
                        ))}
                      </select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <label for="vacation" style={{marginRight: "7px"}}>Vacances ? : </label>
                    <input type='checkbox' data-id="vacation" onChange={handleChange}/>
                      
                    </Form.Group>

                    <Button variant="primary" type="submit" className='w-100 border-0"' style={{ backgroundColor: "black", border: 0 }}>
                      Ajouter 
                    </Button>
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