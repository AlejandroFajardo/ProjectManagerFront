import React from "react";
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

function Prueba() {
  const classes = useStyles();
  /*const baseUrl = "http://localhost:4000/createUser";
  const [data, setData] = useState([]);

  const peticionesGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
*/

  var data = [
    {
      project_name: "Maquetado",
      initial_date: "12/06/2022",
      final_date: "22/07/2022",
      project_status: "Iniciado",
    },
    {
      project_name: "Diseño electrico",
      initial_date: "12/06/2022",
      final_date: "22/07/2022",
      project_status: "Progreso",
    },
    {
      project_name: "Diseño red",
      initial_date: "12/06/2022",
      final_date: "22/07/2022",
      project_status: "Finalizado",
    },
    {
      project_name: "Diseño",
      initial_date: "12/06/2022",
      final_date: "22/07/2022",
      project_status: "Iniciado",
    },
    {
      project_name: "Diseño datos",
      initial_date: "12/06/2022",
      final_date: "22/07/2022",
      project_status: "Iniciado",
    },
  ];
  return (
    <div class="Table">
      <h3 class="LabelTitleComponent">Lista deProyectos </h3>
      <TableContainer>
        <Table className={classes.tablaMaterial}>
          <TableHead>
            <TableRow>
              <TableCell align="center">NOMBRE</TableCell>
              <TableCell align="center">FECHA INICIO</TableCell>
              <TableCell align="center">FECHA FINAL</TableCell>
              <TableCell align="center">ESTADO</TableCell>
              <TableCell align="center">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((celda) => (
              <TableRow>
                <TableCell align="left">{celda.project_name}</TableCell>
                <TableCell align="center">{celda.initial_date}</TableCell>
                <TableCell align="center">{celda.final_date}</TableCell>
                <TableCell align="center">{celda.project_status}</TableCell>
                <TableCell align="center">
                  <button className="buttonDelete">Eliminar</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Prueba;
