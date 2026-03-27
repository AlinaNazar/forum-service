import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    mongoDB:{
        url: process.env.MONGO_URI || 'mongodb://lina:1234/localhost:27017/java62?authSource=admin',
        db: {
            dbName: process.env.DB_NAME || 'java62'
        }
    }

}
export default config;