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
      throw new Error(`HTTP error! stats: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching song:", error);
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
export async function addSongToPlaylist(id, songId) {}

// Remove song from playlist
export async function removeSongFromPlaylist(id, songId) {}
