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
    forma.addEventListener(
      "submit", guarda);
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
      add(modelo);
    muestraArticulos();
  } catch (e) {
    muestraError(e);
  }
}
