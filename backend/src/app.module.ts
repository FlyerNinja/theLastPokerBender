import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { DatabaseService } from './database.service';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [AppController, HealthController, CardController, UserController],
  providers: [AppService, DatabaseService, CardService, UserService],
})
export class AppModule {}
