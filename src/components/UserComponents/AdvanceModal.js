import React, { Component } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Divider } from "@material-ui/core";
import { Navigate, Link } from "react-router-dom";
import Item from "../Login/components/Item";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default class AdvanceModal extends Component {
  constructor() {
    super();
    this.state = {
      advances: [],
      open: false,
    };
  }

  componentDidMount = () => {
    this.getAdvancesPerActivity();
    this.f();
  };

  async f() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("¡Hecho!"), 2000);
    });
    let result = await promise;
    console.log(result);
  }
  getAdvancesPerActivity() {
    let idActivity = localStorage.getItem("activity_id");
    let activity_id = { activity_id: idActivity };
    let baseUrl = "http://localhost:4000/getAdvancesByActivity";
    axios
      .post(baseUrl, activity_id)
      .then((response) => {
        this.setState({ advances: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleOpen = () => {
    this.getAdvancesPerActivity();
    console.log("Open");
    console.log(this.state.advances);
    this.setState({ open: true });
  };

  handleClose = () => {
    console.log("close");
    let clean = [];
    this.setState({ open: false });
    this.setState({ advances: [] });
    console.log(this.state.advances);
  };

  render() {
    return (
      <div
        onClick={() => {
          this.state.open ? this.handleClose() : this.handleOpen();
        }}
      >
        {/* <Button
          className="a5"
          size="small"
          color="primary"
          onClick={() => {
            this.state.open ? this.handleClose() : this.handleOpen();
            console.log(this.state.open);
          }}
        > */}
        Avances
        {/*   </Button> */}
        <Modal
          open={this.state.open}
          /* onClose={() => {
            this.state.open ? this.handleClose() : this.handleOpen();
            console.log(this.state.open);
          }} */
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              display="inline"
            >
              Avances de esta actividad
            </Typography>
            <Divider />
            <Grid container>
              {this.state.advances.length !== 0 ? (
                this.state.advances.map((celda) => {
                  return (
                    <>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        id del avance: {celda.Advance_Id}
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          id de la actividad: {celda.Activity_Id}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Descripcion: {celda.Advance_Comments}
                        </Typography>
                      </Typography>
                      <Divider />
                      <Button className="a5" size="small" color="primary">
                        <Link
                          className="a5"
                          to="/employee/editadvance"
                          onClick={() => {
                            localStorage.setItem(
                              "id_advance",
                              celda.Advance_Id
                            );
                          }}
                        >
                          <Item
                            className="a5"
                            text="Editar Avance"
                            onClick={() =>
                              localStorage.setItem(
                                "id_advance",
                                celda.Advance_Id
                              )
                            }
                          />
                        </Link>
                      </Button>
                      <Divider />
                    </>
                  );
                })
              ) : (
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  No tiene avances en esta actividad
                </Typography>
              )}
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }
}
