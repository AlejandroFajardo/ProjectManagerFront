import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";

let user_id = localStorage.getItem("user_id");
let dataUser = { user_id: user_id };
const list = [
  {
    advance_id: 1,
    activity_id: 2,
    initial_time: '10:00 am',
    final_time: '12:00 pm',
    advance_comments: 'Se adelanto el proceso de delineado del logo'
  },
  {
    advance_id: 2,
    activity_id: 2,
    initial_time: '10:00 am',
    final_time: '12:00 pm',
    advance_comments: 'Se adelanto el proceso de delineado del logo'
  },
  {
    advance_id: 3,
    activity_id: 1,
    initial_time: '10:00 am',
    final_time: '12:00 pm',
    advance_comments: 'Se adelanto el proceso de delineado del logo'
  },
  {
    advance_id: 4,
    activity_id: 1,
    initial_time: '10:00 am',
    final_time: '12:00 pm',
    advance_comments: 'Se adelanto el proceso de delineado del logo'
  },
]
export default class AdvanceList extends Component {
  constructor() {
    super();
    this.state = {
      advances: [],
    };
  }

  componentDidMount = () => {
    this.getAdvacesForUser();
  };

  getAdvacesForUser() {
    let baseUrl = "http://localhost:4000/getAdvancesByUser";
    axios
      .post(baseUrl, dataUser)
      .then((response) => {
        this.setState({ advances: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return (
      <div>
        <h3 className="LabelTitleComponent">Avances realizados </h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow hover>
                <TableCell align="center">ID AVANCE</TableCell>
                <TableCell align="center">ACTIVIDAD</TableCell>
                <TableCell align="center">HORA INICIAL</TableCell>
                <TableCell align="center">HORA FINAL</TableCell>
                <TableCell align="center">DESCRIPCIÓN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.advances.map((celda) => {
              {/* {list.map((celda) => { */}
                return (
                  <TableRow>
                    <TableCell align='center'>{celda.Advance_Id}</TableCell>
                    <TableCell align='center'>{celda.Activity_Id}</TableCell>
                    <TableCell align='center'>{celda.Initial_Time}</TableCell>
                    <TableCell align='center'>{celda.Final_Time}</TableCell>
                    <TableCell align='center'>{celda.Advance_Comments}</TableCell>
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
