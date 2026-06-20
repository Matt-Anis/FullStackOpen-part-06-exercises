import { useAnecdotes } from "./store";
import Anecdote from "./components/Anecdote";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useAnecdotes();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
      <AnecdoteForm />
    </div>
  );
};

export default App;
