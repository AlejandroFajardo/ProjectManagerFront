import React, { useState } from "react";
import Input from "../Login/components/Input";
import Item from "../Login/components/Item";
import Title from "../Login/components/Title";
import ErrorNotification from "../commons/ErrorNotification";
import Button from "../commons/RegularButton";
import { Navigate, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2,
    color: "#fff",
  },
}));

const Proyect = () => {
  const classes = useStyles();

  const [project_name, setProyect_name] = useState("");
  const [initial_date, setInitial_date] = useState("");
  const [final_date, setfinal_date] = useState("");
  const [project_status, setProject_Status] = useState("");
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    project_nameError: false,
    initial_dateError: false,
    final_dateError: false,
    project_statusError: false,
  });

  let params =
    errors.project_nameError === false &&
    errors.initial_dateError === false &&
    errors.final_dateError === false &&
    errors.project_statusError === false &&
    project_name.length > 1 &&
    initial_date.length > 1;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{4,10}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[a-zA-ZÀ-ÿ\s]{1,12}$/, // Letras y espacios,
    regex_date_validator:
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  };

  function handleChange(name, value) {
    switch (name) {
      case "project_name":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, project_nameError: true });
        } else {
          setErrors({ ...errors, project_nameError: false });
          setProyect_name(value);
        }
        break;

      case "initial_date":
        if (!regular_expression.regex_date_validator.test(value)) {
          setErrors({ ...errors, initial_dateError: true });
        } else {
          setErrors({ ...errors, initial_dateError: false });
          setInitial_date(value);
        }
        break;
      case "final_date":
        if (!regular_expression.regex_date_validator.test(value)) {
          setErrors({ ...errors, final_dateError: true });
        } else {
          setErrors({ ...errors, final_dateError: false });
          setfinal_date(value);
        }
        break;
      case "project_status":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, project_statusError: true });
        } else {
          setErrors({ ...errors, project_statusError: false });
          setProject_Status(value);
        }
        break;

      default:
        console.log("no hay valores.");
    }
  }

  function handleSubmit() {
    setIsLoading(true);
    let account = { project_name, initial_date, final_date, project_status };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("http://localhost:4000/createProject", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_name: project_name,
          initial_date: initial_date,
          final_date: final_date,
          project_status: project_status,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result === "El correo ya se encuentra registrado") {
            }
          },
          (error) => {
            //alert("Registro fallo");
          }
        );
      setTimeout(() => setCreated(true), 2000);
    }
  }

  let open = true;

  let screenWidth = window.innerWidth;

  /*Formulario CreateProject */

  return (
    <>
      {created && <Navigate to="/ " />}
      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Nuevo Proyecto" />}

          <Item text="Nombre del proyecto" />
          <Input
            attribute={{
              name: "project_name",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.project_nameError}
          />
          {errors.project_nameError && (
            <ErrorNotification text="Requerido. Ingrese solo letras max 12" />
          )}

          <Item text="Fecha de inicio" />
          <Input
            attribute={{
              name: "initial_date",
              inputType: "text",
              ph: "dd/mm/aaaa",
            }}
            handleChange={handleChange}
            param={errors.initial_dateError}
          />
          {errors.initial_dateError && (
            <ErrorNotification text="Requerido. Ingrese segun el formato asignado" />
          )}

          <Item text="Fecha final" />
          <Input
            attribute={{
              name: "final_date",
              inputType: "text",
              ph: "dd/mm/aaaa",
            }}
            handleChange={handleChange}
            param={errors.final_dateError}
          />
          {errors.final_dateError && (
            <ErrorNotification text="Required.Ingrese segun el formato asignado" />
          )}

          <Item text="Estado" />
          <Input
            attribute={{
              name: "project_status",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.project_statusError}
          />
          {errors.project_statusError && (
            <ErrorNotification text="Required. Ingrese el estado del proyecto" />
          )}
          <Button text="Guardar" handleOnClick={handleSubmit} param={params} />
        </div>

        {isLoading && (
          <Backdrop open={open} className={classes.backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </>
  );
};

export default Proyect;
