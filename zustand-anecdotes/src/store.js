import { create } from "zustand";
import { useShallow } from "zustand/shallow";

const anecdotesAtStart = [
  { content: "If it hurts, do it more often", votes: 0 },
  {
    content: "Adding manpower to a late software project makes it later!",
    votes: 0,
  },
  {
    content:
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    votes: 0,
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    votes: 0,
  },
  { content: "Premature optimization is the root of all evil.", votes: 0 },
  {
    content:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    votes: 0,
  },
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote.content,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create((set) => ({
  anecdotes: anecdotesAtStart.map(asObject),
  actions: {
    addAnecdote: (anecdote) =>
      set((state) => ({ anecdotes: [...state.anecdotes, asObject(anecdote)] })),
    voteAnecdote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        ),
      })),
  },
}));

export const useAnecdotes = () =>
  useAnecdoteStore(
    useShallow((state) =>
      [...state.anecdotes].toSorted((a, b) => b.votes - a.votes),
    ),
  );
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
