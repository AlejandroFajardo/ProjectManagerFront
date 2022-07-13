import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Divider,
  Paper,
} from "@material-ui/core";
import React, { Component } from "react";
import axios from "axios";
import Title from "../Login/components/Title";
import { Navigate, Link } from "react-router-dom";
import Item from "../Login/components/Item";
import AdvanceList from "./AdvanceList";
import { formatPriority, formatStatus } from "../../utilities";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

let user_id = localStorage.getItem("user_id");
let dataUser = { user_id: user_id };
let data = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2022, 7, 12, 9, 35),
    endDate: new Date(2022, 7, 12, 10, 30),
    id: 0,
    location: "Room 1",
  },
];
export default class UserActivities extends Component {
  constructor() {
    super();
    this.state = { activityList: [] };
  }

  sendIdActivity(activityId) {
    localStorage.setItem("currentActivityUser", activityId);
    let aux = localStorage.getItem("currentActivityUser");
    console.log("id activity" + aux);
  }

  componentDidMount = () => {
    this.getActivitiesUser();
  };

  getActivitiesUser() {
    let baseUrl = "http://localhost:4000/getAllActivityUser";
    axios
      .post(baseUrl, dataUser)
      .then((response) => {
        this.setState({ activityList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="userActivities">
        <div>
          <Grid container spacing={3}>
            {this.state.activityList.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ minWidth: 200 }}>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        {item.Activity_Name}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        color="secondary"
                      >
                        {"Prioridad: "}
                        {formatPriority(item.Priority_Id)}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="primary">
                        {"Estado: "}
                        {formatStatus(item.Status_Id)}
                      </Typography>
                      <Typography variant="body2">
                        {"Horas estimadas: "}
                        {item.Estimated_Hours}
                        <br />
                      </Typography>
                    </CardContent>

                    <Divider variant="middle" />
                    <CardActionArea
                      className="a4"
                      component={Link}
                      to="/employee/advance"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CardActions justify="center">
                        <Button className="a5" size="small" color="primary">
                          <Link
                            className="a5"
                            to="/employee/advance"
                            onClick={() =>
                              this.sendIdActivity(item.Activity_Id)
                            }
                          >
                            <Item
                              className="a5"
                              text="Crear Avance"
                              onClick={() =>
                                this.sendIdActivity(item.Activity_Id)
                              }
                            />
                          </Link>
                        </Button>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
        {/* <div>
          <AdvanceList />
        </div> */}
        <div>
          <FullCalendar
          plugins = {[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={[
            { id: 1, title: 'event 1', start: '2022-07-12T10:30:00', end: '2022-07-13T11:30:00' },
            { id: 2, title: 'event 2', date: '2022-07-13' },
            { id: 3, title: 'event 3', date: '2022-07-14' }
          ]}
          >

          </FullCalendar>
        </div>
      </div>
    );
  }
}
