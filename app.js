const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  addAnswer,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require("@bot-whatsapp/database/mysql");

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = "localhost";
const MYSQL_DB_USER = "prueba";
const MYSQL_DB_PASSWORD = "1234";
const MYSQL_DB_NAME = "prueba";
const MYSQL_DB_PORT = "3306";

const flowProductos = addKeyword([
  "Productos",
  "productos",
  "PRODUCTOS",
]).addAnswer([
  "Ingresa aquí 👇",
  "🔗 https://agencyagartha.cl/shop/",
  "",
  "Para volver atras escriba *pppp* ➡",
]);

const flowAtencionComercial = addKeyword([
  "Atención",
  "atención",
  "ATENCIÓN",
  "Antencion",
  "antencion",
  "ATENCION",
]).addAnswer([
  "En desarrollo",
  "🔗 https://agencyagartha.cl",
  "",
  "Para volver atras escriba *pppp* ➡",
]);

const flowSoporteTecnico = addKeyword([
  "Soporte Técnico",
  "Soporte",
  "soporte",
  "SOPORTE",
]).addAnswer([
  "En desarrollo",
  "🔗 https://agencyagartha.cl",
  "",
  "Para volver atras escriba *pppp* ➡",
]);

const flowSitioNo = addKeyword(["Nnn", "nnn", "NNN"]).addAnswer(
  [
    "Si te interesa crear tu propia página web ingresa aquí 👇",
    "🔗 https://agencyagartha.cl",
    "",
    "Para volver atras escriba *pppp* ➡",
  ],
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("")) {
      return fallBack();
    }
    console.log("Aquí viene todo: ", ctx.body);
  }
);

const flowseo = addKeyword(["sss", "Sss", "SSS"]).addAnswer([
  "https://agencyagartha.cl/local-seo/",
  "",
  "Escriba *pppp* para volver al menu",
]);

const flowsi = addKeyword(["vvv", "VVVV", "Vvv"]).addAnswer(
  [
    "⚠ Antes de indicanos tu página web, sigue el siguiente ejemplo :",
    "",
    "Primero se debe *eliminar* (https://) de la URL 👉 https://agencyagartha.cl",
    "Para luego enviar 👉 *agencyagartha.cl*",
  ],
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("sss")) {
      fallBack(
        "1 ingresa al link para analizar 👇\n\n 2 luego de tu nalisis escribe *SSS* para ayudarte a mejorar la pagina\n\npagespeed.web.dev/analysis?url=https%3A%2F%2F" +
          ctx.body +
          "%2F"
      );
    }

    console.log("Aquí viene todo: ", ctx.body);
  }
);

const flowAnalisis = addKeyword([
  "ANALIZAR",
  "Analizar",
  "analizar",
  "Análisis",
  "Analisis",
  "analisis",
  "ANALISIS",
]).addAnswer(
  [
    "¿Cuentas con una página web?",
    "Coloque *VVV*✅ / Coloque *NNN*❌",
    "",
    "Para volver atras escriba *pppp* ➡",
  ],
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("")) {
      return fallBack();
    }
    console.log("Aquí viene todo: ", ctx.body);
  }
);
const flowServicios = addKeyword([
  "Menú",
  "menú",
  "MENÚ",
  "Menu",
  "menu",
  "MENU",
]).addAnswer([
  "*Menú opciones 👇*",
  "",
  "*Email Marketing*",
  "🔗 https://agencyagartha.cl/email-marketing/",
  "",
  "*Social Media Marketing*",
  "🔗 https://agencyagartha.cl/social-media-marketing//",
  "",
  "*Search Engine Optimization*",
  "🔗 https://agencyagartha.cl/search-engine-optimization/",
  "",
  "*Local SEO*",
  "🔗 https://agencyagartha.cl/local-seo/",
  "",
  "*Pay Per Click*",
  "🔗 https://agencyagartha.cl/pay-per-click-ppc-management/",
  "",
  "*ABC System*",
  "🔗 https://agencyagartha.cl/our-services/",
  "",
  "Para volver atrás escriba *PPPP* ➡",
]);

const flowEscrito = addKeyword(["PPPP", "Pppp", "pppp"]).addAnswer(
  [
    "*Encuentra tu atención aquí 👇*",
    "Para acceder a los servicios escriba el *nombre*",
    "",
    "Para acceder escriba *Menú*",
    "👉 Servicios",
    "",
    "Para acceder escriba *Soporte*",
    "👉 Soporte Técnico",
    "",
    "Para acceder escriba *Atención*",
    "👉 Atención Comercial",
    "",
    "Para acceder escriba *Productos*",
    "👉 Productos",
    "",
    "Para acceder escriba *Análisis*",
    "👉 Analiza tu página web gratis!",
  ],
  null,
  null,
  [
    flowServicios,
    flowAnalisis,
    flowSoporteTecnico,
    flowAtencionComercial,
    flowProductos,
  ]
);

const flowSaludo = addKeyword([
  "HOLA,",
  "Hola",
  "OLA",
  "Ola",
  "hola",
  "ola",
  "BUNENAS",
  "Buenas",
  "buenas",
])
  .addAnswer([
    "Hola 🤖 En *Agartha Marketing Agency* te damos la bienvenida.",
    "Te has comunicado con Agartha Marketing Agency.",
    "",
    "Este es nuestro nuevo sistema de Chat Bot de Autoatención ABC System.",
    "Es una prueba Beta de este sistema por lo que agradecemos tu colaboración y sugerencias.",
    "Esta supervisada en tiempo real por ejecutivos humanos",
    "",
    "Un gusto poder atenderte 🙌",
  ])
  .addAnswer(
    "su codigo de ingreso es *pppp* para ingresar al *Catálogo de Servicios* 📝"
  );

const main = async () => {
  const adapterDB = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT,
  });
  const adapterFlow = createFlow([
    flowSaludo,
    flowEscrito,
    flowsi,
    flowseo,
    flowSitioNo,
  ]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();
