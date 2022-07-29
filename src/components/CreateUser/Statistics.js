import React, { Component } from "react";
import Item from "../Login/components/Item";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Select from "react-select";

const currentTime = new Date();

export default class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      initial_date: currentTime,
      final_date: currentTime,
      userList: [{user1: 'User 1'}, {user2: 'User 2'}, {user3: 'User 3 '},],
    };
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
          <div className='item-statistics'>
          <Item text="Usuario" />
          <Select
            className='select'
            options={this.state.userList}
            onChange={this.handleList}
          />
          </div>
        </div>
      </div>
    );
  }
}
