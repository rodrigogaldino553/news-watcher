const mysql = require('mysql2/promise')


async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') return global.connection

    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'news_crud'
        })

        global.connection = connection
        console.log('connection with MySQL is ready!')

        
        return connection

    } catch (error) {
        console.log('connection with MySQL failed!')
    }



}

connect()

module.exports = { connect }

