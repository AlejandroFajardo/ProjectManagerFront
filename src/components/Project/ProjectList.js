import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ActivityList from "../Activity/ActivityList";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";

const cookies = new Cookies();
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
  }

  componentDidMount = () => {
    this.getAllProjects();
  };

  sendIdProject(projectId) {
    cookies.set("currentProjectId", projectId, { path: "/" });
    let pid = cookies.get("currentProjectId");
  }

  deletProject(projectId) {
    let baseUrl = "http://localhost:4000/deleteProject";
    axios
      .delete(baseUrl, {
        data: {
          project_id: projectId,
        },
      })
      .then((response) => {
        console.log(response);
      });
    this.getAllProjects();
  }

  render() {
    console.log(this.state.projects);
    return (
      <div className="Table">
        <h3 className="LabelTitleComponent">Lista de Proyectos </h3>
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
                return (
                  <TableRow key={celda.Project_Id}>
                    <TableCell align="left">
                      <Link
                        className="a2"
                        to={{
                          pathname: "/admin/ActividadList",
                          // pathname: "/proyectList",
                          project_id: celda.Project_Id,
                        }}
                        onClick={() => this.sendIdProject(celda.Project_Id)}
                      >
                        {celda.Project_Name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{celda.Initial_Date}</TableCell>
                    <TableCell align="center">{celda.Final_Date}</TableCell>
                    <TableCell align="center">{celda.Status_Id}</TableCell>
                    <TableCell align="center">
                      <button
                        className="buttonDelete"
                        onClick={() => this.deletProject(celda.Project_Id)}
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
{
  /* <ActivityList sendIdProject={this.state.current_projectId}/> */
}
