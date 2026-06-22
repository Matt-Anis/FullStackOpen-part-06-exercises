import useAnecdoteStore, { useAnecdoteActions } from "../stores/anecdoteStore";
import AnecdoteList from "./AnecdoteList";
import { render, screen, renderHook, act } from "@testing-library/react";
import "@testing-library/jest-dom";

vi.mock("../services/anecdotes.js", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from "../services/anecdotes";
import { beforeEach } from "vitest";

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: [],
    filter: "",
  });
  vi.clearAllMocks();
});

describe("when there is anecdotes already created", () => {
  beforeEach(async () => {
    const mockAnecdotes = [
      { id: 1, content: "worst anecdote", votes: 1 },
      { id: 2, content: "best anecdote", votes: 99 },
      { id: 3, content: "mid anecdote", votes: 42 },
    ];

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);
    const { result } = renderHook(() => useAnecdoteActions());
    await act(async () => {
      await result.current.initialize();
    });
  });

  it("displays anecdotes sorted by votes", () => {
    render(<AnecdoteList />);

    const items = screen.getAllByTestId("anecdote");
    expect(items[0]).toHaveTextContent("best anecdote");
    expect(items[1]).toHaveTextContent("mid anecdote");
    expect(items[2]).toHaveTextContent("worst anecdote");
  });

  it("receives a properly filtered list of anecdotes.", () => {
    useAnecdoteStore.setState({ filter: "best" });
    render(<AnecdoteList />);

    const items = screen.getAllByTestId("anecdote");
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("best anecdote");
  });

  it("voting increases the number of votes for an anecdote.", async () => {
    anecdoteService.update.mockImplementation((id, updatedAnecdote) => {
      return Promise.resolve(updatedAnecdote);
    });

    render(<AnecdoteList />);

    const voteButtons = screen.getAllByText("vote");
    await act(async () => {
      await voteButtons[0].click();
    });

    const items = screen.getAllByTestId("anecdote");
    expect(items[0]).toHaveTextContent("best anecdote");
    expect(items[0]).toHaveTextContent("100");
  });
});
