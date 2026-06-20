import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    addAnecdote({ content });
    event.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
