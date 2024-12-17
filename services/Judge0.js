class Judge0 {
  constructor() {
    this.apiKey = process.env.JUDGE0_API_KEY;
    this.apiHost = process.env.JUDGE0_API_HOST;
    this.baseURL = process.env.JUDGE0_BASE_URL;
    this.cache = {
      languages: null,
      lastFetched: null,
      cacheDuration: 60 * 60 * 1000 * 24,
    };
  }

  get headers() {
    return {
      "Content-Type": "application/json",
      "x-rapidapi-key": this.apiKey,
      "x-rapidapi-host": this.apiHost,
    };
  }

  async fetchLanguages() {
    if (
      this.cache.languages &&
      Date.now() - this.cache.lastFetched < this.cache.cacheDuration
    ) {
      return this.cache.languages;
    }

    try {
      const response = await fetch(`${this.baseURL}/languages`, {
        method: "GET",
        headers: this.headers,
      });

      const languages = await response.json();
      this.cache.languages = languages;
      this.cache.lastFetched = Date.now();

      return languages;
    } catch (error) {
      throw new Error("Error fetching languages from Judge0 API", error);
    }
  }
}

module.exports = new Judge0();
