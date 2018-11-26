const path = require('path')

export function dbConfiguration (process, env) {
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
    if (env == 'prod') {
        return (
            {
                "host": process.RDS_HOST,
                "username": process.RDS_USERNAME,
                "password": process.RDS_PASSWORD,
                "database": process.RDS_NAME,
                "ssl": true,
                ...obj
            }
        )
    }
    return (
        {
            "host": "localhost",
            "username": "postgres",
            "password": "123",
            "database": "carsapp",
            ...obj
        }
    )
}