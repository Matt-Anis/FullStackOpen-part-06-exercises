import Anecdote from "./Anecdote";
import { useAnecdotes } from "../store";

const AnecdoteList = () => {
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
