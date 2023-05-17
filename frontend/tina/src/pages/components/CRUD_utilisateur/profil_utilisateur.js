import { useState, useEffect } from "react";
import Header from "../header";
import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";

/**
 * @namespace ProfilUtilisateurs
 * @description Composant qui permet de gérer le profil de l'utilisateur.
 * @returns {JSX.Element}
 */

export default function ProfilUtilisateurs() {
  /**
   * @constant customer
   * @default
   * @description Les informations de l'utilisateur connecté.
   * @type {object}
   * @memberof ProfilUtilisateurs
   * @property {string} username Le nom d'utilisateur de l'utilisateur.
   * @property {string} email L'email de l'utilisateur.
   * @property {string} first_name Le prénom de l'utilisateur.
   * @property {string} last_name Le nom de l'utilisateur.
   */
  const [customer, setCustomer] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const cookies = parseCookies();
  const router = useRouter();
  const [token, setToken] = useState(null);

  /**
   * @constant role
   * @default null
   * @description Le rôle de l'utilisateur connecté.
   * @memberof ProfilUtilisateurs
   * @type {string}
   * @example "customer"
   */
  const [role, setRole] = useState(null);

  /**
   * @function fetchCusto
   * @async
   * @description Récupère les informations de l'utilisateur connecté si customer.
   * @memberof ProfilUtilisateurs
   * @returns {void}
   */
  const fetchCusto = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/customers/" + cookies.id + "/",
        {
          headers: {
            Authorization: "Token " + cookies.csrftoken,
          },
        }
      );
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @function fetchEmp
   * @async
   * @description Récupère les informations de l'utilisateur connecté si employé.
   * @memberof ProfilUtilisateurs
   * @returns {void}
   */
  const fetchEmp = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/employees/" + cookies.id + "/",
        {
          headers: {
            Authorization: "Token " + cookies.csrftoken,
          },
        }
      );
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @function useEffect
   * @returns {void}
   * @memberof ProfilUtilisateurs
   * @description Définit le token et les informations de l'utilisateur.
   */
  useEffect(() => {
    setToken(cookies.csrftoken);
    setRole(cookies.role);
    if (cookies.role === "customer") {
      fetchCusto();
    } else if (cookies.role === "employee" || cookies.role === "admin") {
      fetchEmp();
    }
  }, []);

  const handleChange = (evt) => {
    setCustomer({ ...customer, [evt.target.dataset.id]: evt.target.value });
  };

  /**
   * @function submitCusto
   * @async
   * @description Envoie les informations de l'utilisateur connecté pour les modifications si customer.
   * @param {object} evt L'évènement de soumission du formulaire.
   * @memberof ProfilUtilisateurs
   * @returns {void}
   */
  const submitCusto = (evt) => {
    evt.preventDefault();
    console.log(customer);

    if (customer.password !== "") {
      if (customer.password === customer.confirm_password) {
        axios
          .patch(
            "http://127.0.0.1:8000/api/customers/" + cookies.id + "/",
            customer,
            {
              headers: {
                Authorization: "Token " + cookies.csrftoken,
              },
            }
          )
          .then((response) => {
            setCookie(null, "username", customer.username, {
              maxAge: 86400,
              path: "/",
            });
            setCookie(null, "email", customer.email, {
              maxAge: 86400,
              path: "/",
            });
            setCookie(null, "first_name", customer.first_name, {
              maxAge: 86400,
              path: "/",
            });
            setCookie(null, "last_name", customer.last_name, {
              maxAge: 86400,
              path: "/",
            });
            router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Les mots de passe ne correspondent pas");
      }
    } else {
      axios
        .patch(
          "http://127.0.0.1:8000/api/customers/" + cookies.id + "/",
          customer,
          {
            headers: {
              Authorization: "Token " + cookies.csrftoken,
            },
          }
        )
        .then((response) => {
          setCookie(null, "username", customer.username, {
            maxAge: 86400,
            path: "/",
          });
          setCookie(null, "email", customer.email, {
            maxAge: 86400,
            path: "/",
          });
          setCookie(null, "first_name", customer.first_name, {
            maxAge: 86400,
            path: "/",
          });
          setCookie(null, "last_name", customer.last_name, {
            maxAge: 86400,
            path: "/",
          });
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /**
   * @function submitEmp
   * @async
   * @description Envoie les informations de l'utilisateur connecté pour les modifications si employé.
   * @param {object} evt L'évènement de soumission du formulaire.
   * @memberof ProfilUtilisateurs
   * @returns {void}
   */
  const submitEmp = (evt) => {
    evt.preventDefault();

    if (customer.password !== "") {
      if (customer.password === customer.confirm_password) {
        axios
          .patch(
            "http://127.0.0.1:8000/api/employees/" + cookies.id + "/",
            customer,
            {
              headers: {
                Authorization: "Token " + cookies.csrftoken,
              },
            }
          )
          .then((response) => {
            setCookie(null, "username", customer.username, {
              maxAge: 86400,
              path: "/",
            });
            setCookie(null, "email", customer.email, {
              maxAge: 86400,
              path: "/",
            });
            setCookie(null, "first_name", customer.first_name, {
              maxAge: 86400,
              path: "/",
            });
            setCookie(null, "last_name", customer.last_name, {
              maxAge: 86400,
              path: "/",
            });
            router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Les mots de passe ne correspondent pas");
      }
    } else {
      axios
        .patch(
          "http://127.0.0.1:8000/api/employees/" + cookies.id + "/",
          customer,
          {
            headers: {
              Authorization: "Token " + cookies.csrftoken,
            },
          }
        )
        .then((response) => {
          setCookie(null, "username", customer.username, {
            maxAge: 86400,
            path: "/",
          });
          setCookie(null, "email", customer.email, {
            maxAge: 86400,
            path: "/",
          });
          setCookie(null, "first_name", customer.first_name, {
            maxAge: 86400,
            path: "/",
          });
          setCookie(null, "last_name", customer.last_name, {
            maxAge: 86400,
            path: "/",
          });
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /**
   * @function handleSubmit
   * @async
   * @description Envoie les informations de l'utilisateur connecté pour les modifications en vérifiant son rôle.
   * @returns {void}
   * @param {object} evt - Évènement.
   * @memberof ProfilUtilisateurs
   */
  const handleSubmit = (evt) => {
    if (cookies.role === "customer") {
      submitCusto(evt);
    } else if (cookies.role === "employee" || cookies.role === "admin") {
      submitEmp(evt);
    }
  };

  const handleDelete = (evt) => {
    evt.preventDefault();
    let response;
    if (confirm("Voulez-vous vraiment supprimer votre compte ?")) {
      if (cookies.role === "customer") {
        response = axios
          .delete("http://127.0.0.1:8000/api/customers/" + cookies.id + "/", {
            headers: {
              Authorization: "Token " + cookies.csrftoken,
            },
          })
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
      } else if (cookies.role === "employee" || cookies.role === "admin") {
        axios
          .delete("http://127.0.0.1:8000/api/employees/" + cookies.id + "/", {
            headers: {
              Authorization: "Token " + cookies.csrftoken,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      Promise.all([
        destroyCookie(null, "id"),
        destroyCookie(null, "csrftoken"),
        destroyCookie(null, "email"),
        destroyCookie(null, "username"),
        destroyCookie(null, "last_name"),
        destroyCookie(null, "first_name"),
        destroyCookie(null, "role"),
      ]).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        router.push("/");
        alert("Votre compte a bien été supprimé !");
      });
    }
  };

  return (
    <>
      <Header />
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "5%" }}
      >
        <div className="card mb-3" style={{ width: "800px" }}>
          <div className="row g-0">
            <div
              className="col-md-5 col-lg-4 col-xl-3"
              style={{ backgroundColor: "#232627" }}
            >
              <div className="card-body">
                <h2
                  className="card-title"
                  style={{ color: "white", textAlign: "center" }}
                >
                  Profil
                </h2>
              </div>
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9 d-flex align-items-center">
              <form
                onSubmit={handleSubmit}
                style={{ margin: "15px", width: "100%" }}
              >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nom d'utilisateur :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    data-id="username"
                    value={customer.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email :
                  </label>
                  <input
                    type="email"
                    data-id="email"
                    className="form-control"
                    id="email"
                    value={customer.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nom :
                  </label>
                  <input
                    type="text"
                    data-id="first_name"
                    className="form-control"
                    id="name"
                    value={customer.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prenom" className="form-label">
                    Prénom :
                  </label>
                  <input
                    type="text"
                    data-id="last_name"
                    className="form-control"
                    id="prenom"
                    value={customer.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                {role === "customer" && (
                  <div className="mb-3">
                    <label htmlFor="tel_number" className="form-label">
                      Numéro de téléphone :
                    </label>
                    <input
                      type="text"
                      data-id="tel_number"
                      className="form-control"
                      id="tel_number"
                      value={customer.tel_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="pass" className="form-label">
                    Nouveau mot de passe :
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    data-id="password"
                    value={customer.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPas" className="form-label">
                    Confirmer le nouveau mot de passe :
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPas"
                    data-id="confirm_password"
                    value={customer.confirm_password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#232627", border: 0 }}
                >
                  Modifier
                </button>{" "}
                <br />
                <br />
                <button
                  className="btn btn-primary"
                  onClick={handleDelete}
                  style={{ backgroundColor: "#C21A09", border: 0 }}
                >
                  Supprimer mon compte
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
