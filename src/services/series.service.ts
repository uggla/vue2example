interface Series {
  show: unknown;
}

function getSeries(): Promise<Array<Series>> {
  return fetch("http://api.tvmaze.com/search/shows?q=bad").then((res) =>
    res.json()
  );
}

export default {
  getSeries,
};
