import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraArticulos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoArticulos =
  getFirestore().
    collection("Articulos");
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
/** @type {HTMLFormElement} */
const forma = document["forma"];

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Trabajador"])) {
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoArticulos.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Pasatiempo} */
      const data = doc.data();
      forma.nombre.value =
        data.nombre || "";
      forma.precio.value =
        data.precio || "";
      forma.descripcion.value =
        data.descripcion || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraArticulos();
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const nombre = getString(
      formData, "nombre").trim();
    const precio = getString(
      formData, "precio").trim();
    const descripcion = getString(
      formData, "descripcion").trim();
    /**
     * @type {
        import("./tipos.js").
                Pasatiempo} */
    const modelo = {
      nombre,
      precio,
      descripcion
    };
    await daoArticulos.
      doc(id).
      set(modelo);
    muestraArticulos();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoArticulos.
        doc(id).
        delete();
      muestraArticulos();
    }
  } catch (e) {
    muestraError(e);
  }
}