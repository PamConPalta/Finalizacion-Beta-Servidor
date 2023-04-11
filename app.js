const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require("@bot-whatsapp/database/mysql");
const mysql = require("mysql");

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = "65.109.88.87";
const MYSQL_DB_USER = "vinto_wp655";
const MYSQL_DB_PASSWORD = "1234agartha";
const MYSQL_DB_NAME = "vinto_wp655";
const MYSQL_DB_PORT = "3306";

const connection = mysql.createConnection({
  host     : MYSQL_DB_HOST,
  user     : MYSQL_DB_USER,
  password : MYSQL_DB_PASSWORD,
  database : MYSQL_DB_NAME
});


const flowSecundario = addKeyword(["1"]).addAnswer(
  "preciona el link👉🏻https://agencyagartha.cl/shop/"
);
const flowpregunta = addKeyword(["2"]).addAnswer(
  "preciona el link👉🏻https://agencyagartha.cl/our-services/"
);
const flowcanva = addKeyword(["3"]).addAnswer(
  "preciona el link👉🏻https://www.canva.com/es_mx/pro/"
);
const flowmegusto = addKeyword(["7"]).addAnswer("😃");
const flownomegusto = addKeyword(["8"]).addAnswer("😡");
const flowcomentario = addKeyword([
  "finalizar",
  "Finalizar",
  "fin",
  "terminar",
  "Terminar",
]).addAnswer([
  "Gracias!!😁 por comunicarte con *Agarta Marketing gency*",
  "",
  "estaremos en contacto nuevamente !!!",
]);

const flowpmenu = addKeyword(["menu", "Menu", "MENU", "Listado"]).addAnswer([
  "MENU📝",
  "",
  "Email",
  "",
  "-https://agencyagartha.cl/email-marketing/ ☑",
  "",
  "Media",
  "",
  "https://agencyagartha.cl/social-media-marketing/☑",
  "",
  "SEO",
  "",
  " - https://agencyagartha.cl/search-engine-optimization/☑",
  "",
  "Local",
  "",
  " - https://agencyagartha.cl/local-seo/",
  "",
  "Click",
  " - https://agencyagartha.cl/pay-per-click-ppc-management/☑",
  "",
  "",
  "ABC",
  "",
  "  - https://agencyagartha.cl/our-services/ ☑",
]);

const flowAgartha = addKeyword(["Agartha", "documentacion", "documentación"]);

const flowTerminar = addKeyword(["Gracias", "grac"]).addAnswer(
  [
    "🚀 Puedes aportar tu granito de arena a este proyecto",
    "[*opencollective*] https://opencollective.com/bot-whatsapp",
    "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
    "[*patreon*] https://www.patreon.com/leifermendez",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowSaludo = addKeyword(["Hola", "Buenas", "HOLA", "Hola"])
  .addAnswer([
    "Hola 😁 En Agartha Marketing Agency te damos la bienvenida.",
    "Te has comunicado con Agartha Marketing Agency.",
    "",
    "Este es nuestro nuevo sistema de Chat Bot de Autoatención ABC System.",
    "Es una prueba Beta de este sistema por lo que agradecemos tu colaboración y sugerencias.",
    "Esta supervisada en tiempo real por ejecutivos humanos",
    "",
    "Un gusto porder atenderte 🙌",
  ])

  .addAnswer(
    "Tu nombre?",
    { capture: true },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes(String)) {
        return fallBack();
      }
    }
  )

  .addAnswer(
    "¿Tu Apellido Paterno?",
    { capture: true  },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("")) {
        return fallBack();
      }
      paterno = ctx.body
    }
  )
  .addAnswer(
    "Apellido Materno",
    { capture: true  },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("")) {
        return fallBack();
      }
      materno = ctx.body
    }
  )
  .addAnswer(
    "Correo Electronico",
    { capture: true  },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("@")) {
        return fallBack();
      }
      correo = ctx.body
      telefono = ctx.from
    }
  )

  .addAnswer("Gracias por la Información, verificando datos de acceso 🕓",null,(ctx) => {
    nom = nombre
    pat = paterno
    mat = materno
    corr = correo    
    phono = telefono
    setDataToDB({'Nombre': nom ,'Apellidos': pat + ' ' +  mat, 'Correo': corr, 'Telefono': phono});
  }
  )
  .addAnswer("datos guardados con exito", { delay: 1700 })
  .addAnswer(
    "Encuenta de Atencion coloca *siguiente*",
    { capture: true  },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("siguiente")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )
  .addAnswer([
    "*Indicanos en qué podemos ayudarte* 🌀",
    "",
    "Seleccione *1* ¿Cotizar Página Web?",
    "",
    "Seleccione *2* ¿Cotizar ABC System de Autoatención?",
    "",
    "Seleccione *3* ¿Comprar Canva Pro?",
    "",
    "Escribe *Listado* para ver todos nuestos links",
    "",
    "*Encuesta de nuestra atencion* 💭",
    "",
    "Escriba *7* ¿si me gusta?",
    "",
    "Escriba *8* ¿no me gusto?",
    "",
    "Ecriba *Finalizar* para terminar la conversacion",
  ]);
  const createTable  = () => {     
    let query = "CREATE TABLE IF NOT EXISTS usuarios (nombre varchar(255), apellidos varchar(255), correo varchar(255), telefono numeric(15) PRIMARY KEY UNIQUE);";
    connection.connect();
    connection.query(query, function (error, results, fields) {
      if (error) {
        console.log(error)
        //throw error;      
      }
    });     
  }

  const exists = async (datos) => {
    let ex = false;    
    let query = "SELECT * FROM usuarios WHERE correo = '"+datos.Correo+"';";
    await connection.query(query, function (error, results, fields) {
      if (error) throw error;
      console.log(results, fields);
      ex = fields.length > 0;
    });     
    return ex;
  }

  const setDataToDB = async (datos) => {        
    if(await exists(datos) == false){     
      console.log(datos);      
      let query = "UPDATE usuarios set nombre='"+datos.Nombre+"',apellidos='"+datos.Apellidos+"', correo='"+datos.Correo+"' Where telefono='"+telefono+"'";
      console.log(query);
      connection.query(query, function (error, results, fields) {
        if (error) throw error;      
      });       
      return true;
    } else {
      console.log("El usuario ya existe, no se puede guardar");
      return false;
    }    
  }

const main = async () => {  
  const adapterDB = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT,
  });
  createTable();  
    
  const adapterFlow = createFlow([
    flowcomentario,
    flownomegusto,
    flowcanva,
    flowmegusto,
    flowSaludo,
    flowpregunta,
    flowAgartha,
    flowTerminar,
    flowSecundario,
    flowpmenu,
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