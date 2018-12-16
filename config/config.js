module.exports = {
    development: {
        username: process.env.RDS_USERNAME || 'root',
        password: process.env.RDS_PASSWORD || 'root',
        database: process.env.RDS_DB_NAME || 'brocal_db',
        host: process.env.RDS_HOSTNAME || '127.0.0.1',
        port: process.env.RDS_PORT || 8889,
        dialect: 'mysql'
    },
    test: {
        username: process.env.RDS_USERNAME || 'root',
        password: process.env.RDS_PASSWORD || 'root',
        database: process.env.RDS_DB_NAME || 'brocal_db',
        host: process.env.RDS_HOSTNAME || '127.0.0.1',
        port: process.env.RDS_PORT || 8889,
        dialect: 'mysql'
    },
    production: {
        username: process.env.RDS_USERNAME || 'root',
        password: process.env.RDS_PASSWORD || 'root',
        database: process.env.RDS_DB_NAME || 'brocal_db',
        host: process.env.RDS_HOSTNAME || '127.0.0.1',
        port: process.env.RDS_PORT || 8889,
        dialect: 'mysql'
    }
}