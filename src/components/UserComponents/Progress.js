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
  const [Initial_Time, setInitial_Time] = useState("");
  const [Final_Time, setFinal_Time] = useState("");
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
    Initial_Time.length > 1;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{4,10}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[a-zA-ZÀ-ÿ\s]{1,12}$/, // Letras y espacios,
    number: /^\d{1,6}$/, // 1 a 10 numeros.,
    regex_date_validator:
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  };

  function handleChange(name, value) {
    switch (name) {
      case "day":
        if (!regular_expression.regex_date_validator.test(value)) {
          setErrors({ ...errors, project_nameError: true });
        } else {
          setErrors({ ...errors, project_nameError: false });
          setProyect_name(value);
        }
        break;

      case "initial_time":
        if (!regular_expression.number.test(value)) {
          setErrors({ ...errors, initial_dateError: true });
        } else {
          setErrors({ ...errors, initial_dateError: false });
          setInitial_Time(value);
        }
        break;
      case "final_time":
        if (!regular_expression.number.test(value)) {
          setErrors({ ...errors, final_dateError: true });
        } else {
          setErrors({ ...errors, final_dateError: false });
          setFinal_Time(value);
        }
        break;
      case "description":
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
    let account = {
      project_name,
      initial_date: Initial_Time,
      final_date: Final_Time,
      project_status,
    };
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
          initial_date: Initial_Time,
          final_date: Final_Time,
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
      {created && <Navigate to="/admin/proyectList " />}
      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Nuevo Avance" />}

          <Item text="Dia" />
          <Input
            attribute={{
              name: "dia",
              inputType: "text",
              ph: "dd/mm/aaaa",
            }}
            handleChange={handleChange}
            param={errors.project_nameError}
          />
          {errors.project_nameError && (
            <ErrorNotification text="Requerido. Ingrese segun el formato" />
          )}

          <Item text="Hora de inicio" />
          <Input
            attribute={{
              name: "initial_time",
              inputType: "text",
              ph: "HH:mm:ss",
            }}
            handleChange={handleChange}
            param={errors.initial_dateError}
          />
          {errors.initial_dateError && (
            <ErrorNotification text="Requerido. Ingrese segun el formato asignado" />
          )}

          <Item text="Hora final" />
          <Input
            attribute={{
              name: "final_time",
              inputType: "text",
              ph: "HH:mm:ss",
            }}
            handleChange={handleChange}
            param={errors.final_dateError}
          />
          {errors.final_dateError && (
            <ErrorNotification text="Required.Ingrese segun el formato asignado" />
          )}
          <Item text="Descripcion" />
          <Input
            attribute={{
              name: "description",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.project_nameError}
          />
          {errors.project_nameError && (
            <ErrorNotification text="Requerido. Ingrese solo letras max 12" />
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
