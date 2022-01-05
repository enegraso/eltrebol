import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductGrid from "../../components/productGrid";
import { getAllProductsCat } from "../../store/actions/products";
import GridCart from "../carrito/gridCart";
// import Paso1 from '../../components/checkout/paso1'
import Spinner from "../../components/spinner";
import { getConfig } from "../../store/actions/users";
import AbouUs from "../../components/AboutUs";
import NavBar from "../../components/navBar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { MdShoppingCart } from "react-icons/md";

export default function Home() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.Product.allProducts);
  const mensajeno = useSelector((state) => state.Product.alertprod);
  const [viewAlert, setViewAlert] = useState(true);

  useEffect(async () => {
    // console.log('entrando al home')
    await dispatch(getAllProductsCat()); // Pido todos los productos
    await dispatch(getConfig(1)); // Pido los datos de configuración
    // sortCategories(productos)
  }, []);

  const [loading] = useState(false);
  /*    const productos = useSelector(state => state.Product.allProducts); */
  const verCarro = useSelector((state) => state.Carrito.guestCartProd);
  //     console.log(productos," - ", verCarro)
  const configs = useSelector((state) => state.User.configsAdmin);
  const exist = productos.filter(function (productos) {
    return productos.exist === true;
  });

  return (
    <>
      <div className="container" style={{ marginTop: "5.25em" }}>
        <div style={{ width: "100%" }}>
          {!configs.horario ? (
            ""
          ) : (
            <Alert variant="filled" severity="warning">
              <AlertTitle>ATENCION</AlertTitle>
              {configs.horario}
            </Alert>
          )}
        </div>
        {exist.length ? (
          <>
            {viewAlert === true ? (
              <Alert
                onClose={() => {
                  setViewAlert(false);
                }}
                variant="filled"
                severity="info"
              >
                <AlertTitle>INFO</AlertTitle>
                Luego de AGREGAR producto/s, puede modificar las cantidades en{" "}
                <MdShoppingCart style={{ width: "20px", height: "20px" }} />
              </Alert>
            ) : (
              ""
            )}
            <ProductGrid loading={loading} items={exist} />
          </>
        ) : (
          <div>
            {
              /* productos.length &&  */ mensajeno.length ? (
                <Alert severity="warning">
                  <AlertTitle>No se encontró el producto</AlertTitle>Intente
                  escribirlo de otra forma
                </Alert>
              ) : (
                <Spinner />
              )
            }{" "}
          </div>
        )}{" "}
        {verCarro.length ? <GridCart /> : ""}
      </div>
      <AbouUs />
    </>
  );
}
