import { useState } from "react";
import Header from "../header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Head from "next/head";

/**
 * @namespace 'no_client_rdv.js'
 * @description This component provides the functionality to give an information about the appointment.
 * @returns {JSX.Element} A React functional component rendering the appointment information form.
 */
export default function NoClientRdv() {

  /**
   * @constant description
   * @memberof 'no_client_rdv.js'
   * @description A description of the appointment.
   * @default ""
   */ 
  const [description, setDescription] = useState("");

  /**
   * @constant descriptionError
   * @memberof 'no_client_rdv.js'
   * @description A boolean to check if the description is empty.
   * @default false
   */
  const [descriptionError, setDescriptionError] = useState(false);

  /**
   * @constant router
   * @memberof 'no_client_rdv.js'
   * @see {@link 'header.js'.router}
   */ 
  const router = useRouter();

  /**
   * @constant param
   * @memberof 'no_client_rdv.js'
   * @see {@link 'calendrier.js'.param}
   */ 
  const param = router.query;

  /**
   * @constant cookies
   * @memberof 'no_client_rdv.js'
   * @see {@link 'header.js'.cookies}
   */ 
  const cookies = parseCookies();

  /**
   * @function handleChange
   * @memberof 'no_client_rdv.js'
   * @description A function that handles the change of the description.
   * @param {Event} evt The event.
   * @returns {void}
   */
  const handleChange = (evt) => {
    setDescription(evt.target.value);
    setDescriptionError(event.target.value ? false : true);
  };

  /**
   * @function handleClick
   * @memberof 'no_client_rdv.js'
   * @description A function that handles the click on the button.
   * @param {Event} evt The event.
   * @returns {void}
   * @async
   */
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
      <Head>
        <title>Tina - Prise de rendez-vous</title>
        <meta name="description" content="Prise de rendez-vous" />
      </Head>
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
