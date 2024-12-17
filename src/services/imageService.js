import axios from 'axios';
import cheerio from 'cheerio';

class ImageService {
  constructor() {
    this.cache = new Map();
    this.CACHE_TTL = 1000 * 60 * 60; // 1 hora
  }

  async searchImages(query, limit = 10) {
    // Revisar caché
    if (this.cache.has(query)) {
      return this.cache.get(query);
    }

    try {
      const response = await axios.get(
        `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&first=1`,
        {
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        }
      );

      const $ = cheerio.load(response.data);
      const images = $('img[data-src^="http"]')
        .map((_, el) => $(el).attr('data-src'))
        .get()
        .slice(0, limit);

      // Guardar en caché
      this.cache.set(query, images);
      setTimeout(() => this.cache.delete(query), this.CACHE_TTL);

      return images;
    } catch (error) {
      throw new Error(`Error al buscar imágenes: ${error.message}`);
    }
  }
}

export default new ImageService(); 