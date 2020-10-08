import { LitElement, html } from "lit-element";
import { TodoList } from "./todos-list.js";

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
    const finishedCount = this.todos.filter((e) => e.finished).length;
    const unfinishedCount = this.todos.length - finishedCount;

    return html`
      <h1>Todo App</h1>

      <input id="addTodoInput" placeholder="Name" />
      <button @click="${this._addTodo}">Add</button>

      <todo-list
        .todos="${this.todos}"
        @change-todo-finished="${this._changeTodoFinished}"
        @remove-todo="${this._removeTodo}"
      ></todo-list>

      <div>Total finished: ${finishedCount}</div>
      <div>Total unfinished: ${unfinishedCount}</div>

      ${footerTemplate}
    `;
  }
  _addTodo() {
    const input = this.shadowRoot.getElementById("addTodoInput");
    const text = input.value;
    input.value = "";

    this.todos = [...this.todos, { text, finished: false }];
  }
  _removeTodo(e) {
    this.todos = this.todos.filter((todo) => todo !== e.detail);
  }
  _changeTodoFinished(e) {
    const { changedTodo, finished } = e.detail;

    this.todos = this.todos.map((todo) =>
      todo !== changedTodo ? todo : { ...changedTodo, finished }
    );
  }
}

if (!customElements.get("todo-app")) {
  customElements.define("todo-app", TodoApp);
}

document.getElementById("app").appendChild(document.createElement("todo-app"));
