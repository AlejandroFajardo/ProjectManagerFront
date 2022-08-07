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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2,
    color: "#fff",
  },
}));

const EditAdvance = () => {
  const classes = useStyles();

  let currentActivity = localStorage.getItem('currentActivityUser');
  let currentUser = localStorage.getItem('user_id');

  let advanceId = localStorage.getItem("advance_id");
  let initialTime = localStorage.getItem("initial_time");
  let finalTime = localStorage.getItem("final_time");
  let description = localStorage.getItem("description");
  let currentActivityId = localStorage.getItem("currentActivityId");

  console.log('id activity' + currentActivity);
  const [currentDay, setCurrentDay] = useState("");
  const [Initial_Time, setInitial_Time] = useState(initialTime);
  const [Final_Time, setFinal_Time] = useState(finalTime);
  const [advanceDescription, setAdvanceDescription] = useState("");
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    Initial_TimeError: false,
    Final_TimeError: false,
    advanceDescriptionError: false,
  });

  let params =
    errors.Initial_TimeError === false &&
    errors.Final_TimeError === false &&
    errors.advanceDescriptionError === false &&
    advanceDescription.length > 1;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{1,20}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[\w'\-][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*\-(){}|~<>;:[\]]{1,60}$/, // Letras y espacios,
    number: /^\d{1,6}$/, // 1 a 10 numeros.,
    regex_date_validator:
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
    hour: /^(?:0?[1-9]|1[0-2]):[0-5][0-9]\s?(?:[aApP](\.?)[mM]\1)$/,
  };

  const handleInitialHour = (newInitialTime) => {
    setErrors({ ...errors, Initial_TimeError: false });
    setInitial_Time(newInitialTime.toISOString());
    setErrors({ ...errors, Final_TimeError: false });
    setFinal_Time(newInitialTime.toISOString());
  };

  const handleFinalHour = (newFinalTime) => {
    setErrors({ ...errors, Final_TimeError: false });
    setFinal_Time(newFinalTime.toISOString());
  };

  function handleChange(name, value) {
    switch (name) {
      case "advanceDescription":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, advanceDescriptionError: true });
        } else {
          setErrors({ ...errors, advanceDescriptionError: false });
          setAdvanceDescription(value);
        }
        break;

      default:
        console.log("no hay valores.");
    }
  }

  function handleSubmit() {
    setIsLoading(true);
    let account = {
      activity_id: currentActivity,
      user_id: currentUser,
      comments: advanceDescription,
      initial_hour: Initial_Time,
      final_hour: Final_Time,
    };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("http://localhost:4000/editAdvance", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          advance_id: advanceId,
          comments: advanceDescription,
          initial_hour: Initial_Time,
          final_hour: Final_Time,
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
      {created && <Navigate to="/employee/Activities " />}
      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Editar Avance" />}
          <Item text="Hora de inicio" />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              value={Initial_Time}
              onChange={handleInitialHour}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {errors.Initial_TimeError && (
            <ErrorNotification text="Requerido. Ingrese segun el formato asignado" />
          )}

          <Item text="Hora final" />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              value={Final_Time}
              onChange={handleFinalHour}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {errors.Final_TimeError && (
            <ErrorNotification text="Required.Ingrese segun el formato asignado" />
          )}
          <Item text="Descripcion" />
          <Input
            attribute={{
              name: "advanceDescription",
              inputType: "text",
              ph: "",
              defaultValue: description,
            }}
            handleChange={handleChange}
            param={errors.advanceDescriptionError}
          />
          {errors.advanceDescriptionError && (
            <ErrorNotification text="Requerido. Ingrese solo letras max 30" />
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

export default EditAdvance;
