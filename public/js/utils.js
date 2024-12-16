function fetchLanguages(cb) {
  fetch(`${API_BASE_URL}/challenges/languages`)
    .then((res) => res.json())
    .then((languages) => {
      cb(languages);
    })
    .catch((err) => console.log(err));
}
