const path = require('path')

module.exports = {
    "type": "postgres",
    "host": process.env.RDS_HOSTNAME || "localhost",
    "port": process.env.RDS_PORT || 5432,
    "username": process.env.RDS_USERNAME || "postgres",
    "password": process.env.RDS_PASSWORD || "123",
    "database": process.env.RDS_DB_NAME || "carsapp",
    "synchronize": true,
    "logging": false,
    "entities": [
        path.join(__dirname, 'src/entity/**/!(*.spec.js|*.spec.ts)'),
    ],
    "migrations": [
        path.join(__dirname, 'src/entity/**/!(*.spec.js|*.spec.ts)'),
    ]
}