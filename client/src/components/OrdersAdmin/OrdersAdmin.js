import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getAllOrders,
  getOrder,
  sortUpdated,
  ASC,
  DES,
} from "../../store/actions/orders";
import { Link } from "react-router-dom";
import { MdAttachMoney, MdDeliveryDining, MdMoneyOff } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import Spinner from "../spinner";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const OrdersAdmin = (props) => {
  useEffect(() => {
    props.getAllOrders();
  }, []);

  if (!localStorage.getItem("userInfo"))
    return (
      <Link to="/loginadmin">
        <h5>Debe estar logueado</h5>
      </Link>
    );

  if (!props.allOrders)
    return (
      <>
        <Spinner />{" "}
      </>
    );

  var fecha = "";

  return (
    <>
      {props.allOrders.map((order) => {
        if (order.status === props.status) {
          if (props.status === "pending") {
            fecha = new Date(order.updatedAt);
            return (
              <Grid item xs={12} md={12} p={1} key={order.id}>
                <Paper elevation={3} rounded="true" className="paper-prod">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid item>{fecha.toLocaleString()}</Grid>
                    <Grid item>{order.client}</Grid>
                    <Grid item>
                      {order.delivery === true ? (
                        <MdDeliveryDining
                          style={{ width: "28px", height: "28px" }}
                        />
                      ) : (
                        <HiLocationMarker
                          style={{ width: "28px", height: "28px" }}
                        />
                      )}
                      {order.payd === true ? (
                        <MdAttachMoney
                          style={{ width: "28px", height: "28px" }}
                        />
                      ) : (
                        <MdMoneyOff style={{ width: "28px", height: "28px" }} />
                      )}
                    </Grid>
                    <Grid item>
                      <Link to={`/admin/order/${order.id}`}>
                        <button
                          className="btn btn-primary"
                          onClick={() => props.getOrder(order.id)}
                        >
                          {" "}
                          Preparar{" "}
                        </button>{" "}
                      </Link>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          }
          if (props.status === "preparing") {
            fecha = new Date(order.updatedAt);
            return (
              <Grid item xs={12} md={12} p={1} key={order.id}>
                <Paper elevation={3} rounded="true" className="paper-prod">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid item>{fecha.toLocaleString()} </Grid>
                    <Grid item>{order.client}</Grid>{" "}
                    <Grid item>
                      {order.delivery === true ? (
                        <MdDeliveryDining
                          style={{ width: "28px", height: "28px" }}
                        />
                      ) : (
                        <HiLocationMarker
                          style={{ width: "28px", height: "28px" }}
                        />
                      )}
                      {order.payd === true ? (
                        <MdAttachMoney
                          style={{ width: "28px", height: "28px" }}
                        />
                      ) : (
                        <MdMoneyOff style={{ width: "28px", height: "28px" }} />
                      )}
                    </Grid>
                    <Grid item>
                      <Link to={`/admin/orderprocess/${order.id}`}>
                        <button
                          className="btn btn-primary"
                          onClick={() => props.getOrder(order.id)}
                        >
                          {" "}
                          Enviar/Retira{" "}
                        </button>{" "}
                      </Link>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          }
          if (props.status === "prepared") {
            fecha = new Date(order.updatedAt);
            return (
              <Grid item xs={12} md={12} p={1} key={order.id}>
                <Paper elevation={3} rounded="true" className="paper-prod">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid item>{fecha.toLocaleString()} </Grid>
                    <Grid item>{order.client} </Grid>
                    <Grid item>
                      {order.delivery === true ? (
                        <MdDeliveryDining
                          style={{ width: "28px", height: "28px" }}
                        />
                      ) : (
                        <HiLocationMarker
                          style={{ width: "28px", height: "28px" }}
                        />
                      )}
                      {order.payd === true ? (
                        <MdAttachMoney
                          style={{ width: "28px", height: "28px" }}
                        />
                      ) : (
                        <MdMoneyOff style={{ width: "28px", height: "28px" }} />
                      )}
                    </Grid>
                    <Grid item>
                      <Link to={`/admin/orderdelivered/${order.id}`}>
                        <button
                          className="btn btn-primary"
                          onClick={() => props.getOrder(order.id)}
                        >
                          {" "}
                          Terminar{" "}
                        </button>{" "}
                      </Link>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          }
          if (props.status === "done") {
            fecha = new Date(order.updatedAt);
            return (
              <Grid item xs={12} md={12} p={1} key={order.id}>
                <Paper elevation={3} rounded="true" className="paper-prod">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid item>{fecha.toLocaleString()} </Grid>
                    <Grid item>{order.client}</Grid>
                    <Grid item>
                      {order.delivery === true ? (
                        <MdDeliveryDining
                          style={{ width: "28px", height: "28px" }}
                        />
                      ) : (
                        <HiLocationMarker
                          style={{ width: "28px", height: "28px" }}
                        />
                      )}
                      {order.payd === true ? (
                        <MdAttachMoney
                          style={{ width: "28px", height: "28px" }}
                        />
                      ) : (
                        <MdMoneyOff style={{ width: "28px", height: "28px" }} />
                      )}
                    </Grid>
                    <Grid item>
                      <Link to={`/admin/order/${order.id}`}>
                        <button
                          className="btn btn-primary"
                          onClick={() => props.getOrder(order.id)}
                        >
                          {" "}
                          Ver{" "}
                        </button>{" "}
                      </Link>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          }
        }
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allOrders: state.Order.allOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortUpdated: (order, array) => dispatch(sortUpdated(order, array)),
    getAllOrders: () => dispatch(getAllOrders()),
    getOrder: (id) => dispatch(getOrder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersAdmin);
