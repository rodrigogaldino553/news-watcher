const database = require('../database/db-interactions')


const routes = (app) => {
  app.route("/")
    .get((request, response) => {
      return response.send('Hello World!')
    })

  app.route("/create-news")
    .post(async (request, response) => {
      const req = request.body
      let data

      if (req.title && req.content && req.category) {
        data = req

      } else {
        return response.status(403).send('bad request')

      }

      try {
        const interaction = await database.createNews(data)
        const newsID = interaction[1]

        console.log('routes line 28' + newsID)

        await database.createCategory(data.category, newsID)

        return response.status(200).send('news saved on database!')
      } catch (error) {
        console.log(error)
        response.status(500).send('Was not possible save news on bd')
      }

    })

  app.route("/get-all-news")
    .get(async (request, response) => {
      try {
        //fazer o join das tabelas aqui
        const news = await database.selectAll()
        console.log(news)
        return response.statues(200).send(news)

      } catch (error) {
        console.log(error)
        return response.status(503).send('Was not possible take data')
      }
    })

  app.route("/get-news")
    .post(async (request, response) => {
      const data = request.body
      if(!data.title || !data.category) return response.status(403).send('bad request')

    })

  app.route("/get-all-categories")
    .get(async (request, response) => {
      try {
        const categories = await database.selectAllCategories()
        return response.statues(200).send(categories)
      } catch (error) {
        console.log(error)
        return response.status(503).send('Was not possible take data')
      }
    })
}

module.exports = routes


