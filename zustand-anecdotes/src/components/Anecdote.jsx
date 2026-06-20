import { useAnecdoteActions } from "../store";

const Anecdote = ({ anecdote }) => {
  const { voteAnecdote } = useAnecdoteActions();

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
