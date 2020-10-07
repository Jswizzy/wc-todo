import "./styles.css";
import { LitElement, html } from "lit-element";

const author = "open-wc";
const homepage = "https://open-wc.org";
const footerTemplate = html`
  <footer>Made with love by <a href="${homepage}">${author}</a></footer>
`;

class TodoApp extends LitElement {
  constructor() {
    super();
    this.todos = [
      { text: "Do A", finished: true },
      { text: "Do B", finished: false },
      { text: "Do C", finished: false },
    ];
  }
  render() {
    return html`
      <h1>Todo App</h1>
      <ol>
        ${this.todos.map(
          (todo) =>
            html`<li>
              ${todo.text} (${todo.finished ? "finished" : "unfinished"})
            </li>`
        )}
      </ol>
      ${footerTemplate}
    `;
  }
}

if (!customElements.get("todo-app")) {
  customElements.define("todo-app", TodoApp);
}

document.getElementById("app").appendChild(document.createElement("todo-app"));
