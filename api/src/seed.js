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
    units: "paquete",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "pure de tomates Arcor",
    description: "",
    price: 45,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1638126205/Pure-de-Tomate-Arcor-520-Gr_udawl2.png",
    units: "paquete",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Asado de tira",
    description: "",
    price: 500.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1638127386/tira-de-asado_z0zi47.jpg",
    units: "Kilos",
    minunit: 0.25,
    stepunit: 0.25,
  },
  {
    name: "Leche entera",
    description: "",
    price: 80.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637332141/urqh3juz754twmtyqtyg.jpg",
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
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Agua mineral",
    description: "",
    price: 70.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637120621/xgfeltjoukvrcnbxdq7i.jpg",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Harina Blancaflor",
    description: "",
    price: 100.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637080234/jabzrqpaidjo0bcr6ac0.jpg",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Aceite Cañuelas 900ml",
    description: "",
    price: 180.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637080148/jgtaq59rgpv68vkkcn6t.jpg",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Lomos de atun en aceite",
    description: "",
    price: 230.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637035857/slj5oyvuhntprojoqvks.jpg",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Puré de tomates Salsati",
    description: "",
    price: 180.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1638126205/Pure-de-Tomate-Salsatti-520-Gr_qeqebl.jpg",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Espirales anti mosquitos Raid",
    description: "",
    price: 230.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637706340/rsdfzz9lfo0habc1atol.png",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Espirales MosquiTrap",
    description: "",
    price: 200.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637686052/rykmz2f3kuu3cjywvb8h.jpg",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Prepizza casera",
    description: "",
    price: 100.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1637364091/hzmrva921m0gntuhfic7.jpg",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Puré de tomates Campagnola",
    description: "",
    price: 250.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1638126205/Pure-De-Tomate-La-Campagnola-520-Gr_ju2ehr.jpg",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
  },
  {
    name: "Vacio",
    description: "",
    price: 600.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1638127279/vacio01_qckkes.jpg",
    units: "Kilos",
    minunit: 0.25,
    stepunit: 0.25,
  },
  {
    name: "Matambre",
    description: "",
    price: 450.0,
    exist: true,
    image:
      "https://res.cloudinary.com/dyejl1qrj/image/upload/v1638127280/matambre_gka2jb.png",
    units: "Kilos",
    minunit: 1,
    stepunit: 1,
  },
];

const categoryProducts = [
  { categoryId: 1, productId: 1 },
  { categoryId: 1, productId: 2 },
  { categoryId: 1, productId: 4 },
  { categoryId: 1, productId: 6 },
  { categoryId: 1, productId: 7 },
  { categoryId: 1, productId: 8 },
  { categoryId: 1, productId: 9 },
  { categoryId: 1, productId: 10 },
  { categoryId: 1, productId: 11 },
  { categoryId: 1, productId: 12 },
  { categoryId: 1, productId: 13 },
  { categoryId: 1, productId: 14 },
  { categoryId: 1, productId: 15 },
  { categoryId: 1, productId: 16 },
  { categoryId: 3, productId: 5 },
  { categoryId: 6, productId: 3 },
  { categoryId: 6, productId: 17 },
  { categoryId: 6, productId: 18 },
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
    client: "federico dev 2",
    cellphone: "2342513085",
    address: "Saavedra 336",
    subtotal: 1400,
    status: "pending",
    delivery: true,
    payd: false,
  },
  {
    client: "Nins Dev 1",
    cellphone: "2342555555",
    address: "Sarmiento 336",
    subtotal: 535,
    status: "pending",
    delivery: true,
    payd: false,
  },
  {
    client: "Julio Borromeo",
    cellphone: "2342555552",
    address: "Los Claveles 285",
    subtotal: 400,
    status: "pending",
    delivery: true,
    payd: false,
  },
  {
    client: "Juan Perez",
    cellphone: "2342588888",
    address: "Mi dire 285",
    subtotal: 1705,
    status: "pending",
    delivery: true,
    payd: false,
  },
];

const initialOrderlines = [
  {
    productId: 3,
    quantity: 2,
    price: 500,
    subtotal: 1000,
    orderId: 1,
  },
  {
    productId: 4,
    quantity: 5,
    price: 80,
    subtotal: 400,
    orderId: 1,
  },
  {
    productId: 1,
    quantity: 5,
    price: 80,
    subtotal: 400,
    orderId: 2,
  },
  {
    productId: 2,
    quantity: 5,
    price: 45,
    subtotal: 135,
    orderId: 2,
  },
  {
    productId: 1,
    quantity: 5,
    price: 80,
    subtotal: 400,
    orderId: 3,
  },
  {
    productId: 1,
    quantity: 5,
    price: 80,
    subtotal: 400,
    orderId: 4,
  },
  {
    productId: 2,
    quantity: 3,
    price: 45,
    subtotal: 135,
    orderId: 4,
  },
  {
    productId: 7,
    quantity: 2,
    price: 490,
    subtotal: 980,
    orderId: 4,
  },
  {
    productId: 6,
    quantity: 1,
    price: 190,
    subtotal: 190,
    orderId: 4,
  },
];
const initialConfigs = [
  {
    business: "Chacinados El Trebol",
    slogan: "Tu mejor compra online",
    horario: "Lunes a Sábados de 9 a 13 y 17 a 20, Domingos solo app",
    messagewaenvio: "Su pedido a sido enviado",
    messagewaretira: "Su producto está listo para retirarlo",
    messagewareject: "Su producto ha sido rechazado",
    deliveryprice: 150,
  },
];

module.exports = {
  initialCategories,
  initialProducts,
  categoryProducts,
  initialUsers,
  initialOrders,
  initialOrderlines,
  initialConfigs,
};
