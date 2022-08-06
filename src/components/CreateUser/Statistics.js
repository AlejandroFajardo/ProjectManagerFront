import React, { Component } from "react";
import Item from "../Login/components/Item";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Select from "react-select";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

const currentTime = new Date();

export default class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      initial_date: currentTime,
      final_date: currentTime,
      nameList: [],
      userList: [],
    };
  }

  getAllUsers() {
    let baseUrl = "http://localhost:4000/getUsers";
    let auxList = [];
    axios
      .get(baseUrl)
      .then((response) => {
        this.setState({userList : response.data});
        response.data.map((celda) => {
          auxList.push({label: celda.User_Name})
        });
        this.setState({ nameList: auxList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    this.getAllUsers();
  }
  
  handleChangeInitialDate = (value) => {
    let newDate = value.toISOString();
    this.setState({ initial_date: newDate });
  };

  handleChangeFinalDate = (value) => {
    let newDate = value.toISOString();
    this.setState({ final_date: newDate });
  };

  handleList = (value) => {
    console.log(value);
  };

  sendParametersEmployee() {
    console.log("Envia información del  usuario");
  }

  render() {
    return (
      <div className="Table">
        <h3 className="LabelTitleComponent">Estadisticas</h3>
        <div className="statistics">
          <div className="item-statistics">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Item text="Fecha de inicio" />
              <DesktopDatePicker
                inputFormat="DD/MM/yyyy"
                value={this.state.initial_date}
                onChange={this.handleChangeInitialDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="item-statistics">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Item text="Fecha final" />
              <DesktopDatePicker
                inputFormat="DD/MM/yyyy"
                value={this.state.final_date}
                onChange={this.handleChangeFinalDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="item-statistics">
            <Item text="Usuario" />
            <Select
              className="select"
              options={this.state.nameList}
              onChange={this.handleList}
            />
          </div>
          <div className="item-statistics">
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => this.sendParametersEmployee()}
              >
                Buscar
              </Button>
            </div>
        </div>
      </div>
    );
  }
}
