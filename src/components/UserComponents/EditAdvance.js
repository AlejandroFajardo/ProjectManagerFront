import React, { Component } from "react";
import Input from "../Login/components/Input";
import Item from "../Login/components/Item";
import Title from "../Login/components/Title";
import ErrorNotification from "../commons/ErrorNotification";
import Button from "../commons/RegularButton";
import { Navigate, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

let currentActivity = localStorage.getItem("currentActivityUser");
let currentUser = localStorage.getItem("user_id");
let currentAdvance = localStorage.getItem("id_advance");

const regular_expression = {
  name: /^[a-zA-Z0-9_-]{1,20}$/, // Letras, numeros, guion y guion_bajo
  letters: /^[\w'\-][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*\-(){}|~<>;:[\]]{1,60}$/, // Letras y espacios,
  number: /^\d{1,6}$/, // 1 a 10 numeros.,
  regex_date_validator:
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  hour: /^(?:0?[1-9]|1[0-2]):[0-5][0-9]\s?(?:[aApP](\.?)[mM]\1)$/,
};

let params =
  this.state.errors.currentDayError === false &&
  this.state.errors.Initial_TimeError === false &&
  this.state.errors.Final_TimeError === false &&
  this.state.errors.advanceDescriptionError === false &&
  this.state.currentDay.length > 1 &&
  this.state.Initial_Time.length > 1 &&
  this.state.Final_Time.length > 1;

let openn = true;

let screenWidthh = window.innerWidth;

export default class EditAdvance extends Component {
  constructor() {
    super();
    this.state = {
      advances: [],
      classes: [
        {
          zIndex: 2,
          color: "#fff",
        },
      ],
      currentDay: "",
      Initial_Time: "",
      Final_Time: "",
      advanceDescription: "",
      created: false,
      isLoading: false,
      errors: [
        {
          currentDayError: false,
          Initial_TimeError: false,
          Final_TimeError: false,
          advanceDescriptionError: false,
        },
      ],
    };
  }

  componentDidMount = () => {
    this.getAdvance();
  };

  handleChange(name, value) {
    switch (name) {
      case "currentDay":
        if (!regular_expression.regex_date_validator.test(value)) {
          this.setState({ ...this.state.errors, currentDayError: true });
        } else {
          this.setState({ ...this.state.errors, currentDayError: false });
          this.setState({ currentDay: value });
        }
        break;

      case "Initial_Time":
        if (!regular_expression.hour.test(value)) {
          this.setState({ ...this.state.errors, Initial_TimeError: true });
        } else {
          this.setState({ ...this.state.errors, Initial_TimeError: false });
          this.setState({ Initial_Time: value });
        }
        break;
      case "Final_Time":
        if (!regular_expression.hour.test(value)) {
          this.setState({ ...this.state.errors, Final_TimeError: true });
        } else {
          this.setState({ ...this.state.errors, Final_TimeError: false });
          this.setState({ Final_Time: value });
        }
        break;
      case "advanceDescription":
        if (!regular_expression.letters.test(value)) {
          this.setState({
            ...this.state.errors,
            advanceDescriptionError: true,
          });
        } else {
          this.setState({
            ...this.state.errors,
            advanceDescriptionError: false,
          });
          this.setState({ advanceDescription: value });
        }
        break;

      default:
        console.log("no hay valores.");
    }
  }

  handleSubmit() {
    this.setState({ isLoading: true });
    let account = {
      activity_id: currentActivity,
      user_id: currentUser,
      advance_day: this.state.currentDay,
      comments: this.state.advanceDescription,
      initial_hour: this.state.Initial_Time,
      final_hour: this.state.Final_Time,
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
          advance_id: currentAdvance,
          user_id: currentUser,
          activity_id: currentActivity,
          advance_day: this.state.currentDay,
          comments: this.state.advanceDescription,
          initial_hour: this.state.Initial_Time,
          final_hour: this.state.Final_Time,
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
      setTimeout(() => this.setState({ created: true }), 2000);
    }
  }

  getAdvance() {
    let advance_id = { activity_id: currentAdvance };
    let baseUrl = "http://localhost:4000/getAdvanceToEdit";
    axios
      .post(baseUrl, advance_id)
      .then((response) => {
        this.setState({ advances: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    this.getAdvance();
    return (
      <>
        {this.state.advances.map((celda) => {
          <>
            {this.state.created && <Navigate to="/employee/Activities " />}
            <div className="createUserContent">
              <div className="formCreateProyect">
                {screenWidthh > 1030 && <Title text="Editar Avance" />}

                <Item text="Dia" />
                <Input
                  attribute={{
                    name: "currentDay",
                    inputType: "text",
                    ph: "dd/mm/aaaa",
                    value: celda.Initial_Time,
                  }}
                  handleChange={this.handleChange}
                  param={this.state.errors.currentDayError}
                />
                {this.state.errors.currentDayError && (
                  <ErrorNotification text="Requerido. Ingrese segun el formato" />
                )}

                <Item text="Hora de inicio" />
                <Input
                  attribute={{
                    name: "Initial_Time",
                    inputType: "text",
                    ph: "HH:mm",
                  }}
                  handleChange={this.handleChange}
                  param={this.state.errors.Initial_TimeError}
                />
                {this.state.errors.Initial_TimeError && (
                  <ErrorNotification text="Requerido. Ingrese segun el formato asignado" />
                )}

                <Item text="Hora final" />
                <Input
                  attribute={{
                    name: "Final_Time",
                    inputType: "text",
                    ph: "HH:mm",
                  }}
                  handleChange={this.handleChange}
                  param={this.state.errors.Final_TimeError}
                />
                {this.state.errors.Final_TimeError && (
                  <ErrorNotification text="Required.Ingrese segun el formato asignado" />
                )}
                <Item text="Descripcion" />
                <Input
                  attribute={{
                    name: "advanceDescription",
                    inputType: "text",
                    ph: "",
                    value: celda.Advance_Comments,
                  }}
                  handleChange={this.handleChange}
                  param={this.state.errors.advanceDescriptionError}
                />
                {this.state.errors.advanceDescriptionError && (
                  <ErrorNotification text="Requerido. Ingrese solo letras max 30" />
                )}
                <Button
                  text="Guardar"
                  handleOnClick={this.handleSubmit}
                  param={params}
                />
              </div>

              {this.state.isLoading && (
                <Backdrop open={openn} className={this.state.classes}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </div>
          </>;
        })}
      </>
    );
  }
}
