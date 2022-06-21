import React from "react";
import { Link } from "react-router-dom";

function Button(){
    retunr (
        <Link to="singup">
            <button className="btn">Iniciar sesión</button>
        </Link>
    )
}

export default Button;