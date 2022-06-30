import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import Title from "../Login/components/Title";

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
];
const UserActivities = () => {
  console.log("Estamos en userActitivities");
  return (
    <div className="userActivities">
      {list.map((item) => {
        return (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {item.activityName}
              </Typography>
              <Typography variant="h5" component="div">
                {/* be{bull}nev{bull}o{bull}lent */}
                {item.priorityId}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.statsId}
              </Typography>
              <Typography variant="body2">
                {item.estimatedHours}
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default UserActivities;
