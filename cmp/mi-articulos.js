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
    this.innerHTML = /* html */ ``;
    this.ul =
      this.querySelector("ul");
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
       * para clientes. */
      if (roles.has("Trabajador")) {
        html += /* html */
          `<div class="herramientas">
           <a
               href="articuloNuevo.html">
               Agregar…</a>
           </div>`;
      }
      this.ul.innerHTML += html;
    }
  }
}

customElements.define(
  "mi-arts", MiArts);