import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef } from 'react';

const URL_LOGIN = 'http://localhost/integra/api_login.php';

const enviarData = async (URL_LOGIN, data) => {
  const respuesta = await fetch(URL_LOGIN, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await respuesta.json();
  console.log(json);
  return respuesta;
};

export default function Login(props) {
  const refEmail = useRef(null);
  const refClave = useRef(null);

  const handleLogin = async () => {
    // Validar que ambos campos estén completos
    if (!refEmail.current.value || !refClave.current.value) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const data = {
      email: refEmail.current.value,
      clave: refClave.current.value,
    };

    console.log(data);
    const respuestaJson = await enviarData(URL_LOGIN, data);
    props.acceder(respuestaJson);
  };

  return (
    <>
      <container>
        <center>
          <div className="login">
            <div className="row">
              <div className="col sm-3">
                <div className="card">
                  <div className="card-header">
                   
                    <b>♾️ Ingresar</b>
                  </div>
                  <div className="form">
                    <div className="card-body">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          📧
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="E-mail"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          id="refEmail"
                          required
                          ref={refEmail}
                        />
                      </div>

                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          🔒
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Contraseña"
                          aria-label="contraseña"
                          aria-describedby="basic-addon2"
                          id="refClave"
                          required
                          ref={refClave}
                        />
                      </div>
                      <button
                        onClick={handleLogin}
                        className="btn btn-primary btn-lg"
                        type="button"
                      >
                        Inicio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </container>
    </>
  );
}

