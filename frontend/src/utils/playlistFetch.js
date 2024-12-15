const URL = import.meta.env.VITE_URL;

// Get all playlists
export async function getPlaylists() {
  const response = await fetch(`${URL}/playlists`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Get playlist
export async function getPlaylist(id) {
  try {
    const response = await fetch(`${URL}/playlists/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching playlist:", error);
    throw error;
  }
}

// Create playlist
export async function createPlaylist(playlist) {
  const options = {
    method: "POST",
    body: JSON.stringify(playlist),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(`${URL}/playlists`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
}

// Add song to playlist
export async function addSongToPlaylist(id, songId) {
  const options = {
    method: "POST",
    body: JSON.stringify({ songId }),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(`${URL}/playlists/${id}/songs`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    throw error;
  }
}

// Remove song from playlist
export async function removeSongFromPlaylist(id, songId) {
  const options = {
    method: "DELETE",
    body: JSON.stringify({ songId }),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(`${URL}/playlists/${id}/songs`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    throw error;
  }
}

// Delete playlist
export async function deletePlaylist(id) {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(`${URL}/playlists/${id}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting playlist:", error);
    throw error;
  }
}
