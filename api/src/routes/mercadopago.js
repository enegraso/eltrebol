const router = require("express").Router();

//
const { Order } = require("../models/index");

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

const { ACCESS_TOKEN, URL_CLIENT } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

//Ruta que genera la URL de MercadoPago incial para checkout que devuelve id para iniciar el pago
router.post("/checkout", (req, res, next) => {

  console.log(req.body)
  //Para la prueba recibo los parametros del index js dentro de req.body.order 
  const { id, carrito } = req.body;

  // Verificar en caso de que no funcione de pasar los datos por req.body
  // const { id, carrito } = req.body;

  if (!id) return res.status(400).json({ message: "No se ha ingresado id de orden"})
  if (!carrito) return res.status(400).json({ message: "Falta el detalle de la orden"})


  const items_ml = carrito.map((i) => ({
    title: i.name,
    unit_price: i.price,
    quantity: i.quantity,
  }));

  //Tomo ruta/urls backs para enviar a MercadoPago
  var fullUrl = req.protocol + '://' + req.get('host');
  console.log("FULL URL", fullUrl)
  
  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference: `${id}` /* `${id_orden}`,  esto es del ejemplo */,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm",
        },
      ],
      installments: 3, //Cantidad máximo de cuotas
    },
    back_urls: {
      success: `${fullUrl}/mp/pagos`,
      failure: `${fullUrl}/mp/pagos`,
      pending: `${fullUrl}/mp/pagos`,
    },
  };

  mercadopago.preferences
    .create(preference)

    .then(function (response) {
      console.info("respondio");
      //Este valor reemplazará el string"<%= global.id %>" en tu HTML
      global.id = response.body.id;
      console.log(response.body);
      res.json({ id: global.id });
    })
    .catch(function (error) {
      console.log(error);
    });
});

//Ruta que recibe la información del pago
router.get("/pagos", (req, res) => {
  console.info("EN LA RUTA PAGOS ", req);
  const payment_id = req.query.payment_id;
  const payment_status = req.query.status;
  const external_reference = req.query.external_reference;
  const merchant_order_id = req.query.merchant_order_id;
  console.log("EXTERNAL REFERENCE ", external_reference);

  //Aquí edito el status de mi orden
  Order.findByPk(external_reference)
    .then((order) => {
      // EJEMPLO DE ORDER
      order.payd_idml = payment_id;
      order.payd_mlstatus = payment_status;
      order.merchant_order_idml = merchant_order_id;
      // order.status = "completed"
      order.payd = true;
      console.info("Salvando order");
      order
        .save()
        .then((_) => {
          console.info("redirect success");
            return res.redirect(`${URL_CLIENT}`);
        })
        .catch((err) => {
          console.error("error al salvar", err);
               return res.redirect(
            `${URL_CLIENT}/?error=${err}&where=al+salvar`
          );
        });
    })
    .catch((err) => {
      console.error("error al buscar", err);
      return res.redirect(
        `${URL_CLIENT}/?error=${err}&where=al+buscar`
      );
    });

  //proceso los datos del pago
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
});

//Busco información de una orden de pago
router.get("/pagos/:id", (req, res) => {
  const mp = new mercadopago(ACCESS_TOKEN);
  const id = req.params.id;
  console.info("Buscando el id", id);
  mp.get(`/v1/payments/search`, { status: "pending" }) //{"external_reference":id})
    .then((resultado) => {
      console.info("resultado", resultado);
      res.json({ resultado: resultado });
    })
    .catch((err) => {
      console.error("No se consulto:", err);
      res.json({
        error: err,
      });
    });
});

module.exports = router;
