import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./cart.css";
import {
  getGuestCart,
  DecreaseGuestLine,
  removeGuestLine,
} from "../../store/actions/carrito";
import saveToGuestCart from "../../store/actions/carrito";
import { orderline } from "../../components/utils";

//MUI imports ------->
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//------------------->

export default function Cart() {
  const dispatch = useDispatch();
  const orden = useSelector((state) => state.Carrito.guestCart);

  // console.log(orden);
  const guestOrderlines = orderline(orden);

  useEffect(() => {
    dispatch(getGuestCart());
  }, []);

  const orderlines = guestOrderlines.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });

  return (
    <>
      {!orderlines ? (
        <p>Cargando orden...</p>
      ) : (
        orderlines.map((i) => (
          <Grid item xs={12} md={12} p={1} key={i.id}>
            <Paper elevation={3} rounded="true" className="paper-prod">
              <Grid container direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item xs={2.5}>
                  <Avatar
                    className="avatar"
                    src={i.image}
                    alt="product"
                    sx={{ width: 48, height: 48 }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <span className="prod-title"><p className='length'>{i.name}</p></span>

                  <div className="prod-detail">
                    <span className="sum">
                      $ {i.price} x {!Number.isInteger(i.quantity)
                      ? i.quantity.toFixed(3).replace(".", ",")
                      : i.quantity} ={" "}
                    </span>
                    <span className="result"> $ {(i.quantity * i.price).toFixed(2).replace(".", ",")}</span>
                  </div>
                  <Button
                    variant="text"
                    size="10px"
                    onClick={() => dispatch(removeGuestLine(i))}
                  >
                    quitar
                  </Button>
                </Grid>
                <Grid item xs={2.5} alignItems="center">
                  <IconButton
                    color='primary'
                    size="small"
                    onClick={() => {
                      // console.log("SUMO", i);
                      dispatch(saveToGuestCart(i));
                    }}
                  >
                    <ExpandLessIcon />
                  </IconButton>
                  <p>
                    {!Number.isInteger(i.quantity)
                      ? i.quantity.toFixed(3).replace(".", ",")
                      : i.quantity}
                  </p>
                  <IconButton
                    color='primary'
                    size="small"
                    onClick={() =>
                      i.quantity === i.minunit
                        ? dispatch(removeGuestLine(i))
                        : dispatch(DecreaseGuestLine(i))
                    }
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))
      )}
    </>
  );
}
