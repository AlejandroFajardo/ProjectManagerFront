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
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
  tablaMaterial: {
    minWidth: 800,
  },
}));

export default class ActivityList extends Component {
  constructor() {
    super();
    this.state = {
      activitys: [],
      users: [],
      activitiesAssignment: [],
    };
  }

  getActivitiesPerProject() {
    const cookies = new Cookies();
    let baseUrl = "http://localhost:4000/getActivity";
    let projectId = cookies.get("currentProjectId");
    let data = { project_id: projectId };
    axios
      .post(baseUrl, data)
      .then((response) => {
        console.log(response.data);
        this.setState({ activitys: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // selectActivity(userId) {
  //   let baseUrl = 'http://localhost:4000/deleteUser'
  //   axios.post(baseUrl, {
  //       User_Id : userId})
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   this.getAllUsers();
  // }

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

  sendAsignament = (activityId, userId) => {
    console.log(activityId, userId);
    let baseUrl = "http://localhost:4000/assignActivityToUser";
    axios.post(baseUrl, {
      activity_id: activityId,
      user_id: userId,
    });
  };

  getActivitiesAssignment = () => {
    let baseUrl = "http://localhost:4000/";
    axios
      .get(baseUrl)
      .then((response) => {
        this.setState({ activitiesAssignment: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteActivity(activityId) {
    let baseUrl = "http://localhost:4000/deleteActivity";
    axios
      .delete(baseUrl, {
        data: { activity_id: activityId },
      })
      .then((response) => {
        console.log(response);
      });
    this.getActivitiesPerProject();
  }

  render() {
    return (
      <div className="Table">
        <div className="regularButtonActivity">
          <Button>
            <Link className="a2" to="/admin/actividad">
              Crear Actividad
            </Link>
          </Button>
        </div>

        <h3 className="LabelTitleComponent">Lista de Actividades </h3>
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
                          {this.state.users.map((userAux, index) => {
                            return (
                              <MenuItem
                                value={userAux.User_Name}
                                onClick={() =>
                                  this.sendAsignament(
                                    celda.Activity_Id,
                                    userAux.User_Id
                                  )
                                }
                              >
                                {userAux.User_Name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <button
                        className="buttonDelete"
                        onClick={() => this.deleteActivity(celda.Activity_Id)}
                      >
                        Eliminar
                      </button>
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
