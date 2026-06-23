import { useAnecdotes } from "../hooks/useAnecdotes";
import useNotification from "../hooks/useNotification";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();
  const { showNotification } = useNotification();

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    try {
      await addAnecdote(content);
      showNotification("Anecdote created successfully!");
    } catch (error) {
      showNotification(error.message);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
