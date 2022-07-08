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
import React from "react";
import Title from "../Login/components/Title";
import { Navigate, Link } from "react-router-dom";
import Item from "../Login/components/Item";

const list = [
  {
    activityId: "1",
    projectId: "10",
    activityName: "Pasar logo a lineas e imprimir",
    estimatedHours: 30,
    priorityId: "Alta",
    statsId: "Pendiente",
  },
  {
    activityId: "2",
    projectId: "11",
    activityName: "Diseñar el brochure",
    estimatedHours: 30,
    priorityId: "Alta",
    statsId: "Pendiente",
  },
  {
    activityId: "3",
    projectId: "12",
    activityName: "Hacer impresion del cartel tridimensional",
    estimatedHours: 30,
    priorityId: "Media",
    statsId: "Pendiente",
  },
  {
    activityId: "4",
    projectId: "13",
    activityName: "Lo ultimo por hacer",
    estimatedHours: 30,
    priorityId: "Alta",
    statsId: "Pendiente",
  },
  {
    activityId: "4",
    projectId: "13",
    activityName: "Lo ultimo por hacer",
    estimatedHours: 30,
    priorityId: "Alta",
    statsId: "Pendiente",
  },
  {
    activityId: "4",
    projectId: "13",
    activityName: "Lo ultimo por hacer",
    estimatedHours: 30,
    priorityId: "Alta",
    statsId: "Pendiente",
  },
  {
    activityId: "4",
    projectId: "13",
    activityName: "Lo ultimo por hacer",
    estimatedHours: 30,
    priorityId: "Alta",
    statsId: "Pendiente",
  },
];
const UserActivities = () => {
  console.log("Estamos en userActitivities");
  return (
    <div className="userActivities">
      <Grid container spacing={3}>
        {list.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ minWidth: 200 }}>
                <CardActionArea
                  className="a4"
                  component={Link}
                  to="/employee/progress"
                >
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      {item.activityName}
                    </Typography>
                    <Typography variant="h6" component="div" color="secondary">
                      {"Prioridad: "}
                      {item.priorityId}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="primary">
                      {"Estado: "}
                      {item.statsId}
                    </Typography>
                    <Typography variant="body2">
                      {"Horas estimadas: "}
                      {item.estimatedHours}
                      <br />
                    </Typography>
                  </CardContent>
                </CardActionArea>
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
};

export default UserActivities;
