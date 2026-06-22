import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from "../services/anecdotes";
import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions,
} from "./anecdoteStore";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

it("the state is initialized with the anecdotes returned by the backend.", async () => {
  const mockAnecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 9,
    },
  ];
  anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

  const { result } = renderHook(() => useAnecdoteActions());

  await act(async () => {
    await result.current.initialize();
  });

  const { result: anecdotesResult } = renderHook(() => useAnecdotes());
  expect(anecdotesResult.current).toEqual(mockAnecdotes);
});
