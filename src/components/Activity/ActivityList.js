import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tablaMaterial: {
    minWidth: 800,
  },
}));

// function selectProject(project) {
//   console.log(project.project_name);
// }

export default class Prueba extends Component {
  constructor() {
    super();
    this.state = {
      activitys: [],
      users: [],
    };
  }

  getActivitiesPerProject() {
    let baseUrl = "http://localhost:4000/getActivity";
    axios
      .get(baseUrl)
      .then((response) => {
        this.setState({ activitys: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  selectActivity(userId) {
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
    this.getActivitiesPerProject();
    this.getAllUsers();
  };

  render() {
    return (
      <div class="Table">
        <div className="regularButtonActivity">
          <Button>
            <Link className="a2" to="/actividad">
              Crear ACTIVIDAD 
            </Link>
          </Button>
        </div>

        <h3 class="LabelTitleComponent">Lista de Actividades </h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow hover>
                <TableCell align="center">NOMBRE</TableCell>
                <TableCell align="center">HORAS ESTIMADAS</TableCell>
                <TableCell align="center">PRIORIDAD</TableCell>
                <TableCell align="center">ESTADO</TableCell>
                <TableCell align="center">RESPONSABLE</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.activitys.map((celda) => {
                return (
                  <TableRow key={celda.Activity_Id}>
                    <TableCell align="left">
                      <Link className="a2" to="/">
                        {celda.Activity_Name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      {celda.Estimated_Hours}
                    </TableCell>
                    <TableCell align="center">{celda.Priority_Id}</TableCell>
                    <TableCell align="center">{celda.Status_Id}</TableCell>
                    <TableCell align="center">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Empleado
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          label="Age"
                          // onChange={handleChange}
                        >
                          {this.state.users.map((nameAc, index) => {
                            return (
                              <MenuItem
                                value={index}
                                onClick={console.log(
                                  "Clicnk en" + nameAc.User_Last_Name
                                )}
                              >
                                {nameAc.User_Name}
                                {console.log("User aca")}
                              </MenuItem>
                            );
                          })}
                          {/* <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <button className="buttonDelete">Eliminar</button>
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
