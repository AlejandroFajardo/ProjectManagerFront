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
    minWidth: 700,
  
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
      user_name: "Maria",
      user_last_name: "Rodriguez",
      identity_document_type: "C",
      identity_document_word: "1049623415",
      birth_date: "18/05/1995",
      salary: "2000000",
      weekly_hours: "48",
      user_email: "Maria23@hotmail.com",
      phone_number: 3217885634,
    },
    {
      user_name: "Juan",
      user_last_name: "Perez",
      identity_document_type: "C",
      identity_document_word: "1049645679",
      birth_date: "17/04/1995",
      salary: "2000000",
      weekly_hours: "48",
      user_email: "Jperez27@hotmail.com",
      phone_number: 3216543236,
    },
  ];
  return (
    <div class="Table">
      <h3 class="LabelTitleComponent">Lista de empleados </h3>
      <TableContainer>
        <Table className={classes.tablaMaterial}>
          <TableHead>
            <TableRow>
              <TableCell align="center">NOMBRE</TableCell>
              <TableCell align="center">APELLIDO</TableCell>
              <TableCell align="center">TIPO DE DOCUMENTO</TableCell>
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
            {data.map((celda) => (
              <TableRow>
                <TableCell align="left">{celda.user_name}</TableCell>
                <TableCell align="center">{celda.user_last_name}</TableCell>
                <TableCell align="center">
                  {celda.identity_document_type}
                </TableCell>
                <TableCell align="center">
                  {celda.identity_document_word}
                </TableCell>
                <TableCell align="center">{celda.birth_date}</TableCell>
                <TableCell align="center">{celda.salary}</TableCell>
                <TableCell align="center">{celda.weekly_hours}</TableCell>
                <TableCell align="center">{celda.user_email}</TableCell>
                <TableCell align="center">{celda.phone_number}</TableCell>
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
