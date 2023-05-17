import { useState } from "react";
import Header from "../header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function NoClientRdv() {
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const router = useRouter();
  const param = router.query;
  const cookies = parseCookies();

  const handleChange = (evt) => {
    setDescription(evt.target.value);
    setDescriptionError(event.target.value ? false : true);
  };

  const handleClick = (evt) => {
    evt.preventDefault();
    if (!description) {
      setDescriptionError(true);
      alert("Veuillez entrer une description pour le rendez-vous");
    } else {
      router.push({
        pathname: "../prise_rendez_vous/recap_rdv",
        query: {
          time: param.time,
          service: param.service,
          employee: param.employee,
          date: param.date,
          client: param.client,
          description: description,
        },
      });
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Form>
              <Form.Group controlId="formDescription">
                <h4>Veuillez entrer une description pour le rendez-vous :</h4>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
              <Button
                variant="primary"
                style={{ backgroundColor: "#232627", border: 0 }}
                onClick={handleClick}
              >
                Continuer
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
