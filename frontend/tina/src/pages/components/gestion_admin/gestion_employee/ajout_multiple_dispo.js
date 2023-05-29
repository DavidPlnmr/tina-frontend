import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function AjoutMultipleDispo() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  const [dispo, setDispo] = useState({start_date: "", end_date: "", disponibilities: {}}); 
  

  const [disponibilities, setDisponibilities] = useState({start_hour: "", end_hour: ""});

  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("1");

  const [days, setDays] = useState("monday");

  const [listDispo, setListDispo] = useState([]);

  const router = useRouter();

  const event = useRef(false);


  const fetchEmployees = () => {
    axios.get(baseUrl + 'employees/', {
      headers: {
        Authorization: `Token ` + cookies.csrftoken,
        },
        })
        .then((response) => {
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

  const handleChangeDispo = (evt) => {
    setDispo({ ...dispo, [evt.target.dataset.id]: evt.target.value});
  }

  const cookies = parseCookies();

  const handleChange = (evt) => {
    
    setDisponibilities({ ...disponibilities, [evt.target.dataset.id]: evt.target.value});
    console.log(disponibilities);
  }

  const handleChangeEmployee = (evt) => {
    setEmployee(evt.target.value);
  }


  const handleChangeDays = (evt) => {
    console.log(evt.target.value);
    setDays(evt.target.value);
  }

  const handleSubmit =  (evt) => {
    evt.preventDefault();
    const myObj = { [days]: disponibilities };
    const newList = [...listDispo, myObj];
    setListDispo(newList);

  if (days !== undefined) {
    setDispo({
      ...dispo,
      disponibilities: {
        ...dispo.disponibilities,
        [days]: disponibilities
      }
    });
  }
  }

  useEffect(() => {
    if (listDispo.length > 0) {
      const id = employee;
      console.log(id);
      console.log(dispo);
      axios.post(baseUrl + 'employees/' + id +'/disponibilities/bulk', dispo, {
        headers: {
          Authorization: `Token ` + cookies.csrftoken,
        },
      })
      .then((response) => {
        console.log(dispo);
        
        alert("Disponibilité ou vacance ajoutée ou modifiée avec succès");
        router.push('/');
      }
      )
      .catch((error) => {
        console.log(error);
        alert("Erreur lors de l'ajout de la disponibilité");
      }
      );
    }
  }, [listDispo]);


  return (
    <>
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#b8aaa0" }}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <Card className="border-0" style={{ backgroundColor: "#b8aaa0", marginTop: "-150px" }}>
            <Card.Body>
              <h2 className="text-center mb-4">Tina Coiffure</h2>
              <Card.Title className="text-center mb-4">Ajout de multiples disponibilités ou vacances</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control data-id="start_date" type="date" placeholder="Date" value={dispo.start_date} onChange={handleChangeDispo} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control data-id="end_date" type="date" placeholder="Date" value={dispo.end_date} onChange={handleChangeDispo} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control data-id="start_hour" type="time" placeholder="Heure de début" value={disponibilities.start_hour} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control data-id="end_hour" type="time" placeholder="Heure de fin" value={disponibilities.end_hour} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                      <select className='form-select' onChange={handleChangeEmployee} data-id="employee" required> 
                        {employees.map((employee) => (
                          <option value={employee.id} >{employee.first_name} {employee.last_name} {"(" + employee.username + ")"}</option>
                        ))}
                      </select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <select className='form-select' onChange={handleChangeDays} data-id="days" required> 
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>q
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                      <p>Qu'êtes vous en train d'ajouter ?</p>
                      <label htmlFor="vacation-oui" style={{marginRight:"8px"}}>Vacances</label>
                      <input type='radio' data-id="vacation" name="vacation" value={1} onChange={handleChange} style={{marginRight:"8px"}}/>
                      <label htmlFor="vacation-non" style={{marginRight:"8px"}}>Disponibilités</label>
                      <input type='radio' data-id="vacation" name="vacation" value={0} onChange={handleChange} required/>
                </Form.Group>

                <Button variant="primary" className='w-100 border-0"' onClick={handleSubmit} style={{ backgroundColor: "black", border: 0 }}>
                  Ajouter 
                </Button>
                <Link href='../gestion_employee/ajout_dispo' class="nav-link">Vous voulez en ajouter un seul ? cliquez ici !</Link>
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