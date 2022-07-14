import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import axios from "axios";

let user_id = localStorage.getItem("user_id");
let dataUser = { user_id: user_id };
let eventFormat = [];

export default class CalendarAdvance extends Component {
  constructor() {
    super();
    this.state = { advances: [] };
  }

  componentDidMount = () => {
    this.getAdvancesForUser();
    console.log(this.state.advances);
  };

  getAdvancesForUser() {
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

  generateEvent() {
    eventFormat.push(this.state.advances.map());
  }

  render() {
    return (
      <div className="userActivities">
        <div className="Calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            events={this.state.advances}
            // events={[
            //   {
            //     id: 1,
            //     title: "event 1",
            //     start: "2022-07-12T10:30:00",
            //     end: "2022-07-13T11:30:00",
            //   },
            //   { id: 2, title: "event 2", date: "2022-07-13" },
            //   { id: 3, title: "event 3", date: "2022-07-14" },
            // ]}
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
          ></FullCalendar>
        </div>
      </div>
    );
  }
}
