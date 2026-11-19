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
function cleanCell(value, maxLen) {
  var text = String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();
  if (text.length > maxLen) text = text.slice(0, maxLen);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (expected && body.webhookSecret !== expected) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var type = body.type === "prayer" ? "prayer" : body.type === "contact" ? "contact" : "";
    if (!type) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Tipo inválido" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      type,
      cleanCell(body.name, 80),
      cleanCell(body.email, 120),
      cleanCell(body.phone, 20),
      cleanCell(body.message, 2000),
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "No se pudo guardar." }))
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
