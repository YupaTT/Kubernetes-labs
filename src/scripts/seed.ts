import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { HeatmapSeeder } from '../seeders/heatmap.seeder';

async function bootstrap() {
    console.log('🌱 Iniciando proceso de seeding...');

    const app = await NestFactory.createApplicationContext(AppModule);

    try {
        const seeder = app.get(HeatmapSeeder);
        await seeder.seed();
        console.log('🎉 Seeding completado exitosamente!');
    } catch (error) {
        console.error('💥 Error durante el seeding:', error);
        process.exit(1);
    } finally {
        await app.close();
    }
}

bootstrap();
