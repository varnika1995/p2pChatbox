let setting = {};

const DBConfig = {
    local: {
        port: 3000,
        mongo: {
            host: "localhost",
            port: 27017,
            database: "tranzapp"
        }

    },
    dev: {
        port: 2003,
        mongo: {
         /*   user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: "localhost",
            port: 27017,
            database: process.env.DB_NAME*/
            user: process.env.MONGO_USER ? process.env.MONGO_USER : "admin",
            password: process.env.MONGO_PASS ? process.env.MONGO_PASS : "g#jLrY%1S3AO",
            host: "localhost",
            port: 27017,
            database: process.env.MONGO_DBNAME_DEV ? process.env.MONGO_DBNAME_DEV : "tranzapp"

        }
    }
}


switch (process.env.NODE_ENV) {
    case "dev":
        let dev = DBConfig.dev;
        DBConfig.dev.URI = `mongodb://${dev.mongo.user}:${dev.mongo.password}@${dev.mongo.host}:${dev.mongo.port}/${dev.mongo.database}`;
        setting = DBConfig.dev;
        break;

    default:
        let local = DBConfig.local;
        DBConfig.local.URI = `mongodb://${local.mongo.host}:${local.mongo.port}/${local.mongo.database}`;
        setting = DBConfig.local;
        break;
}
module.exports = setting;