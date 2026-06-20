import { useAnecdotes } from "./store";
import Anecdote from "./components/Anecdote";

const App = () => {
  const anecdotes = useAnecdotes();

  const vote = (id) => {
    console.log("vote", id);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
