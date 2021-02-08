const db = require('./db-config')


const interactions = {
    async selectAll() {
        try {
            const connection = await db.connect()
            const [rows] = await connection.query('SELECT * FROM news;')

            return rows
        } catch (error) {
            return false
        }
    },

    async selectNews(news) {

    },

    async createNews(news) {
        console.log('interactions line 21'+news)
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

    },

    async createCategory(categoryName, lastNewsID) {
        try {
            const connection = await db.connect()
            const sql = 'INSERT INTO news_category(category, category_id) VALUES(?, ?);'
            await connection.query(sql, [categoryName, lastNewsID])

            return 1
        } catch (error) {
            return 0
        }
    },

    async selectAllCategories(){
        const connection = await db.connect()
        const [rows] = await connection.query('SELECT * FROM news_category;')
        return rows
    }
}



module.exports = interactions

