const initialCategories = [
  {
    category: "Almacén",
    description: "Productos de almacén",
  },
  {
    category: "Verdulería",
    description: "Productos frescos verduras y hortalizas",
  },
  {
    category: "Panadería",
    description: "Panificados y facturas",
  },
  {
    category: "Chacinados",
    description: "Embutidos frescos",
  },
  {
    category: "Heladería",
    description: "Helados",
  },
  {
    category: "Carnicería",
    description: "Cortes de carnes y productos",
  },
];
const initialProducts = [
  {
    name: "Arroz fino",
    description: "fideos moño",
    price: 80,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637153957/ycdbi6wudyzcgyt8swkb.png",
    categories: 1,
    units: "paquete",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "pure de tomates",
    description: "",
    price: 45,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637339985/wplz2sayxw2qnwzsvvl1.jpg",
    categories: 1,
    units: "paquete",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Asado",
    description: "",
    price: 500.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637331021/mwuj9qi0uwmpqvviayku.jpg",
    categories: 6,
    units: "Kilos",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Leche entera",
    description: "",
    price: 80.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637332141/urqh3juz754twmtyqtyg.jpg",
    categories: 2,
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Pan para panchos",
    description: "",
    price: 70.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637365967/vyoodsnvyhcvecilbhjt.jpg",
    categories: 1,
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Queso crema",
    description: "",
    price: 190.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637353794/gdytiot21hlb1jn8f7ue.jpg",
    categories: 1,
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Queso Cremón",
    description: "",
    price: 490.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637354111/ccn7yknhbkrhebrbbeww.png",
    categories: 1,
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
];
const initialUsers = [
  {
    name: "Fede OyB",
    username: "fede",
    password: "swordfish",
    mail: "",
  },
  {
    name: "Eve R",
    username: "nins",
    password: "uvita20202",
    mail: "",
  },
  {
    name: "Julio B",
    username: "julio0724",
    password: "fran2407",
    mail: "",
  },
];

const initialOrders = [
    {
        "client":"federico dev 2",
        "cellphone":"2342513085",
        "address":"Saavedra 336",
        "subtotal": 1400,
        "status":"pending",
        "delivery": true,
        "payd": false,
    },
    {
        "client":"Nins Dev 1",
        "cellphone":"2342555555",
        "address":"Sarmiento 336",
        "subtotal": 535,
        "status":"pending",
        "delivery": true,
        "payd": false,
    },
    {
        "client":"Julio Borromeo",
        "cellphone":"2342555552",
        "address":"Los Claveles 285",
        "subtotal": 400,
        "status":"pending",
        "delivery": true,
        "payd": false,
    },
    {
        "client":"Juan Perez",
        "cellphone":"2342588888",
        "address":"Mi dire 285",
        "subtotal": 1705,
        "status":"pending",
        "delivery": true,
        "payd": false,
    }   
]

const initialOrderlines = [
    {
        "productId":3,
        "quantity": 2,
        "price": 500,
        "subtotal": 1000,
        "orderId":1
    },{
        "productId":4,
        "quantity": 5,
        "price": 80,
        "subtotal": 400,
        "orderId":1
    },{
        "productId":1,
        "quantity": 5,
        "price": 80,
        "subtotal": 400,
        "orderId":2
    },{
        "productId":2,
        "quantity": 5,
        "price": 45,
        "subtotal": 135,
        "orderId":2
    },{
        "productId":1,
        "quantity": 5,
        "price": 80,
        "subtotal": 400,
        "orderId":3
    },{
        "productId":1,
        "quantity": 5,
        "price": 80,
        "subtotal": 400,
        "orderId":4
    },{
        "productId":2,
        "quantity": 3,
        "price": 45,
        "subtotal": 135,
        "orderId":4
    },{
        "productId":7,
        "quantity": 2,
        "price": 490,
        "subtotal": 980,
        "orderId":4
    },{
        "productId":6,
        "quantity": 1,
        "price": 190,
        "subtotal": 190,
        "orderId":4
    }
]
const initialConfigs = [
  {
    "business":"Chacinados El Trebol",
    "slogan":"Tu mejor compra online",
    "horario":"Lunes a Sábados de 9 a 13 y 17 a 20, Domingos solo app",
    "messagewaenvio":"Su pedido a sido enviado",
    "messagewaretira":"Su producto está listo para retirarlo",
    "messagewareject":"Su producto ha sido rechazado",
    "deliveryprice":150
  }
]

module.exports = {
  initialCategories,
  initialProducts,
  /*     categoryProducts, */
  initialUsers,
  initialOrders,
  initialOrderlines,
  initialConfigs
};
