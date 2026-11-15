const models = require('../models');

const getAllArticles = async (req, res) => {
  try {
    const articles = await models.Article.findAll();
    return res.status(200).json({ articles });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getArticleBySlug = async (req, res) => {
  try {
    const article = await models.Article.findOne({
      where: { slug: req.params.slug },
      include: [{ model: models.Author }]
    });
    if (!article) {
      return res.status(404).send('Article not found');
    }
    return res.status(200).json({ article });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getArticlesByAuthor = async (req, res) => {
  try {
    const author = await models.Author.findByPk(req.params.id, {
      include: [{ model: models.Article }]
    });
    if (!author) {
      return res.status(404).send('Author not found');
    }
    return res.status(200).json({ author });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllArticles,
  getArticleBySlug,
  getArticlesByAuthor
};
