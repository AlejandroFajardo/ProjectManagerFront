import React, { useState } from "react";
import ErrorNotification from "../commons/ErrorNotification";
import Input from "../Login/components/Input";
import Item from "../Login/components/Item";
import Title from "../Login/components/Title";
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

const Activity = () => {
  const project_id = 1;
  const classes = useStyles();
  const [activity_name, setActivity_name] = useState("");
  const [estimated_hours, setEstimate_hours] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    activity_nameError: false,
    estimated_HoursError: false,
    priority_Error: false,
    status_Error: false,
  });

  let params =
    errors.activity_nameError === false &&
    errors.estimated_HoursError === false &&
    errors.status_Error === false &&
    errors.priority_Error === false &&
    estimated_hours.length > 1;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{4,10}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[a-zA-ZÀ-ÿ\s]{1,12}$/, // Letras y espacios,
    numbers: /^(([1-9]*)|(([1-9]*)\.([0-9]*)))$/,
    regex_date_validator:
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  };

  function handleChange(name, value) {
    switch (name) {
      case "activity_name":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, activity_nameError: true });
        } else {
          setErrors({ ...errors, activity_nameError: false });
          setActivity_name(value);
        }
        break;
      case "estimated_hours":
        if (!regular_expression.numbers.test(value)) {
          setErrors({ ...errors, estimated_HoursError: true });
        } else {
          setErrors({ ...errors, estimated_HoursError: false });
          setEstimate_hours(value);
        }
        break;
      case "priority":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, priority_NameError: true });
        } else {
          setErrors({ ...errors, priority_NameError: false });
          setPriority(value);
        }
        break;
      case "status":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, status_Error: true });
        } else {
          setErrors({ ...errors, status_Error: false });
          setStatus(value);
        }
        break;

      default:
        console.log("No hay valores");
        break;
    }
  }

  // Aca se realiza el envio de datos, revisar como se envia el Json de esta parte

  function handleSubmit() {
    setIsLoading(true);
    let account = {
      project_id,
      activity_name,
      estimated_hours,
      priority,
      status,
    };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("http://localhost:4000/createActivity", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: project_id,
          activity_name: activity_name,
          estimated_hours: estimated_hours,
          priority: priority,
          status: status,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // if(result === "La actividad ya se encuentra registrada"){
            // }
          },
          (error) => {
            // alert("Registro fallooooo");
          }
        );
      setTimeout(() => setCreated(true), 2000);
    }
  }

  let open = true;
  let screenWidth = window.innerWidth;

  /* Formualrio Create Activity*/

  return (
    <>
      {created && <Navigate to="/ " />}
      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Nueva actividad" />}

          <Item text="Nombre de la actividad" />
          <Input
            attribute={{
              name: "activity_name",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.activity_nameError}
          />
          {errors.activity_nameError && (
            <ErrorNotification text="Requerido. Ingrese solo letras" />
          )}
          <Item text="Horas estimadas" />
          <Input
            attribute={{
              name: "estimated_hours",
              inputType: "text",
              ph: "Horas estimas para esta actividad",
            }}
            handleChange={handleChange}
            param={errors.estimated_HoursError}
          />
          {errors.estimated_HoursError && (
            <ErrorNotification text="Requerido. Ingrese solo letras" />
          )}

          <Item text="Prioridad" />
          <Input
            attribute={{
              name: "priority",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.priority_Error}
          />
          {errors.priority_Error && (
            <ErrorNotification text="Requerido. Ingrese solo letras" />
          )}

          <Item text="Estado" />
          <Input
            attribute={{
              name: "status",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.status_Error}
          />
          {errors.status_Error && (
            <ErrorNotification text="Requerido. Ingrese solo letras" />
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

export default Activity;
