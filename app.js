const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

let counter_intent = 0;
let counter_intent1 = 0;

const tiempolimite = 300000; /**Tiempo de espera límite que equivale a 5 minutos */

const Saludo = ("¡Hola! 🤖 En *Agartha Marketing Agency* te damos la bienvenida." +
"\n" +
"Te has comunicado con Agartha Marketing Agency." +
"\n" +
"\n" +
"Este es nuestro nuevo sistema de Chat Bot de Autoatención ABC System." +
"\n" +
"\n" +
"Es una prueba Beta de este sistema por lo que agradecemos tu colaboración y sugerencias." +
"\n" +
"\n" +
"Esta supervisada en tiempo real por ejecutivos humanos" +
"\n" +
"\n" +
"Un gusto poder atenderte 🙌")

const Menu = (
  "Ingrese el número para" +
    "\n" +
    "Acceder a los distintos Servicios: 👇" +
    "\n" +
    "\n" +
    "📌 *1*.- *Servicios*" +
    "\n" +
    "📌 *2*.- *Soporte Técnico*" +
    "\n" +
    "📌 *3*.- *Atención Comercial*" +
    "\n" +
    "📌 *4*.- *Productos*" +
    "\n" +
    "📌 *5*.- *Análisis*")

// ** S A L U D O **

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
  .addAnswer(Saludo)

  .addAnswer(
    "Para continuar ingrese *Menú* 👈",
    { capture: true },
    (ctx, { fallBack, flowDynamic }) => {
      val = ctx.body;

      // ** M E N Ú  DE  O P C I O N E S **
      if (val === "menu" || val === "menú" || val === "Menu" || val === "Menú") {
        counter_intent1++;
        counter_intent++;
        return fallBack(Menu);
      }

      // ** S E R V I C I O S **
      if (counter_intent > 0) {
        if (val === "1" && counter_intent > 0) {
          const temporizador = setTimeout(() => {
            flowDynamic([{
              body: "_Gracias por comunicarte con *Agartha Marketing Agency* 🤗_"
            }])
          }, tiempolimite);
          return fallBack(
            "*Menú de Opciones 👇*" +
              "\n" +
              "\n" +
              "*Email Marketing*" +
              "\n" +
              "🔗 https://agencyagartha.cl/email-marketing/" +
              "\n" +
              "\n" +
              "*Social Media Marketing*" +
              "\n" +
              "🔗 https://agencyagartha.cl/social-media-marketing/" +
              "\n" +
              "\n" +
              "*Search Engine Optimization*" +
              "\n" +
              "🔗 https://agencyagartha.cl/search-engine-optimization/" +
              "\n" +
              "\n" +
              "*Local SEO*" +
              "\n" +
              "🔗 https://agencyagartha.cl/local-seo/" +
              "\n" +
              "\n" +
              "*Pay Per Click*" +
              "\n" +
              "🔗 https://agencyagartha.cl/pay-per-click-ppc-management/" +
              "\n" +
              "\n" +
              "*ABC System*" +
              "\n" +
              "🔗 https://agencyagartha.cl/our-services/" +
              "\n" +
              "\n" +
              "Para volver atrás escriba *Menú*" +
              "\n" +
              "Para terminar escriba *Salir*"
          );

          // ** S O P O R T E  T É C N I C O **
        } else if (val === "2" && counter_intent > 0) {
          const temporizador = setTimeout(() => {
            flowDynamic([{
              body: "_Gracias por comunicarte con *Agartha Marketing Agency* 🤗_"
            }])
          }, tiempolimite);
          return fallBack(
            "Ingresa aquí 👇" +
              "\n" +
              "📞 +56 9 5056 4929" +
              "\n" +
              "\n" +
              "Para volver atrás escriba *Menú*" +
              "\n" +
              "Para terminar escriba *Salir*"
          );

          // ** A T E N C I Ó N  C O M E R C I A L **
        } else if (val === "3" && counter_intent > 0) {
          const temporizador = setTimeout(() => {
            flowDynamic([{
              body: "_Gracias por comunicarte con *Agartha Marketing Agency* 🤗_"
            }])
          }, tiempolimite);
          return fallBack(
            "Ingresa aquí 👇" +
              "\n" +
              "📞 +56 9 5056 4929" +
              "\n" +
              "\n" +
              "Para volver atrás escriba *Menú*" +
              "\n" +
              "Para terminar escriba *Salir*"
          );

          // ** P R O D U C T O S **
        } else if (val === "4" && counter_intent > 0) {
          const temporizador = setTimeout(() => {
            flowDynamic([{
              body: "_Gracias por comunicarte con *Agartha Marketing Agency* 🤗_"
            }])
          }, tiempolimite);
          return fallBack(
            "Ingresa aquí 👇" +
              "\n" +
              "🔗 https://agencyagartha.cl/tienda/" +
              "\n" +
              "\n" +
              "Para volver atrás escriba *Menú*" +
              "\n" +
              "Para terminar escriba *Salir*"
          );

          // Analiza tu página web gratis!
        } else if (val === "5" && counter_intent > 0) {
          counter_intent1++;
          const temporizador = setTimeout(() => {
            flowDynamic([{
              body: "_Gracias por comunicarte con *Agartha Marketing Agency* 🤗_"
            }])
          }, tiempolimite);
          return (
            fallBack(
              "¿Cuentas con una página web? 🤔" +
                "\n" +
                "Coloque *Si* ✅ / Coloque *No* ❌" +
                "\n" +
                "\n" +
                "Para volver atrás escriba *Menú*" +
                "\n" +
                "Para terminar escriba *Salir*"
            )
          );

          // Analiza tu página web gratis! (opción Si)
        } else if (ctx.body === "Si" || ctx.body === "si" || ctx.body === "SI" || ctx.body === "sI" && counter_intent1 > 0) {
          const temporizador = setTimeout(() => {
            flowDynamic([{
              body: "_Gracias por comunicarte con *Agartha Marketing Agency* 🤗_"
            }])
          }, tiempolimite);
          return fallBack(
            "⚠ Antes de indicanos tu página web, sigue el siguiente ejemplo :" +
              "\n" +
              "\n" +
              "Primero se debe *eliminar* (https://) de la URL 👉 https://agencyagartha.cl" +
              "\n" +
              "Para luego enviar 👉 *agencyagartha.cl*"
          );
        } else if (ctx.body.includes(".")) {
          const temporizador = setTimeout(() => {
            flowDynamic([{
              body: "_Gracias por comunicarte con *Agartha Marketing Agency* 🤗_"
            }])
          }, tiempolimite);
          return fallBack(
            "Ingresa aquí 👇" +
              "\n" +
              "https://pagespeed.web.dev/analysis?url=https%3A%2F%2F" +
              ctx.body +
              "%2F" +
              "\n" +
              "\n" +
              "Si desea analizar otra página escriba la *URL*" +
              "\n" +
              "Para volver atrás escriba *Menú*" +
              "\n" +
              "Para terminar escriba *Salir*"
          );
        }

        // Analiza tu página web gratis! (opción No)
        else if (ctx.body === "No" && counter_intent1 > 0) {
          return fallBack(
            "Si te interesa crear tu propia página web ingresa aquí 👇" +
              "\n" +
              "🔗 https://agencyagartha.cl" +
              "\n" +
              "\n" +
              "Para volver atrás escriba *Menú*" +
              "\n" +
              "Para terminar escriba *Salir*"
          );
        }
      }

      // D E S P E D I D A
      if (val === "salir" || val === "Salir" || val === "SALIR") {
        const temporizador = setTimeout(() => {
          flowDynamic([{
            body: "_Gracias por comunicarte con *Agartha Marketing Agency* 🤗_"
          }])
        }, tiempolimite);
        return fallBack("¿Desea otro Servicio?" +
        "\n" +
        "Escriba el *número* que corresponde 👇" +
        "\n" +
        "*6*. *Si* ✅" +
        "\n" +
        "*7*. *No* ❌")
      }
      if (ctx.body === 6) {
        return fallBack(Menu)
      }
      if (ctx.body === 7) {
        flowDynamic([{ body: 
          "Gracias por comunicarte con *Agartha Marketing Agency* 🤗"
        }])
        const temporizador = setTimeout(() => {
          flowDynamic([{
            body: "_Nos vemos pronto en otra ocasión. ¡Qué tengas un excelente día!_"
          }])
        }, tiempolimite);
      }
      /*else {
        if (val != "Menu" || val === "menu" || val === "menú" || val === "Menú" && counter_intent === 0)
          return fallBack("Ingrese Menú para poder continuar");
      }*/
    }
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowSaludo]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
