/**
 * Google Apps Script — Editor de un proyecto vinculado a tu Hoja de cálculo
 * (Extensiones > Apps Script). Desplegar > Nueva implementación > Tipo: Aplicación web
 *   Ejecutar como: yo
 *   Quién tiene acceso: Cualquier persona
 *
 * En Propiedades del proyecto (⚙) > Propiedades de secuencias de comandos, agrega:
 *   WEBHOOK_SECRET  =  (mismo valor que GOOGLE_SHEETS_WEBAPP_SECRET en Vercel/.env)
 *
 * Primera fila de la hoja activa (encabezados):
 *   Fecha | Tipo | Nombre | Correo | Teléfono | Mensaje
 */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (expected && body.webhookSecret !== expected) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var type = body.type || "";
    var name = body.name || "";
    var email = body.email || "";
    var phone = body.phone || "";
    var message = body.message || "";

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([new Date(), type, name, email, phone, message]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Si abres la URL en el navegador (GET), Google llama a doGet. Los formularios usan doPost. */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      hint: "Este endpoint recibe datos solo por POST (JSON). Prueba desde el formulario del sitio.",
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}
