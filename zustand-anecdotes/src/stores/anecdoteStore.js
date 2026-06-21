import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import anecdoteService from "../../services/anecdotes";
import useNotificationStore from "./notificationStore";

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
        anecdotes: [...state.anecdotes, newAnecdote],
      }));
      useNotificationStore
        .getState()
        .actions.setNotification(`You added ${newAnecdote.content}`);
    },

    voteAnecdote: async (id) => {
      const anecdote = get().anecdotes.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updatedAnecdote : anecdote,
        ),
      }));
      useNotificationStore
        .getState()
        .actions.setNotification(`You voted up ${updatedAnecdote.content}`);
    },

    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set({ anecdotes });
    },

    deleteAnecdote: async (id) => {
      const anecdote = get().anecdotes.find((anecdote) => anecdote.id === id);

      if (anecdote.votes > 0) {
        useNotificationStore
          .getState()
          .actions.setNotification(
            `You cannot delete ${anecdote.content} because it has votes`,
          );
        return;
      }

      await anecdoteService.remove(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
      }));
      useNotificationStore
        .getState()
        .actions.setNotification(`Successfully deleted ${anecdote.content}`);
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
