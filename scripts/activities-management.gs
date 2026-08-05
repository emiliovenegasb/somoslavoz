//===========================
// CONFIGURACION
//===========================

const CONFIG = {

  CALENDAR_ID: "somoslavoztc@gmail.com",

  DURACION_HORAS: 3,

  HOJA_FORM: "Respuestas de formulario 1",

  HOJA_ACT: "Actividades",

  HOJA_ADMIN: "Administradores",

  // Sube el logo a Drive, compártelo con "Cualquier persona con el enlace"
  // y pega aquí el ID del archivo (parte final de la URL de Drive).
  LOGO_DRIVE_ID: "",

  NOMBRE_IGLESIA: "Iglesia Templo Central",

  CALENDARIO_NOMBRE: "SOMOS LA VOZ"

};

const FORM = {

  TIMESTAMP:0,
  ACTIVIDAD:1,
  MINISTERIO:2,
  RESPONSABLE:3,
  TELEFONO:4,
  OBJETIVO:5,
  FECHA:6,
  HORA:7,
  LUGAR:8,
  PUBLICO:9,
  RECURSOS:10,
  OBS:11,
  CORREO:12,
  PRIORIDAD:13

};

const ACT = {

  TIMESTAMP:1,
  ID:2,
  ESTADO:3,
  ACTIVIDAD:4,
  MINISTERIO:5,
  RESPONSABLE:6,
  CORREO:7,
  FECHA:8,
  HORA:9,
  LUGAR:10,
  EVENTID:11,
  CORREOENVIADO:12,
  FECHAAPROB:13,
  APROBADOPOR:14,
  OBS:15,
  EVENTOCREADO:16,
  PRIORIDAD:17

};

function procesarSolicitudes() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CONFIG.HOJA_ACT);
  const datos = sh.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    const estado = datos[i][ACT.ESTADO - 1];
    const eventoCreado = datos[i][ACT.EVENTOCREADO - 1];

    if (estado === "Aprobada" && eventoCreado !== true) {
      try {
        procesarFilaAprobada(sh, i + 1);
      } catch (err) {
        registrarLog("ERROR aprobación fila " + (i + 1) + ": " + err.message);
      }
    }
  }

}


function leerFilaActividad(sh, numFila) {
  const fila = sh.getRange(numFila, 1, 1, ACT.EVENTOCREADO).getValues()[0];
  const correo = fila[ACT.CORREO - 1];
  const nombre = fila[ACT.ACTIVIDAD - 1];
  const extra = buscarDatosFormulario(correo, nombre);

  return {
    fila: fila,
    id: fila[ACT.ID - 1],
    actividad: nombre,
    ministerio: fila[ACT.MINISTERIO - 1],
    responsable: fila[ACT.RESPONSABLE - 1],
    correo: correo,
    fecha: fila[ACT.FECHA - 1],
    hora: fila[ACT.HORA - 1],
    lugar: fila[ACT.LUGAR - 1],
    observaciones: fila[ACT.OBS - 1] || extra.observaciones,
    eventId: fila[ACT.EVENTID - 1],
    eventoCreado: fila[ACT.EVENTOCREADO - 1],
    prioridad: extra.prioridad || "Normal",
    telefono: extra.telefono,
    objetivo: extra.objetivo,
    publico: extra.publico,
    recursos: extra.recursos
  };
}


function procesarFilaAprobada(sh, numFila) {

  const d = leerFilaActividad(sh, numFila);

  if (d.eventoCreado === true) return;

  const calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  const inicio = parseFechaHora(d.fecha, d.hora);
  const fin = new Date(inicio);
  fin.setHours(fin.getHours() + CONFIG.DURACION_HORAS);

  const descripcion =
`Responsable: ${d.responsable}

Ministerio: ${d.ministerio}

Prioridad: ${d.prioridad}

Observaciones:
${d.observaciones || "—"}`;

  const evento = calendar.createEvent(
    `[${d.ministerio}] ${d.actividad}`,
    inicio,
    fin,
    {
      location: d.lugar,
      description: descripcion
    }
  );

  sh.getRange(numFila, ACT.EVENTID).setValue(evento.getId());
  sh.getRange(numFila, ACT.EVENTOCREADO).setValue(true);
  sh.getRange(numFila, ACT.CORREOENVIADO).setValue(true);
  sh.getRange(numFila, ACT.FECHAAPROB).setValue(new Date());
  sh.getRange(numFila, ACT.APROBADOPOR).setValue(Session.getActiveUser().getEmail());

  enviarCorreoAprobacion({
    correo: d.correo,
    correosAdmin: obtenerAdministradores(),
    id: d.id,
    actividad: d.actividad,
    ministerio: d.ministerio,
    responsable: d.responsable,
    lugar: d.lugar,
    inicio: inicio,
    fin: fin,
    prioridad: d.prioridad,
    telefono: d.telefono,
    objetivo: d.objetivo,
    publico: d.publico,
    recursos: d.recursos,
    observaciones: d.observaciones,
    aprobadoPor: Session.getActiveUser().getEmail()
  });

}


function procesarFilaRechazadaOSuspendida(sh, numFila, estado) {

  const d = leerFilaActividad(sh, numFila);

  if (d.eventoCreado === true && d.eventId) {
    eliminarEventoCalendario(d.eventId);
    sh.getRange(numFila, ACT.EVENTID).setValue("");
    sh.getRange(numFila, ACT.EVENTOCREADO).setValue(false);
  }

  sh.getRange(numFila, ACT.CORREOENVIADO).setValue(true);
  sh.getRange(numFila, ACT.FECHAAPROB).setValue(new Date());
  sh.getRange(numFila, ACT.APROBADOPOR).setValue(Session.getActiveUser().getEmail());

  enviarCorreoEstadoCambiado({
    estado: estado,
    correo: d.correo,
    correosAdmin: obtenerAdministradores(),
    id: d.id,
    actividad: d.actividad,
    ministerio: d.ministerio,
    responsable: d.responsable,
    fecha: d.fecha,
    hora: d.hora,
    lugar: d.lugar,
    prioridad: d.prioridad,
    observaciones: d.observaciones,
    gestionadoPor: Session.getActiveUser().getEmail()
  });

}


function eliminarEventoCalendario(eventId) {
  try {
    const cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
    const evento = cal.getEventById(eventId);
    if (evento) evento.deleteEvent();
  } catch (e) {
    registrarLog("No se pudo eliminar evento " + eventId + ": " + e.message);
  }
}


/**
 * Combina Fecha + Hora desde la hoja.
 * Sheets puede devolver: Date, string "DD/MM/YYYY", hora decimal (0.666…) o Date con solo hora.
 */
function parseFechaHora(fechaRaw, horaRaw) {
  if (fechaRaw === null || fechaRaw === undefined || fechaRaw === "") {
    throw new Error("Fecha vacía en la solicitud");
  }

  let year, month, day;

  if (fechaRaw instanceof Date && !isNaN(fechaRaw.getTime())) {
    year = fechaRaw.getFullYear();
    month = fechaRaw.getMonth();
    day = fechaRaw.getDate();
  } else {
    const partes = String(fechaRaw).trim().split(/[\/\-]/);
    if (partes.length < 3) {
      throw new Error("Formato de fecha inválido: " + fechaRaw);
    }
    day = parseInt(partes[0], 10);
    month = parseInt(partes[1], 10) - 1;
    year = parseInt(partes[2], 10);
  }

  let hours = 0;
  let minutes = 0;

  if (horaRaw instanceof Date && !isNaN(horaRaw.getTime())) {
    hours = horaRaw.getHours();
    minutes = horaRaw.getMinutes();
  } else if (typeof horaRaw === "number" && horaRaw >= 0 && horaRaw < 1) {
    const totalMin = Math.round(horaRaw * 24 * 60);
    hours = Math.floor(totalMin / 60);
    minutes = totalMin % 60;
  } else if (horaRaw !== null && horaRaw !== undefined && horaRaw !== "") {
    const horaStr = String(horaRaw).trim().toLowerCase();
    const match = horaStr.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(a\.?\s*m\.?|p\.?\s*m\.?)?/i);
    if (!match) {
      throw new Error("Formato de hora inválido: " + horaRaw);
    }
    hours = parseInt(match[1], 10);
    minutes = parseInt(match[2], 10);
    const ampm = (match[3] || "").replace(/\./g, "").replace(/\s/g, "");
    if (ampm === "pm" && hours < 12) hours += 12;
    if (ampm === "am" && hours === 12) hours = 0;
  }

  const inicio = new Date(year, month, day, hours, minutes, 0);

  if (isNaN(inicio.getTime())) {
    throw new Error("Fecha/hora inválida: " + fechaRaw + " " + horaRaw);
  }

  return inicio;
}


/**
 * Se ejecuta automáticamente al enviar el formulario.
 * Copia la respuesta a la hoja Actividades con estado "Pendiente".
 */
function onFormSubmit(e) {
  try {
    const filaForm = e.values;
    registrarActividadDesdeFormulario(filaForm);
  } catch (err) {
    Logger.log("Error onFormSubmit: " + err.message);
    registrarLog("ERROR onFormSubmit: " + err.message);
  }
}


function registrarActividadDesdeFormulario(filaForm, notificarAdmins) {
  if (notificarAdmins === undefined) notificarAdmins = true;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CONFIG.HOJA_ACT);

  if (yaExisteEnActividades(sh, filaForm)) {
    return;
  }

  const id = generarNuevoId(sh);

  const nuevaFila = [
    filaForm[FORM.TIMESTAMP],
    id,
    "Pendiente",
    filaForm[FORM.ACTIVIDAD],
    filaForm[FORM.MINISTERIO],
    filaForm[FORM.RESPONSABLE],
    filaForm[FORM.CORREO],
    filaForm[FORM.FECHA],
    filaForm[FORM.HORA],
    filaForm[FORM.LUGAR],
    "",
    false,
    "",
    "",
    filaForm[FORM.OBS] || "",
    false
  ];

  sh.appendRow(nuevaFila);
  registrarLog("Nueva solicitud registrada: " + filaForm[FORM.ACTIVIDAD]);

  if (notificarAdmins) {
    try {
      enviarCorreoNuevaSolicitud({
        id: id,
        actividad: filaForm[FORM.ACTIVIDAD],
        ministerio: filaForm[FORM.MINISTERIO],
        responsable: filaForm[FORM.RESPONSABLE],
        correo: filaForm[FORM.CORREO],
        telefono: filaForm[FORM.TELEFONO],
        objetivo: filaForm[FORM.OBJETIVO],
        fecha: filaForm[FORM.FECHA],
        hora: filaForm[FORM.HORA],
        lugar: filaForm[FORM.LUGAR],
        publico: filaForm[FORM.PUBLICO],
        recursos: filaForm[FORM.RECURSOS],
        prioridad: filaForm[FORM.PRIORIDAD],
        observaciones: filaForm[FORM.OBS]
      });
    } catch (err) {
      registrarLog("ERROR correo nueva solicitud: " + err.message);
    }
  }
}


function generarNuevoId(sh) {
  const datos = sh.getDataRange().getValues();
  let maxNum = 0;

  for (let i = 1; i < datos.length; i++) {
    const id = String(datos[i][ACT.ID - 1] || "");
    const match = id.match(/TC-(\d+)/);
    if (match) {
      maxNum = Math.max(maxNum, parseInt(match[1], 10));
    }
  }

  return "TC-" + String(maxNum + 1).padStart(6, "0");
}


function yaExisteEnActividades(sh, filaForm) {
  const datos = sh.getDataRange().getValues();
  const actividad = filaForm[FORM.ACTIVIDAD];
  const correo = filaForm[FORM.CORREO];
  const fecha = filaForm[FORM.FECHA];

  for (let i = 1; i < datos.length; i++) {
    if (datos[i][ACT.ACTIVIDAD - 1] !== actividad) continue;
    if (datos[i][ACT.CORREO - 1] !== correo) continue;
    if (fechasIguales(datos[i][ACT.FECHA - 1], fecha)) return true;
  }

  return false;
}


function fechasIguales(a, b) {
  if (a instanceof Date && b instanceof Date) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }
  return String(a).trim() === String(b).trim();
}


/**
 * Sincroniza respuestas del formulario que no llegaron a Actividades.
 * Ejecutar una vez manualmente para recuperar envíos anteriores.
 */
function sincronizarFormulariosPendientes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const shForm = ss.getSheetByName(CONFIG.HOJA_FORM);
  const shAct = ss.getSheetByName(CONFIG.HOJA_ACT);
  const datos = shForm.getDataRange().getValues();
  let agregados = 0;

  for (let i = 1; i < datos.length; i++) {
    if (!yaExisteEnActividades(shAct, datos[i])) {
      registrarActividadDesdeFormulario(datos[i], false);
      agregados++;
    }
  }

  registrarLog("Sincronización completada. Agregados: " + agregados);
  SpreadsheetApp.getUi().alert("Sincronización completada.\nNuevas actividades: " + agregados);
}


/**
 * Instala el trigger del formulario. Ejecutar UNA vez desde el editor.
 */
function instalarTriggers() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === "onFormSubmit") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  SpreadsheetApp.getUi().alert("Trigger instalado correctamente.\nLas nuevas respuestas del formulario se registrarán automáticamente.");
}


function registrarLog(mensaje) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName("Logs");
    if (!sh) return;
    sh.appendRow([new Date(), mensaje]);
  } catch (e) {
    Logger.log(mensaje);
  }
}


function buscarDatosFormulario(correo, actividad) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.HOJA_FORM);
  if (!sh) return {};

  const datos = sh.getDataRange().getValues();

  for (let i = datos.length - 1; i >= 1; i--) {
    const row = datos[i];
    if (row[FORM.CORREO] !== correo) continue;
    if (row[FORM.ACTIVIDAD] !== actividad) continue;

    return {
      telefono: row[FORM.TELEFONO] || "",
      objetivo: row[FORM.OBJETIVO] || "",
      publico: row[FORM.PUBLICO] || "",
      recursos: row[FORM.RECURSOS] || "",
      prioridad: row[FORM.PRIORIDAD] || "",
      observaciones: row[FORM.OBS] || ""
    };
  }

  return {};
}


function formatearFecha(fecha, formato) {
  return Utilities.formatDate(
    fecha,
    Session.getScriptTimeZone(),
    formato
  );
}


function escaparHtml(texto) {
  if (texto === null || texto === undefined || texto === "") return "—";
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


function filaCorreo(etiqueta, valor) {
  if (!valor || valor === "—") return "";
  return `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e8e8e8;color:#555;width:140px"><b>${etiqueta}</b></td>
        <td style="padding:8px 12px;border-bottom:1px solid #e8e8e8">${escaparHtml(valor)}</td>
      </tr>`;
}


function obtenerLogoInline() {
  if (!CONFIG.LOGO_DRIVE_ID) return null;
  try {
    const blob = DriveApp.getFileById(CONFIG.LOGO_DRIVE_ID).getBlob();
    blob.setName("logo.png");
    return blob;
  } catch (e) {
    Logger.log("No se pudo cargar el logo: " + e.message);
    return null;
  }
}


function obtenerAdministradores() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sh = ss.getSheetByName(CONFIG.HOJA_ADMIN);

  const datos = sh.getDataRange().getValues();

  let lista = [];

  for (let i = 1; i < datos.length; i++) {

    if (datos[i][2] === true) {

      lista.push(datos[i][1]);

    }

  }

  return lista.join(",");

}


function obtenerUrlActividades() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CONFIG.HOJA_ACT);
  return ss.getUrl() + "#gid=" + sh.getSheetId();
}


function formatearFechaHoraTexto(fechaRaw, horaRaw) {
  try {
    const inicio = parseFechaHora(fechaRaw, horaRaw);
    return formatearFecha(inicio, "dd/MM/yyyy HH:mm") + " hrs";
  } catch (e) {
    return escaparHtml(fechaRaw) + " " + escaparHtml(horaRaw);
  }
}


function enviarCorreoNuevaSolicitud(d) {
  const correosAdmin = obtenerAdministradores();
  if (!correosAdmin) {
    registrarLog("No hay administradores configurados para notificar");
    return;
  }

  const fechaTexto = formatearFechaHoraTexto(d.fecha, d.hora);
  const urlHoja = obtenerUrlActividades();
  const logo = obtenerLogoInline();
  const logoHtml = logo
    ? `<img src="cid:logo" alt="${CONFIG.NOMBRE_IGLESIA}" style="display:block;max-width:520px;width:100%;height:auto;margin:0 auto 20px">`
    : "";

  const asunto = "[Nueva solicitud] " + d.actividad;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#333">

    ${logoHtml}

    <div style="background:#e65100;color:#fff;padding:18px 24px;border-radius:8px 8px 0 0">
      <h2 style="margin:0;font-size:22px">Nueva solicitud pendiente</h2>
    </div>

    <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">

      <p style="margin-top:0">Hola,</p>

      <p>Se ha recibido una <b>nueva solicitud de actividad</b> que requiere revisión.</p>

      <table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #e0e0e0;border-radius:6px;margin:20px 0">
        ${filaCorreo("ID solicitud", d.id)}
        ${filaCorreo("Actividad", d.actividad)}
        ${filaCorreo("Ministerio", d.ministerio)}
        ${filaCorreo("Responsable", d.responsable)}
        ${filaCorreo("Correo", d.correo)}
        ${filaCorreo("Teléfono", d.telefono)}
        ${filaCorreo("Fecha y hora", fechaTexto)}
        ${filaCorreo("Lugar", d.lugar)}
        ${filaCorreo("Prioridad", d.prioridad)}
        ${filaCorreo("Público esperado", d.publico)}
        ${filaCorreo("Objetivo", d.objetivo)}
        ${filaCorreo("Recursos", d.recursos)}
        ${filaCorreo("Observaciones", d.observaciones)}
      </table>

      <p style="margin:20px 0">
        <a href="${urlHoja}" style="display:inline-block;background:#1b5e20;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold">
          Revisar solicitudes
        </a>
      </p>

      <p style="margin-bottom:0;color:#555;font-size:14px">
        Para aprobar, abre la hoja <b>Actividades</b> y cambia el <b>Estado</b> a <b>Aprobada</b>.
      </p>

    </div>

    <p style="text-align:center;color:#888;font-size:12px;margin-top:20px">
      Sistema de Gestión de Actividades<br>
      ${CONFIG.NOMBRE_IGLESIA}
    </p>

  </div>
  `;

  const opciones = { htmlBody: html };
  if (logo) {
    opciones.inlineImages = { logo: logo };
  }

  GmailApp.sendEmail(correosAdmin, asunto, "", opciones);
  registrarLog("Correo enviado a administradores: " + d.id);
}


function enviarCorreoAprobacion(d) {

  const fechaTexto = formatearFecha(d.inicio, "dd/MM/yyyy");
  const horaInicio = formatearFecha(d.inicio, "HH:mm");
  const horaFin = formatearFecha(d.fin, "HH:mm");
  const logo = obtenerLogoInline();
  const logoHtml = logo
    ? `<img src="cid:logo" alt="${CONFIG.NOMBRE_IGLESIA}" style="display:block;max-width:520px;width:100%;height:auto;margin:0 auto 20px">`
    : "";

  const asunto = "[Aprobada] Actividad - " + d.actividad;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#333">

    ${logoHtml}

    <div style="background:#1b5e20;color:#fff;padding:18px 24px;border-radius:8px 8px 0 0">
      <h2 style="margin:0;font-size:22px">Solicitud aprobada</h2>
    </div>

    <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">

      <p style="margin-top:0">Hola <b>${escaparHtml(d.responsable)}</b>,</p>

      <p>Tu solicitud de actividad ha sido <b style="color:#1b5e20">APROBADA</b> y ya fue agregada al calendario <b>${CONFIG.CALENDARIO_NOMBRE}</b>.</p>

      <table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #e0e0e0;border-radius:6px;margin:20px 0">
        ${filaCorreo("ID solicitud", d.id)}
        ${filaCorreo("Actividad", d.actividad)}
        ${filaCorreo("Ministerio", d.ministerio)}
        ${filaCorreo("Responsable", d.responsable)}
        ${filaCorreo("Fecha", fechaTexto)}
        ${filaCorreo("Horario", horaInicio + " – " + horaFin + " hrs")}
        ${filaCorreo("Lugar", d.lugar)}
        ${filaCorreo("Prioridad", d.prioridad)}
        ${filaCorreo("Público esperado", d.publico)}
        ${filaCorreo("Objetivo", d.objetivo)}
        ${filaCorreo("Recursos", d.recursos)}
        ${filaCorreo("Teléfono", d.telefono)}
        ${filaCorreo("Observaciones", d.observaciones)}
        ${filaCorreo("Aprobado por", d.aprobadoPor)}
      </table>

      <p style="margin-bottom:0;color:#555;font-size:14px">
        Puedes ver el evento en Google Calendar bajo el nombre
        <b>[${escaparHtml(d.ministerio)}] ${escaparHtml(d.actividad)}</b>.
      </p>

    </div>

    <p style="text-align:center;color:#888;font-size:12px;margin-top:20px">
      Sistema de Gestión de Actividades<br>
      ${CONFIG.NOMBRE_IGLESIA}
    </p>

  </div>
  `;

  const opciones = {
    htmlBody: html,
    cc: d.correosAdmin
  };

  if (logo) {
    opciones.inlineImages = { logo: logo };
  }

  GmailApp.sendEmail(d.correo, asunto, "", opciones);

}


function enviarCorreoEstadoCambiado(d) {

  const esRechazada = d.estado === "Rechazada";
  const color = esRechazada ? "#c62828" : "#f57f17";
  const titulo = esRechazada ? "Solicitud rechazada" : "Solicitud suspendida";
  const mensajeEstado = esRechazada ? "RECHAZADA" : "SUSPENDIDA";
  const detalleEstado = esRechazada
    ? "Tu solicitud de actividad ha sido <b style=\"color:#c62828\">RECHAZADA</b>."
    : "Tu solicitud de actividad ha sido <b style=\"color:#f57f17\">SUSPENDIDA</b>.";

  const fechaTexto = formatearFechaHoraTexto(d.fecha, d.hora);
  const logo = obtenerLogoInline();
  const logoHtml = logo
    ? `<img src="cid:logo" alt="${CONFIG.NOMBRE_IGLESIA}" style="display:block;max-width:520px;width:100%;height:auto;margin:0 auto 20px">`
    : "";

  const asunto = (esRechazada ? "[Rechazada]" : "[Suspendida]") + " Actividad - " + d.actividad;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#333">

    ${logoHtml}

    <div style="background:${color};color:#fff;padding:18px 24px;border-radius:8px 8px 0 0">
      <h2 style="margin:0;font-size:22px">${titulo}</h2>
    </div>

    <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">

      <p style="margin-top:0">Hola <b>${escaparHtml(d.responsable)}</b>,</p>

      <p>${detalleEstado}</p>

      <table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #e0e0e0;border-radius:6px;margin:20px 0">
        ${filaCorreo("Estado", mensajeEstado)}
        ${filaCorreo("ID solicitud", d.id)}
        ${filaCorreo("Actividad", d.actividad)}
        ${filaCorreo("Ministerio", d.ministerio)}
        ${filaCorreo("Responsable", d.responsable)}
        ${filaCorreo("Fecha y hora", fechaTexto)}
        ${filaCorreo("Lugar", d.lugar)}
        ${filaCorreo("Prioridad", d.prioridad)}
        ${filaCorreo("Observaciones", d.observaciones)}
        ${filaCorreo("Gestionado por", d.gestionadoPor)}
      </table>

      <p style="margin-bottom:0;color:#555;font-size:14px">
        ${esRechazada
          ? "Si tienes dudas sobre esta decisión, contacta al equipo de administración."
          : "Esta actividad quedó en pausa. Contacta al equipo de administración para más información."}
      </p>

    </div>

    <p style="text-align:center;color:#888;font-size:12px;margin-top:20px">
      Sistema de Gestión de Actividades<br>
      ${CONFIG.NOMBRE_IGLESIA}
    </p>

  </div>
  `;

  const opciones = {
    htmlBody: html,
    cc: d.correosAdmin
  };

  if (logo) {
    opciones.inlineImages = { logo: logo };
  }

  GmailApp.sendEmail(d.correo, asunto, "", opciones);
  registrarLog("Correo " + d.estado + " enviado: " + d.id);

}


function onEdit(e) {

  const hoja = e.range.getSheet();

  if (hoja.getName() != CONFIG.HOJA_ACT)
    return;

  if (e.range.getColumn() != ACT.ESTADO)
    return;

  if (!e.value)
    return;

  const fila = e.range.getRow();
  const estado = e.value;

  try {
    if (estado === "Aprobada") {
      procesarFilaAprobada(hoja, fila);
    } else if (estado === "Rechazada" || estado === "Suspendida") {
      procesarFilaRechazadaOSuspendida(hoja, fila, estado);
    }
  } catch (err) {
    registrarLog("ERROR onEdit fila " + fila + ": " + err.message);
  }

}


//===========================
// API WEB — Agenda Somos la Voz
// Desplegar > Nueva implementación > Aplicación web (GET)
// Ejecutar como: Yo | Acceso: Cualquier persona
// URL → GOOGLE_CALENDAR_WEBAPP_URL en .env.local y Vercel
//===========================

function doGet() {
  try {
    var tz = Session.getScriptTimeZone() || "America/Santiago";
    var cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);

    if (!cal) {
      return jsonResponseAgenda({
        error: "No se encontró el calendario: " + CONFIG.CALENDAR_ID,
      });
    }

    var now = new Date();
    var end = new Date(now.getTime());
    end.setMonth(end.getMonth() + 4);

    var events = cal.getEvents(now, end);
    var eventos = [];

    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      var allDay = ev.isAllDayEvent();
      var start = ev.getStartTime();
      var endTime = ev.getEndTime();

      eventos.push({
        id: ev.getId(),
        titulo: ev.getTitle(),
        fecha: Utilities.formatDate(start, tz, "yyyy-MM-dd"),
        hora: allDay ? "Todo el día" : Utilities.formatDate(start, tz, "HH:mm"),
        horaFin: allDay ? "" : Utilities.formatDate(endTime, tz, "HH:mm"),
        lugar: ev.getLocation() || "Templo Central",
        descripcion: ev.getDescription() || "",
      });
    }

    return jsonResponseAgenda({ eventos: eventos });
  } catch (err) {
    return jsonResponseAgenda({ error: String(err) });
  }
}

function jsonResponseAgenda(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

