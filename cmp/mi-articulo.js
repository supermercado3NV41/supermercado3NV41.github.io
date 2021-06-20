import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiArt extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<a href="articulos.html">
          Volver</a>`;
    getAuth().onAuthStateChanged(
      usuario => this.
        cambiaUsuario(usuario),
      muestraError);
  }

  /**
   * @param {import(
      "../lib/tiposFire.js").User}
      usu */
  async cambiaUsuario(usu) {
    if (usu && usu.email) {
      let html = "";
      const roles =
        await cargaRoles(
          usu.email);
      /* Enlaces para
       * trabajadores y administradores. */
      if (roles.has("Trabajador")||roles.has("Administrador")) {
        html += /* html */
          `<button>Guardar</button>`;
      }
      /* Enlaces para solo
       * administradores.
       */
      if (roles.has(
        "Administrador")) {
        html += /* html */
          `<button name="eliminar"
          type="button">
          Eliminar
        </button>`;
      }
      this.ul.innerHTML += html;
    }
  }
}

customElements.define(
  "mi-art", MiArt);