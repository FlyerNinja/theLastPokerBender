import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  getHealth() {
    return { status: 'ok' };
  }

  @Get('db')
  async getDbHealth() {
    await this.db.query('SELECT 1');
    return { db: 'ok' };
  }
}
