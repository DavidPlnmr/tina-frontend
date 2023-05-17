import Header from "../header";
import { useRouter, Router } from "next/router";

/**
 * @namespace 'confirmation_rdv.js'
 * @description This component display the confirmation of an appointment.
 * @returns {JSX.Element} A React functional component rendering the confirmation of an appointment.
 */
export default function ConfirmationRdv() {

  /**
   * @constant router
   * @memberof 'confirmation_rdv.js'
   * @see {@link 'header.js'.router}
   */
  const router = useRouter();

  /**
   * @function handleClick
   * @memberof 'confirmation_rdv.js'
   * @description A function that redirects to the home page.
   * @returns {void}
   */
  const handleClick = () => {
    router.push("/");
  };
  return (
    <>
      <Header />
      <div className="container py-5 jumbotron" style={{ marginTop: "200px" }}>
        <h1 className="text-center mb-5">Merci pour votre réservation !</h1>
        <div className="d-grid gap-3 col-6 mx-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleClick}
            style={{ backgroundColor: "#232627" }}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </>
  );
}
