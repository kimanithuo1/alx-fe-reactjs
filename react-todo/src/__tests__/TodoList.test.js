// src/__tests__/TodoList.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders Todo List component', () => {
    render(<TodoList />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/Todo List/i);
    expect(titleElement).toBeInTheDocument();

    // Check if initial todos are rendered
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems.length).toBe(2);
  });

  test('can add a new todo', () => {
    render(<TodoList />);

    // Add a new todo by clicking the Add Todo button
    fireEvent.click(screen.getByText('Add Todo'));

    // Check if the new todo is added to the list
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems.length).toBe(3); // 2 initial todos + 1 new todo
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('can toggle todo completion status', () => {
    render(<TodoList />);

    // Find the first todo item and click it to toggle its completion
    const firstTodo = screen.getByText('Learn React');
    fireEvent.click(firstTodo);

    // Verify that the todo is crossed out
    expect(firstTodo).toHaveStyle('text-decoration: line-through');
  });

  test('can delete a todo', () => {
    render(<TodoList />);

    // Delete the first todo
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    // Verify that the todo is deleted
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems.length).toBe(1); // One todo should be deleted
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
