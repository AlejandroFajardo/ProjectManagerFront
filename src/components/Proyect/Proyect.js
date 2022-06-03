import React, { useState } from "react";
import Item from "../Login/components/Item";
import Title from "../Login/components/Title";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Navigate } from "react-router-dom";
import Button from "../commons/RegularButton";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../Login/components/Input";

let screenWidth = window.innerWidth;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2,
    color: "#08eeff",
  },
}));

const Proyect = () => {
  const classes = useStyles();

  const [proyect_name, setProyect_name] = useState("");
  const [initial_date, setInitial_date] = useState("");
  const [final_date, setfinal_date] = useState(false);
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const open = true;

  const [errors, setErrors] = useState({
    proyect_nameError: false,
    initial_dateError: false,
    final_dateError: false,
  });

  function handleChange(name, value) {
    switch (name) {
      case "proyect_name":
        setErrors({ ...errors, proyect_nameError: false });
        setProyect_name(value);
        break;
      case "initial_date":
        setErrors({ ...errors, initial_dateError: false });
        setInitial_date(value);
        break;
      case "final_date":
        setErrors({ ...errors, final_dateError: false });
        setfinal_date(value);
        break;

      default:
        console.log("no hay valores");
    }
  }

  function handleSubmit() {
    setIsLoading(true);
    let account = { proyect_name, initial_date, final_date };
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
          proyect_name: proyect_name,
          initial_date: initial_date,
          final_date: final_date,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result === "proyecto registrado") {
            }
          },
          (error) => {
            alert("Failed");
          }
        );
      setTimeout(() => setCreated(true), 2000);
    }
  }

  let params =
    errors.proyect_nameError === false &&
    errors.initial_dateError === false &&
    errors.final_dateError === false;

  return (
    <>
      {created && <Navigate to="/ " />}

      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Nuevo Proyecto" />}
          <Item text="Nombre del proyecto" />
          <Input
            attribute={{
              name: "proyect_name",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.proyect_nameError}
          />
          {errors.proyect_nameError && (
            <ErrorNotification text="No has ingresado nombre" />
          )}

          <Item text="Fecha inicio" />
          <Input
            attribute={{
              name: "initial_date",
              inputType: "text",
              ph: "DD/MM/AAAA",
            }}
            handleChange={handleChange}
            param={errors.initial_dateError}
          />
          {errors.initial_dateError && <ErrorNotification text="Required." />}

          <Item text="Fecha final" />
          <Input
            attribute={{
              name: "final_date",
              inputType: "text",
              ph: "DD/MM/AAAA",
            }}
            handleChange={handleChange}
            param={errors.final_dateError}
          />
          {errors.final_dateError && <ErrorNotification text="Required." />}

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

const ErrorNotification = ({ text }) => {
  return (
    <div className="errorNotificationContainer">
      <label className="errorNotificationLabel"> {text} </label>
    </div>
  );
};
export default Proyect;
