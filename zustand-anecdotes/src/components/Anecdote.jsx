import { useAnecdoteActions } from "../stores/anecdoteStore";

const Anecdote = ({ anecdote }) => {
  const { voteAnecdote, deleteAnecdote } = useAnecdoteActions();

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
        {!anecdote.votes && (
          <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
        )}
      </div>
    </div>
  );
};

export default Anecdote;
