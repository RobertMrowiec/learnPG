const path = require('path')
module.exports = {
    "host": "localhost",
    "username": "postgres",
    "password": "123",
    "database": "carsapp",
    "type": "postgres",
    "port": 5432,
    "synchronize": true,
    "logging": false,
    "entities": [
        path.join(__dirname, 'src/entity/**/!(*.spec.js|*.spec.ts)'),
    ],
    "migrations": [
        path.join(__dirname, 'src/entity/**/!(*.spec.js|*.spec.ts)'),
    ]
}
