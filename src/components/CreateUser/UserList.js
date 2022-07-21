import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../../utilities";


const useStyles = makeStyles((theme) => ({
  tablaMaterial: {
    minWidth: 800,
  },
}));

export default class Prueba extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  selectUser(userId) {
    let baseUrl = 'http://localhost:4000/deleteUser'
    axios.post(baseUrl, {
        User_Id : userId})
    .then((response) => {
      console.log(response);
    })
    this.getAllUsers();
  }

  getAllUsers() {
    let baseUrl = "http://localhost:4000/getUsers";
    axios
      .get(baseUrl)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    this.getAllUsers();
  };

  render() {
    console.log(this.state.users);
    return (
      <div class="Table">
        <h3 class="LabelTitleComponent">Lista de Empleados </h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow hover>
                <TableCell align="center">NOMBRE</TableCell>
                <TableCell align="center">APELLIDO</TableCell>
                <TableCell align="center">NUMERO DE DOCUMENTO</TableCell>
                <TableCell align="center">FECHA NACIMIENTO</TableCell>
                <TableCell align="center">SALARIO</TableCell>
                <TableCell align="center">HORAS TRABAJADAS</TableCell>
                <TableCell align="center">CORREO</TableCell>
                <TableCell align="center">TELEFONO</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map((celda) => {
                console.log(celda.User_Id);
                console.log(this.state.users);
                return (
                  <TableRow key={celda.User_Id}>
                    <TableCell align="left">{celda.User_Name}</TableCell>
                    <TableCell align="center">{celda.User_Last_Name}</TableCell>
                    <TableCell align="center">{celda.Document_Id}</TableCell>
                    <TableCell align="center">{formatDate(celda.Birth_Date)}</TableCell>
                    <TableCell align="center">{celda.Salary}</TableCell>
                    <TableCell align="center">{celda.Weekly_Hours}</TableCell>
                    <TableCell align="center">{celda.User_Email}</TableCell>
                    <TableCell align="center">{celda.Phone_Number}</TableCell>
                    <TableCell align="center">
                      <button className="buttonDelete" onClick={() => this.selectUser(celda.User_Id)}>Eliminar</button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
