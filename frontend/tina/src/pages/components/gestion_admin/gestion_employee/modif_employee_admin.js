import { useState, useEffect, use } from "react";
import Header from "../../header";
import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import Footer from "../../footer";

/**
 * @namespace 'profil_utilisateur.js'
 * @description This component manages the profile information of the user. It enables profile viewing, modification, and deletion.
 * @returns {JSX.Element} The JSX code for the user profile component.
 */

export default function ModifEmployee() {

  const [employee, setEmployee] = useState({});

  /**
   * @constant cookies
   * @memberof 'profil_utilisateur.js'
   * @see {@link 'header.js'.cookies}
   */
  const cookies = parseCookies();

  /**
   * @constant router
   * @memberof 'profil_utilisateur.js'
   * @see {@link 'header.js'.router}
   */ 
  const router = useRouter();

  /**
   * @constant token
   * @memberof 'profil_utilisateur.js'
   * @see {@link 'header.js'.token}
   */
  const [token, setToken] = useState(null);

  /**
   * @constant role
   * @default null
   * @type {string}
   * @memberof 'profil_utilisateur.js'
   * @description Represents the authenticated user's role. This can be either 'customer', 'employee' or 'admin'.
   * @example "customer"
   */
  const [role, setRole] = useState(null);

  const param = router.query;

  /**
   * @function useEffect
   * @returns {void}
   * @memberof 'profil_utilisateur.js'
   * @description Sets the token and user information when the component is first mounted. If the role of the user is 'customer', it fetches customer data; if the role is 'employee' or 'admin', it fetches employee data.
   */
  useEffect(() => {
    setToken(cookies.csrftoken);
    setRole(cookies.role);
    console.log(param.employee);
    if (param.employee !== undefined) {
      setEmployee(JSON.parse(param.employee));
    } else {
      router.push("./display_employee");
    }
  }, []);

  const handleChange = (evt) => {
    setEmployee({ ...employee, [evt.target.dataset.id]: evt.target.value });
  };

  /**
   * @function submitEmp
   * @async
   * @description This function submits the updated information of the logged-in user if the user is an employee. It does so by making an HTTP PATCH request to the relevant endpoint. If the password is being updated, it ensures that the new password and the confirmation password match. In case of a successful response, it updates the relevant cookies and redirects the user to the home page. If the passwords do not match, it alerts the user.
   * @param {object} evt - The submit event from the form.
   * @memberof 'profil_utilisateur.js'
   * @returns {void}
   */
  const submitEmp = (evt) => {
    evt.preventDefault();

    if (employee.password !== "") {
      if (employee.password === employee.confirm_password) {
        axios
          .patch(
            "http://127.0.0.1:8000/api/employees/" + employee.id + "/",
            employee,
            {
              headers: {
                Authorization: "Token " + cookies.csrftoken,
              },
            }
          )
          .then((response) => {
            router.push("./display_employee");
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
          "http://127.0.0.1:8000/api/employees/" + employee.id + "/",
          customer,
          {
            headers: {
              Authorization: "Token " + cookies.csrftoken,
            },
          }
        )
        .then((response) => {
          router.push("./display_employee");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /**
   * @function handleSubmit
   * @async
   * @description This function submits the updated user information by calling either submitEmp.
   * @param {object} evt - The submit event from the form.
   * @memberof 'profil_utilisateur.js'
   * @returns {void}
   */
  const handleSubmit = (evt) => {
      submitEmp(evt);
  };

  return (
    <>
      <Header />
      <main>
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
                  Employé
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
                    value={employee.username}
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
                    value={employee.email}
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
                    value={employee.first_name}
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
                    value={employee.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pass" className="form-label">
                    Nouveau mot de passe :
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    data-id="password"
                    value={employee.password}
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
                    value={employee.confirm_password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#232627", border: 0 }}
                >
                  Modifier
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
