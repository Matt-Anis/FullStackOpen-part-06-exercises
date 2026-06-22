import { render, screen } from "@testing-library/react";
import useAnecdoteStore from "../stores/anecdoteStore";
import AnecdoteList from "./AnecdoteList";
import "@testing-library/jest-dom";

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: [
      { id: 1, content: "worst anecdote", votes: 1 },
      { id: 2, content: "best anecdote", votes: 99 },
      { id: 3, content: "mid anecdote", votes: 42 },
    ],
    filter: "",
  });
});

it("displays anecdotes sorted by votes", () => {
  render(<AnecdoteList />);

  const items = screen.getAllByTestId("anecdote");
  expect(items[0]).toHaveTextContent("best anecdote");
  expect(items[1]).toHaveTextContent("mid anecdote");
  expect(items[2]).toHaveTextContent("worst anecdote");
});
