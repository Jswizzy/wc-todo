import { LitElement, html } from "lit-element";

export class TodoList extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  render() {
    if (!this.todos) {
      return html``;
    }

    return html`
      <ol>
        ${this.todos.map(
          (todo) => html`
            <li>
              <input
                type="checkbox"
                .checked=${todo.finished}
                @change=${(e) => this._changeTodoFinished(e, todo)}
              />
              ${todo.text}
              <button @click=${() => this._removeTodo(todo)}>X</button>
            </li>
          `
        )}
      </ol>
    `;
  }

  _changeTodoFinished(e, changedTodo) {
    const eventDetails = { changedTodo, finished: e.target.checked };
    this.dispatchEvent(
      new CustomEvent("changed-todo-finished", { detail: eventDetails })
    );
  }

  _removeTodo(item) {
    this.dispatchEvent(new CustomEvent("remove-todo", { detail: item }));
  }
}

if (!customElements.get("todo-list")) {
  customElements.define("todo-list", TodoList);
}
