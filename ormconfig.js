const path = require('path')

const obj = {
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

module.exports = [{
        "host": process.env.RDS_HOST,
        "username": process.env.RDS_USERNAME,
        "password": process.env.RDS_PASSWORD,
        "database": process.env.RDS_NAME,
        "ssl": true,
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
    },
    {
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
]