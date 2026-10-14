import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(backendUrl + "/api/token", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      sessionStorage.setItem("token", data.token);
      navigate("/private");
    } else alert("Login incorrecto");
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-success">Entrar</button>
      </form>
      <Link to="/signup">Crear cuenta</Link>
    </div>
  );
};