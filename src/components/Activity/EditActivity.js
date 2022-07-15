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
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2,
    color: "#fff",
  },
}));

const Activity = (props) => {
  let Activity_Id = localStorage.getItem("activity_id");
  let activity_name = localStorage.getItem("activity_name");
  let estimated_Hours = localStorage.getItem("activity_estimated_Hours");
  let activity_priority_Id = localStorage.getItem("activity_priority_Id");
  let activity_status_Id = localStorage.getItem("activity_status_Id");
  // console.log(localStorage.getItem("activity_status_Id"));
  let Activity_Description = "";

  const cookies = new Cookies();
  let Project_Id = cookies.get("currentProjectId");
  const classes = useStyles();
  const [Activity_Name, setActivity_name] = useState("");
  const [Estimated_Hours, setEstimate_hours] = useState("");
  const [Priority_Id, setPriority] = useState("");
  const [Status_Id, setStatus] = useState("");
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
    Estimated_Hours.length > 1;

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

  const aux = () => {
    // const { project_id } = this.props.location
    console.log(props);
  };
  //envio de los datos editados
  function handleSubmit() {
    aux();
    setIsLoading(true);
    let account = {
      activity_name: Activity_Name,
      Project_Id,
      Activity_Name,
      Activity_Description,
      Estimated_Hours,
      Priority_Id,
      Status_Id,
    };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("http://localhost:4000/editActivity", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Activity_Id: Activity_Id,
          Project_Id: Project_Id,
          Activity_Name: Activity_Name,
          Activity_Description: "DGHDHDHDHD",
          Estimated_Hours: Estimated_Hours,
          Priority_Id: Priority_Id,
          Status_Id: Status_Id,
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
  //   var Myelement = document.getElementById("activity_name");
  // console.log(Myelement.value);
  // Myelement.value = "New value";
  // console.log(Myelement.value);

  /* Formualrio Create Activity*/

  return (
    <>
      {created && <Navigate to="/admin/ProyectList" />}
      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Editar actividad" />}

          <Item text="Nombre de la actividad" />
          <Input
            attribute={{
              name: "activity_name",
              inputType: "text",
              ph: "",
              defaultValue: activity_name,
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
              contenteditable: "true",
              defaultValue: estimated_Hours,
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
              contenteditable: "true",
              defaultValue: activity_priority_Id,
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
              contenteditable: "true",
              defaultValue: activity_status_Id,
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
