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

const CreateUser = () => {
  const classes = useStyles();

  const [user_name, setUser_name] = useState("");
  const [user_last_name, setUser_last_name] = useState("");
  const [identity_document_type, setIdentity_document_type] = useState("");
  const [identity_document_word, setIdentity_document_word] = useState("");
  const [bird_date, setBird_date] = useState("");
  const [salary, setSalary] = useState("");
  const [weekly_hours, setWeekly_hours] = useState("");
  const [user_mail, setUser_mail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [user_password, setUser_password] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const [errors, setErrors] = useState({
    usernameError: false,
    lastNameError: false,
    identity_document_typeError: false,
    identity_document_wordError: false,
    bird_dateError: false,
    salaryError: false,
    weeklyError: false,
    user_mailError: false,
    phone_numberError: false,
    user_passwordError: false,
    passwordAgainError: false,
  });

  function handleChange(name, value) {
    switch (name) {
      case "username":
        if (value < 1) {
          setErrors({ ...errors, usernameError: true });
        } else {
          setErrors({ ...errors, usernameError: false });
          setUser_name(value);
        }
        break;

      case "lastName":
        if (value < 1) {
          setErrors({ ...errors, lastNameError: true });
        } else {
          setErrors({ ...errors, lastNameError: false });
          setUser_last_name(value);
        }
        break;
      case "identity_document_type":
        if (value < 1) {
          setErrors({ ...errors, identity_document_typeError: true });
        } else {
          setErrors({ ...errors, identity_document_typeError: false });
          setIdentity_document_type(value);
        }
        break;
      case "identity_document_word":
        if (value < 1) {
          setErrors({ ...errors, identity_document_wordError: true });
        } else {
          setErrors({ ...errors, identity_document_wordError: false });
          setIdentity_document_word(value);
        }
        break;
      case "bird_date":
        if (value < 1) {
          setErrors({ ...errors, bird_dateError: true });
        } else {
          setErrors({ ...errors, bird_dateError: false });
          setBird_date(value);
        }
        break;

      case "salary":
        if (value < 1) {
          setErrors({ ...errors, salaryError: true });
        } else {
          setErrors({ ...errors, salaryError: false });
          setSalary(value);
        }
        break;
      case "weekly_hours":
        if (value < 1) {
          setErrors({ ...errors, weeklyError: true });
        } else {
          setErrors({ ...errors, weeklyError: false });
          setWeekly_hours(value);
        }
        break;
      case "user_mail":
        if (value < 1) {
          setErrors({ ...errors, user_mailError: true });
        } else {
          setErrors({ ...errors, user_mailError: false });
          setUser_mail(value);
        }
        break;
      case "phone_number":
        if (value < 1) {
          setErrors({ ...errors, phone_numberError: true });
        } else {
          setErrors({ ...errors, phone_numberError: false });
          setPhone_number(value);
        }
        break;

      case "password":
        if (value < 1) {
          setErrors({ ...errors, passwordError: true });
        } else {
          setErrors({ ...errors, passwordError: false });
          setUser_password(value);
        }
        break;
      case "passwordAgain":
        if (user_password.length < 6) {
          setErrors({ ...errors, passwordError: true });
        } else if (user_password === value) {
          setErrors({
            ...errors,
            passwordError: false,
            passwordAgainError: false,
          });
          setPasswordAgain(value);
        } else {
          setErrors({
            ...errors,
            passwordError: false,
            passwordAgainError: true,
          });
        }
        break;
      default:
        console.log("no hay valores.");
    }
  }

  let params =
    errors.usernameError === false &&
    errors.lastNameError === false &&
    errors.salaryError === false &&
    errors.passwordError === false &&
    errors.passwordAgainError === false &&
    user_name.length > 1 &&
    user_last_name.length > 1 &&
    salary.length > 1 &&
    user_password.length > 5 &&
    user_password === passwordAgain;
  function handleSubmit() {
    setIsLoading(true);
    let account = {
      user_name,
      user_last_name,
      identity_document_type,
      identity_document_word,
      bird_date,
      salary,
      weekly_hours,
      user_mail,
      phone_number,
      user_password,
    };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("http://localhost:4000/createUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: user_name,
          user_last_name: user_last_name,
          identity_document_type: identity_document_type,
          identity_document_word: identity_document_word,
          bird_date: bird_date,
          salary: salary,
          weekly_hours: weekly_hours,
          user_mail: user_mail,
          phone_number: phone_number,
          user_password: user_password,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result === "El correo ya se encuentra registrado") {
            }
          },
          (error) => {
            alert("Failed");
          }
        );
      setTimeout(() => setCreated(true), 2000);
    }
  }

  let open = true;

  let screenWidth = window.innerWidth;
  console.log(identity_document_type);

  /*Formulario CreateUser */

  return (
    <>
      {created && <Navigate to="/ " />}
      <div className="createUserContent">
        <div className="formCreateUser">
          {screenWidth > 1030 && <Title text="Registrar" />}

          <Item text="Nombre" />
          <Input
            attribute={{
              name: "username",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.usernameError}
          />
          {errors.usernameError && <ErrorNotification text="Required." />}

          <Item text="Apellido" />
          <Input
            attribute={{
              name: "lastName",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.lastNameError}
          />
          {errors.lastNameError && <ErrorNotification text="Required." />}

          <Item text="seleccione el tipo de documento" />
          <Input
            attribute={{
              name: "identity_document_type",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.identity_document_typeError}
          />
          {errors.identity_document_typeError && (
            <ErrorNotification text="Required." />
          )}

          <Item text="ingrese numero de identidad" />
          <Input
            attribute={{
              name: "identity_document_word",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.identity_document_wordError}
          />
          {errors.identity_document_wordError && (
            <ErrorNotification text="Required." />
          )}

          <Item text="Fecha de nacimiento" />
          <Input
            attribute={{
              name: "bird_date",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.bird_dateError}
          />
          {errors.bird_dateError && <ErrorNotification text="Required." />}

          <Item text="Salario" />
          <Input
            attribute={{
              name: "salary",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.salaryError}
          />
          {errors.salaryError && <ErrorNotification text="Required." />}

          <Item text="Horas de trabajo semanales" />
          <Input
            attribute={{
              name: "weekly_hours",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.weeklyError}
          />
          {errors.weeklyError && <ErrorNotification text="Required." />}

          <Item text="Correo Electronico" />
          <Input
            attribute={{
              name: "user_mail",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.user_passwordError}
          />
          {errors.user_passwordError && <ErrorNotification text="Required." />}

          <Item text="Telefono" />
          <Input
            attribute={{
              name: "phone_number",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.phone_numberError}
          />
          {errors.phone_numberError && <ErrorNotification text="Required." />}

          <Item text="Password" />
          <Input
            attribute={{
              name: "password",
              inputType: "password",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.passwordError}
          />
          {errors.passwordError && (
            <ErrorNotification text="min. 6 characters" />
          )}

          <Item text="Confirmar password" />
          <Input
            attribute={{
              name: "passwordAgain",
              inputType: "password",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.passwordAgainError}
          />
          {errors.passwordAgainError && (
            <ErrorNotification text="Password don't match" />
          )}

          <Button text="Guardar" handleOnClick={handleSubmit} param={params} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/login" style={{ color: "#ff9b2f" }}>
              <Item text="Volver pagina login" />
            </Link>
          </div>
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

export default CreateUser;
