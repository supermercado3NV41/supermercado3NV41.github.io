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
    this.innerHTML = /* html */ `<p></p>`;
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
      if (roles.has("Cliente")) {
        html += /* html */
          `<p>
      <label>
        Nombre
        <input name="nombre"
          type="text" required
          value="Cargando…" disabled="disabled">
      </label>
    </p>
    <p>
      <label>
        Precio
        <input name="precio"
          type="text" required
          value="Cargando…" disabled="disabled">
      </label>
    </p>
    <p>
      <label>
        Descripción
        <input name="descripcion"
          type="text" required
          value="Cargando…" disabled="disabled">
      </label>
    </p>`;
      }
      /* Enlaces para
       * trabajadores y
       * administradores.
       */
      if (roles.has(
        "Trabajador"||roles.has("Administrador"))) {
        html += /* html */
          `<p>
      <label>
        Nombre
        <input name="nombre"
          type="text" required
          value="Cargando…">
      </label>
    </p>
    <p>
      <label>
        Precio
        <input name="precio"
          type="text" required
          value="Cargando…">
      </label>
    </p>
    <p>
      <label>
        Descripción
        <input name="descripcion"
          type="text" required
          value="Cargando…">
      </label>
    </p>`;
      }
      this.ul.innerHTML += html;
    }
  }
}

customElements.define(
  "mi-art", MiArt);
