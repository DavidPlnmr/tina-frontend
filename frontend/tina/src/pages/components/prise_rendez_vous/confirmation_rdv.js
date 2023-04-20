import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Header from "../header";
import { useRouter, Router } from "next/router";

export default function ConfirmationRdv() {
  const router = useRouter();
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
