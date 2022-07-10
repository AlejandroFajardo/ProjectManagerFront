import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { Component } from "react";

export default class AdvanceList extends Component {
  render() {
    return (
      <div >
        <h3 className="LabelTitleComponent">Avances realizados </h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow hover>
                <TableCell align="center">ID AVANCE</TableCell>
                <TableCell align="center">HORA INICIAL</TableCell>
                <TableCell align="center">HORA FINAL</TableCell>
                <TableCell align="center">DESCRIPCIÓN</TableCell>
                <TableCell align="center">ACTIVIDAD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    {/* <TableCell>
                        
                    </TableCell> */}
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
