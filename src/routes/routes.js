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
      
      try{
        const interaction = await database.createNews(data)
        const newsID = interaction[1]
        console.log(newsID)

        await db.run(`
            INSERT INTO categories(
                category,
                news_id
            ) VALUES(
                "${data.category}",
                "${newsID}"
            );
          `)
      } catch (error) {
        console.log(error)
        response.status(500).send('Was not possible save news on bd')
      }


      return response.status(200).send('Saved on bd!')

    })

  app.route("/get-all-news")
    .get(async (request, response) => {
      try {
        //fazer o join das tabelas aqui
        const news = await database.selectAll()
        console.log(news)
        return response.send(news)
      } catch (error) {
        console.log(error)
        return response.status(503).send('Was not possible take data')
      }
    })
}

module.exports = routes


