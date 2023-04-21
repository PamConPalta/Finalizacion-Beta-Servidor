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
const squel = require("squel");
const mysql = require("mysql");
const abc = require("./arrays");

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = "localhost";
const MYSQL_DB_USER = "kmilo";
const MYSQL_DB_PASSWORD = "12345";
const MYSQL_DB_NAME = "kmilo";
const MYSQL_DB_PORT = "3306";

const connection = mysql.createConnection({
  host     : MYSQL_DB_HOST,
  user     : MYSQL_DB_USER,
  password : MYSQL_DB_PASSWORD,
  database : MYSQL_DB_NAME
});

const createTable  = () => {     
  let query = "CREATE TABLE IF NOT EXISTS usuarios (nombre varchar(50), apellidos varchar(50), correo varchar(50), contacto numeric(15) primary key unique);";
  connection.connect();
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error)
      //throw error;      
    }
  });     
}

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
  .addAnswer("Para verificar su cuenta, ingrese *Verificar*",
    { capture: true },
    (ctx, { fallBack }) => {
      fon = ctx.from
      numRet = []
      cont = []
      num = []
      connection.connect;
      let consulta = squel.select()
      .field('nombre')
      .field('contacto')
      .from('usuarios');
      
      connection.query(consulta.toString(), function (error, registros, campos ){
        if (error) {
          throw error
          }
      
        registros.forEach(function(registro, indice, arreglo){
          num.push(registro.contacto)
          cont.push({nombre: registro.nombre , contacto: registro.contacto})
      
          });
      
        for(i = -1; i < num.length; i++){
          fon.lastIndexOf(num[i])
          if(fon.lastIndexOf(num[i]) != -1){
            numRet = num[i]
            console.log("Este numero existe")
            console.log(numRet)
            const resultado = cont.find(persona => persona.contacto === numRet)
            datos = resultado
            if(datos.nombre === null){ /** Este punto retorna todo el rato registro */
            if (!ctx.body.includes("Registro")) {
              if (!ctx.body.includes("registro")) {
              return fallBack("ingrese *Registro* para continuar")
            }}
              
            }else{/** Este punto debiese enviar el menu de wsp */
            if (!ctx.body.includes("pppp")) {
              if (!ctx.body.includes("Pppp")) {
              return fallBack("ud ya esta registrado para continuar ingrese *pppp* para ingresar al menu")
            }}
          }
          }
        }
      })
    }
  );

  const flowRegistro = addKeyword(['registro','Registro'])
  .addAnswer(
    "¿Tu Nombre?",
    { capture: true },
    (ctx, { fallBack }) => {
        val = ctx.body
        ab = abc.abecedario
        cont = false
        for(i = -1; i < ab.length; i++) {
          val.lastIndexOf(ab[i])
          if(val.lastIndexOf(ab[i]) != -1){
            cont = true
          }
        }
          if(cont === false){
           
              return fallBack("Ingrese un nombre correcto.")
            }
  
        nombre = val
        fono = ctx.from
        let query = "UPDATE usuarios set nombre='"+nombre+"' Where contacto='"+fono+"'";
      console.log(query);
      connection.query(query, function (error, results, fields) {
        if (error) throw error;      
      }); 
      }
      )
    

  .addAnswer(
    "¿Tus Apellidos?",
    { capture: true},
    (ctx, { fallBack }) => {
      val = ctx.body
      ab = abc.abecedario
      cont = false
      for(i = -1; i < ab.length; i++) {
        val.lastIndexOf(ab[i])
        if(val.lastIndexOf(ab[i]) != -1){
          cont = true
        }
      }if(cont === false){
        return fallBack();
      }
      paterno = val
      fono = ctx.from
      let query = "UPDATE usuarios set apellidos='"+paterno+"' Where contacto='"+fono+"'";
    console.log(query);
    connection.query(query, function (error, results, fields) {
      if (error) throw error;      
    }); 
    }
  )

  .addAnswer(
    "Correo Electronico",
    { capture: true  },
    (ctx, { fallBack }) => {
      val = ctx.body
      ab = abc.email
      cont = false
      for(i = -1; i < ab.length; i++) {
        val.lastIndexOf(ab[i])
        if(val.lastIndexOf(ab[i]) != -1){
          cont = true
        }
      }if(cont === false){
        return fallBack();
      }
      correo = val
      fono = ctx.from
      
      let query = "UPDATE usuarios set correo='"+correo+"' Where contacto='"+fono+"'";
    console.log(query);
    connection.query(query, function (error, results, fields) {
      if (error) throw error;      
    }); 
    }
  )

  .addAnswer("Gracias por la Información, verificando datos de acceso 🕓",null,(ctx) => {
    nom = nombre
    pat = paterno
    corr = correo
    fon = fono
  }
  )
  .addAnswer("datos guardados con exito", { delay: 1700 }) 
  .addAnswer(
    "fin coloca gracias *Gracias*",
    { capture: true /*buttons: [{ body: "❌ Cancelar solicitud" }]*/ },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("Gracias")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )
  .addAnswer("ud ya esta registrado para continuar ingrese *pppp* para ingresar al menu");


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
    flowSaludo,
    flowEscrito,
    flowsi,
    flowseo,
    flowSitioNo,
    flowRegistro,
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
