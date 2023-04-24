import { useState, useEffect } from 'react';
import Header from '../header';
import axios from 'axios';
import { parseCookies } from 'nookies';

export default function ProfilClient() {
  const [customer, setCustomer] = useState({ username: "", email: "", first_name: "", last_name: "" }); 
  const cookies = parseCookies();

useEffect(() => {
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
    fetchCusto();
  }, []);

  const handleChange = (evt) => {
    setCustomer({ ...customer, [evt.target.dataset.id]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(customer);
    // axios put
    // axios.put(
    //   "http://127.0.0.1:8000/api/customers/" + cookies.id + "/",
    //   customer,
    //   {
    //     headers: {
    //       Authorization: "Token " + cookies.csrftoken,
    //     },
    //   }
    // )
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center" style={{marginTop: "10%"}}>
        <div className="card mb-3" style={{ width: "800px" }}>
          <div className="row g-0">
            <div className="col-md-5 col-lg-4 col-xl-3" style={{backgroundColor: "#232627"}}>
              <div className="card-body">
                <h2 className="card-title" style={{color:"white", textAlign:"center"}}>Profil</h2>
              </div>
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9 d-flex align-items-center">
              <form onSubmit={handleSubmit} style={{margin: "15px", width: "100%"}}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Nom d'utilisateur :</label>
                  <input type="text" className="form-control" data-id="username" value={customer.username} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email :</label>
                  <input type="email" data-id="email" className="form-control" id="email" value={customer.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nom :</label>
                  <input type="text" data-id="first_name" className="form-control" id="name" value={customer.first_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="prenom" className="form-label">Prénom :</label>
                  <input type="text" data-id="last_name" className="form-control" id="prenom" value={customer.last_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="pass" className="form-label">Nouveau mot de passe :</label>
                  <input type="password" className="form-control" id="pass" />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPas" className="form-label">Confirmer le nouveau mot de passe :</label>
                  <input type="password" className="form-control" id="confirmPas" />
                </div>
                <button type="submit" className="btn btn-primary" style={{backgroundColor: "#232627", border:0}}>Modifier</button> <br/><br/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
