import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

/** @type {HTMLUListElement} */
const lista = document.
  querySelector("#lista");
const daoArticulos =
  getFirestore().
    collection("Articulos");

getAuth().
  onAuthStateChanged(
    protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Cliente"])||
      tieneRol(usuario,["Trabajador"])||
      tieneRol(usuario,["Administrador"])) {
    consulta();
  }
}

function consulta() {
  daoArticulos
    .onSnapshot(
      htmlLista, errConsulta);
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    QuerySnapshot} snap */
function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    snap.forEach(doc =>
      html += htmlFila(doc));
  } else {
    html += /* html */
      `<li class="vacio">
        -- La tienda no tiene ningun articulo en este momento. --
      </li>`;
  }
  lista.innerHTML = html;
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    DocumentSnapshot} doc */
function htmlFila(doc) {
  /**
   * @type {import("./tipos.js").
                  Pasatiempo} */
  const data = doc.data();
  const nombre = cod(data.nombre);
  const precio = cod(data.precio);
  const descripcion = cod(data.descripcion);
  const parámetros =
    new URLSearchParams();
  parámetros.append("id", doc.id);
if (tieneRol(usuario,["Cliente"])) {
return ( /* html */
    `<li>
      <a class="fila" href=
  "articulo.html?${parámetros}">
        <strong class="primario">
          ${nombre}
        </strong>
      </a>
      <strong class="secundario">
          ${precio}
      </strong>
      <strong class="secundario">
          ${descripcion}
      </strong>
    </li>`);
  }
  if (tieneRol(usuario,["Trabajador"])||tieneRol(usuario,["Administrador"])) {
return ( /* html */
    `<div class="herramientas">
           <a
               href="articuloNuevo.html">
               Agregar…</a>
           </div>
    <li>
      <a class="fila" href=
  "articulo.html?${parámetros}">
        <strong class="primario">
          ${nombre}
        </strong>
      </a>
      <strong class="secundario">
          ${precio}
      </strong>
      <strong class="secundario">
          ${descripcion}
      </strong>
    </li>`);
  }

}

/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}
