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
      projects: [],
    };
  }

  getAllProjects() {
    let baseUrl = "http://localhost:4000/getProjects";
    axios
      .get(baseUrl)
      .then((response) => {
        this.setState({ projects: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Proyecto " + this.state.projects[0]);
  }
  componentDidMount = () => {
    this.getAllProjects();
  };

  render() {
    console.log(this.state.projects);
    return (
      <div class="Table">
        <h3 class="LabelTitleComponent">Lista de Proyectos </h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow hover>
                <TableCell align="center">NOMBRE</TableCell>
                <TableCell align="center">FECHA INICIO</TableCell>
                <TableCell align="center">FECHA FINAL</TableCell>
                <TableCell align="center">ESTADO</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.projects.map((celda) => {
                console.log(celda.Project_Id);
                console.log(this.state.projects);
                return (
                  <TableRow key={celda.Project_Id}>
                    <TableCell align="left">
                      <Link to="/ActividadList">{celda.Project_Name}</Link>
                    </TableCell>
                    <TableCell align="center">{celda.Initial_Date}</TableCell>
                    <TableCell align="center">{celda.Final_Date}</TableCell>
                    <TableCell align="center">{celda.Status_Id}</TableCell>
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