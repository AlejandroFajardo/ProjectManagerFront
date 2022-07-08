import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Divider,
} from "@material-ui/core";
import React, { Component } from "react";
import axios from "axios";
import Title from "../Login/components/Title";
import { Navigate, Link } from "react-router-dom";
import Item from "../Login/components/Item";

let user_id = localStorage.getItem("user_id");
let dataUser = { user_id: user_id };
export default class UserActivities extends Component {
  constructor() {
    super();
    this.state = { activityList: [] };
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
                        {item.Priority_Id}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="primary">
                        {"Estado: "}
                        {item.Status_Id}
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
                    to="/employee/progress"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CardActions justify="center">
                      <Button className="a5" size="small" color="primary">
                        <Link className="a5" to="/employee/progress">
                          <Item className="a5" text="Crear Avance" />
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
    );
  }
}
