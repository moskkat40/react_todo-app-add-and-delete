import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  filter: string;
  setFilter: (a: Filter) => void;
  todos: Todo[];
  handleDeleteTodo: (a: number) => void;
  setLoadingIds: (a: number[]) => void;
};

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  todos,
  handleDeleteTodo,
  setLoadingIds,
}) => {
  function handleFilter(event: React.MouseEvent<HTMLElement>) {
    const filterValue = event.currentTarget.textContent as Filter;

    setFilter(filterValue);
  }

  function handleClearComplete() {
    const completedTodo = todos.filter(todo => todo.completed);

    Promise.allSettled(completedTodo).then(() =>
      completedTodo.map(todo => {
        setLoadingIds(current => [...current, todo.id]);
        handleDeleteTodo(todo.id);
      }),
    );
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: filter === 'All' })}
          data-cy="FilterLinkAll"
          onClick={handleFilter}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={handleFilter}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleFilter}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={handleClearComplete}
      >
        Clear completed
      </button>
    </footer>
  );
};
