import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'heatmap_db',
    logging: process.env.LOG_SQL === 'true',
    synchronize: process.env.NODE_ENV !== 'production', // Auto false en producción
}));
