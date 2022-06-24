import React, { useState } from "react";
import axios from "axios";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tablaMaterial: {
    minWidth: 800,

  },
}));

function clickProyect(name) {
  console.log(name);
}
function ActivityList() {
  const classes = useStyles();
  // const baseUrl = "http://localhost:4000/getAllProjects";
  // const [data, setData] = useState([]);

  // const peticionesGet = async () => {
  //   await axios
  //     .get(baseUrl)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  var data = [
    {
      project_name: "Actividad1",
      initial_date: "12",
      final_date: "Alta",
      project_status: "Iniciado",
    },
    {
      project_name: "Actividad2",
      initial_date: "12/06/2022",
      final_date: "22/07/2022",
      project_status: "Progreso",
    },
    //   {
    //     project_name: "Diseño red",
    //     initial_date: "12/06/2022",
    //     final_date: "22/07/2022",
    //     project_status: "Finalizado",
    //   },
    //   {
    //     project_name: "Diseño",
    //     initial_date: "12/06/2022",
    //     final_date: "22/07/2022",
    //     project_status: "Iniciado",
    //   },
    //   {
    //     project_name: "Diseño datos",
    //     initial_date: "12/06/2022",
    //     final_date: "22/07/2022",
    //     project_status: "Iniciado",
    //   },
  ];
  return (

    <div class="Table">
      <div className="container">
      <button class="btn_instancia " onclick="/Actividad">crear instancia</button>
      <Link to="/Actividad" style={{ color: "#ff9b2f" }}>Crear Actividad</Link>
      </div>
       
      <h3 class="LabelTitleComponent">Lista de Actividades </h3>
     
      <TableContainer>
        <Table className={classes.peticionesGet}>
          <TableHead>
            <TableRow>
              <TableCell align="center">NOMBRE</TableCell>
              <TableCell align="center">HORAS ESTIMADAS</TableCell>
              <TableCell align="center">PRIORIDAD</TableCell>
              <TableCell align="center">ESTADO</TableCell>
              <TableCell align="center">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value, index) => {
              return (
                <TableRow
                  key={index}
                  onClick={() => clickProyect(value.project_name)}
                >
                  <TableCell align="left">{value.project_name} </TableCell>
                  <TableCell align="center">{value.initial_date}</TableCell>
                  <TableCell align="center">{value.final_date}</TableCell>
                  <TableCell align="center">{value.project_status}</TableCell>
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
export default ActivityList;
