import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<ul>
        <li>
          <a href="index.html">
            Sesión</a>
        </li>
      </ul>`;
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
      /* Enlaces para
       * todos los usuarios. */
      if (roles.has("Cliente")||roles.has("Trabajador")||roles.has("Administrador")) {
        html += /* html */
          `<li>
            <a href=
              "chat.html">Chat</a>
          </li>
          <li>
            <a href=
"articulos.html">Articulos</a>
          </li>`;
      }
      /* Enlaces para solo
       * administradores.
       */
      if (roles.has(
        "Administrador")) {
        html += /* html */
          `<li>
            <a href=
      "usuarios.html">Usuarios</a>
          </li>`;
      }
      this.ul.innerHTML += html;
    }
  }
}

customElements.define(
  "mi-nav", MiNav);

