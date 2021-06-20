import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiArts extends HTMLElement {
  connectedCallback() {
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
      /* Enlaces para solo
       * administradores.
       */
      if (roles.has(
        "Administrador")) {
        html += /* html */
          `<div class="herramientas">
      <a
        href="articuloNuevo.html">
        Agregar…</a>
    </div>`;
      }
    }
  }
}

customElements.define(
  "mi-arts", MiArts);
