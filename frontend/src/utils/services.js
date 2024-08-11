// Song Filter
export function songSort(songs, sortMethod) {
  switch (sortMethod) {
    case "time-asc":
      songs.sort((a, b) => toSecs(a.time) - toSecs(b.time));
      break;
    case "time-desc":
      songs.sort((a, b) => toSecs(b.time) - toSecs(a.time));
      break;
    case "alpha-asc":
      songs.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      break;
    case "alpha-desc":
      songs.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
      );
      break;
    case "artist-asc":
      songs.sort((a, b) =>
        a.artist.toLowerCase() > b.artist.toLowerCase() ? 1 : -1
      );
      break;
    case "artist-desc":
      songs.sort((a, b) =>
        a.artist.toLowerCase() > b.artist.toLowerCase() ? -1 : 1
      );
      break;
    case "dateAdded-asc":
      songs.sort((a, b) => a.id - b.id);
      break;
    case "dateAdded-desc":
      songs.sort((a, b) => b.id - a.id);
      break;
    case "fav-asc":
      songs.sort((a, b) => b.is_favorite - a.is_favorite);
      break;
    case "fav-desc":
      songs.sort((a, b) => a.is_favorite - b.is_favorite);
      break;
    default:
      songs.sort((a, b) => a.id - b.id);
      break;
  }
}

// Date formatter

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
}

// Helper functions

//Convert mm:ss to seconds
function toSecs(str) {
  const [min, secs] = str.split(":").map(Number);
  return min * 60 + secs;
}