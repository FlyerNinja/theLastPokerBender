import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { DatabaseService } from './database.service';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  controllers: [AppController, HealthController, CardController],
  providers: [AppService, DatabaseService, CardService],
})
export class AppModule {}
