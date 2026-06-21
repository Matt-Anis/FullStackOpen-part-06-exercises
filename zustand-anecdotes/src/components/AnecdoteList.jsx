import Anecdote from "./Anecdote";
import { useAnecdotes, useAnecdoteActions } from "../store";
import { useEffect } from "react";

const AnecdoteList = () => {
  const { initialize } = useAnecdoteActions();
  useEffect(() => {
    initialize();
  }, [initialize]);

  const anecdotes = useAnecdotes();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
