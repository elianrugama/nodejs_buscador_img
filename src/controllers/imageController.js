import imageService from '../services/imageService.js';

export const searchImages = async (req, res, next) => {
  try {
    const { query } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    if (!query) {
      return res.status(400).json({ 
        error: 'Se requiere un término de búsqueda' 
      });
    }

    const images = await imageService.searchImages(query, limit);
    res.json({
      success: true,
      query,
      count: images.length,
      images
    });

  } catch (error) {
    next(error);
  }
}; 