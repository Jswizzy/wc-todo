import "./styles.css";
import { LitElement, html } from "lit-element";

const author = "open-wc";
const homepage = "https://open-wc.org";
const footerTemplate = html`
  <footer>Made with love by <a href="${homepage}">${author}</a></footer>
`;

class TodoApp extends LitElement {
  static get properties() {
    return { todos: { type: Array } };
  }
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

      <input id="addTodoInput" placeholder="Name" />
      <button @click="${this._addTodo}">Add</button>
      <ol>
        ${this.todos.map(
          (todo) =>
            html`<li>
              <input
                type="checkbox"
                .checked=${todo.finished}
                @change="${(e) => this._changeTodoFinished(e, todo)}"
              />
              ${todo.text}
              <button @click=${() => this._removeTodo(todo)}>X</button>
            </li>`
        )}
      </ol>
      ${footerTemplate}
    `;
  }
  _addTodo() {
    const input = this.shadowRoot.getElementById("addTodoInput");
    const text = input.value;
    input.value = "";

    this.todos = [...this.todos, { text, finished: false }];
  }
  _removeTodo(removeTodo) {
    this.todos = this.todos.filter((todo) => todo !== removeTodo);
  }
  _changeTodoFinished(e, changedTodo) {
    const finished = e.target.checked;

    this.todos = this.todos.map((todo) =>
      todo !== changedTodo ? todo : { ...changedTodo, finished }
    );
  }
}

if (!customElements.get("todo-app")) {
  customElements.define("todo-app", TodoApp);
}

document.getElementById("app").appendChild(document.createElement("todo-app"));
