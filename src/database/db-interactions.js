const db = require('./db-config')


const interactions = {

    async createNews(news) {
        news.illustration = !news.illustration ? news.illustration = 'https://image.flaticon.com/icons/png/512/14/14711.png' : news.illustration;
        try {
            const connection = await db.connect()
            const sql = 'INSERT INTO news(title, content, illustration, category, views) values (?,?,?,?,?);'
            const values = [news.title, news.content, news.illustration, news.category, 0]

            await connection.query(sql, values)
            let [lastID] = await connection.query('SELECT id FROM news WHERE title=?', news.title)
            let position = lastID.length - 1
            lastID = lastID[position].id

            this.createCategory(news.category, lastID)
            return [true, lastID]
        } catch (error) {
            console.log(error)
            return false
        }
    },

    async selectAll() {
        try {
            const connection = await db.connect()
            const [rows] = await connection.query('SELECT * FROM news;')

            return rows
        } catch (error) {
            return false
        }
    },

    async selectNews(newsData) {
        const connection = await db.connect()
        if (newsData.title) {
            const sql = `SELECT * FROM news WHERE title LIKE "%${newsData.title}%";`
            const [news] = await connection.query(sql)

            return news

        } else if (newsData.category) {
            const sql = `SELECT * FROM news_category WHERE category LIKE "%${newsData.category}%";`
            const [rows] = await connection.query(sql)

            return rows
        }
    },


    async selectNewsByCategory(category) {
        const connection = await db.connect()
        const sql = `SELECT news_category.*, news.* FROM news JOIN news_category ON (news_category.news_id = ${category}) WHERE news_category.news_id = ${category};`

    },


    async updateNews() {

    },

    async delete(news) {

    },

    async createCategory(categoryName, newsID) {
        try {
            console.log(`${categoryName}, ${newsID}`)
            const connection = await db.connect()
            const sql = 'INSERT INTO news_category(category, news_id) VALUES(?, ?);'
            await connection.query(sql, [categoryName, newsID])

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },

    async selectAllCategories(categoryName) {
        try {
            const connection = await db.connect()
            const [rows] = await connection.query('SELECT * FROM news_category;')
            return rows

        } catch (error) {
            console.log(error)
            return false
        }

    }
}



module.exports = interactions

