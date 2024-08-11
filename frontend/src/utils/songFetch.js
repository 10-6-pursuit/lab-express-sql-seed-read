const URL = import.meta.env.VITE_URL;

// Get all songs
export async function getSongs() {
  const response = await fetch(`${URL}/songs`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Get a song
export async function getSong(id) {
  try {
    const response = await fetch(`${URL}/songs/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching song:", error);
    throw error;
  }
}

// Create a song
export async function createSong(song) {
  const options = {
    method: "POST",
    body: JSON.stringify(song),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(`${URL}/songs`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating song:", error);
    throw error;
  }
}

// Update a song
export async function updateSong(id, song) {
  const options = {
    method: "PUT",
    body: JSON.stringify(song),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${URL}/songs/${id}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// Delete a song
export async function deleteSong(id) {
  const options = {
    method: "DELETE",
  };
  const response = await fetch(`${URL}/songs/${id}`, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete song");
  }
  return response.json();
}

// Update favorite status
export async function updateFavoriteStatus(id, is_favorite) {
  const options = {
    method: "PUT",
    body: JSON.stringify({ is_favorite }),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(`${URL}/songs/${id}/favorite`, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating favorite status:", error);
    throw error;
  }
}
