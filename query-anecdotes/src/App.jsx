import AnecdoteForm from "./components/AnecdoteForm";
import { useAnecdotes } from "./hooks/useAnecdotes";
import Notification from "./components/Notification";
import useNotification from "./hooks/useNotification";

const App = () => {
  const { anecdotes, isError, isPending, voteUpAnecdote } = useAnecdotes();
  const { showNotification } = useNotification();

  const handleVote = (anecdote) => {
    voteUpAnecdote(anecdote);
    showNotification(`You voted for '${anecdote.content}'`);
  };

  if (isPending) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return (
      <div>anecdote service not available due to problems with server</div>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
