import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    fetch(backendUrl + "/api/private", {
      headers: { "Authorization": "Bearer " + token }
    }).then(async res => {
      if (!res.ok) { sessionStorage.removeItem("token"); navigate("/login"); return; }
      const data = await res.json();
      setUser(data.user);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Página Privada</h2>
      {user ? <p>Bienvenido {user.email}</p> : <p>Cargando...</p>}
    </div>
  );
};