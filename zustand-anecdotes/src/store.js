import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote.content,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    addAnecdote: async (content) => {
      const newAnecdote = await anecdoteService.create(asObject(content));
      set((state) => ({
        anecdotes: [...state.anecdotes, asObject(newAnecdote)],
      }));
    },

    voteAnecdote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        ),
      })),
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set({ anecdotes });
    },
  },
}));

export const useAnecdotes = () =>
  useAnecdoteStore(
    useShallow((state) => {
      const sortedAnecdotes = [...state.anecdotes].toSorted(
        (a, b) => b.votes - a.votes,
      );
      const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
      );
      return filteredAnecdotes;
    }),
  );
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
