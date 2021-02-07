const db = require('./db-config')


const interactions = {
    async selectAll() {
        try {
            const connection = await db.connect()
            const [rows] = await connection.query('SELECT * FROM news;')

            return rows
        } catch (error){ 
            return false
        }
    },

    async selectNews(news) {

    },

    async createNews(news) {
        try {
            const connection = await db.connect()
            const sql = 'INSERT INTO news(title, content, illustration, category, views) values (?,?,?,?,?);'
            const values = [news.title, news.content, news.illustration, news.category, 0]

            await connection.query(sql, values)
            const lastID = await connection.query('SELECT LAST_ISERT_ID();')
            console.log(lastID)
            return [true, lastID]
        } catch (error) {
            return false
        }
    },

    async updateNews() {

    },

    async delete(news) {

    }
}



module.exports = interactions

