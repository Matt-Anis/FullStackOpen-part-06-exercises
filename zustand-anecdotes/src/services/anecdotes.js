const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await response.json();
};

const create = async (anecdote) => {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  };

  const response = await fetch(baseUrl, config);

  if (!response.ok) {
    throw new Error("Failed to create new anecdote");
  }

  return await response.json();
};

const update = async (id, anecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  });

  if (!response.ok) {
    throw new Error("Failed to update anecdote");
  }

  return await response.json();
};

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete anecdote");
  }

  return await response.json();
};

export default { getAll, create, update, remove };
