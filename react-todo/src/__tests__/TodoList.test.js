import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList', () => {
  test('renders Todo List and displays initial todos', () => {
    render(<TodoList />);
    
    const title = screen.getByText(/Todo List/i);
    expect(title).toBeInTheDocument();
    
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems.length).toBe(2); // Expect two initial todos
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const button = screen.getByText(/Add Todo/i);
    
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems.length).toBe(3); // New todo added
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo completion status', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Learn React');
    fireEvent.click(todo);

    expect(todo).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems.length).toBe(1); // One todo should be deleted
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
