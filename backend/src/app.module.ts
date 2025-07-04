import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { DatabaseService } from './database.service';

@Module({
  controllers: [AppController, HealthController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
