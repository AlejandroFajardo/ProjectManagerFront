import { Link } from "react-router-dom";
import logo from "../images/logo.png";

export const Header = () => {
  return (
    <header>
      <div className="menu">
        <box-icon name="menu"></box-icon>
      </div>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="P-WorkFlow" width="200" />
        </div>
      </Link>

      <ul>
        <li>
          <Link to="/">Cerrar Sesion</Link>
        </li>

        <li>
          <Link to="/Proyect">Crear Proyecto</Link>
        </li>
        <li>
          <Link to="/CreateUser">Crear Usuarios</Link>
        </li>
        <li>
          <Link to="/Activity">Crear Actividad</Link>
        </li>
      </ul>
    </header>
  );
};
