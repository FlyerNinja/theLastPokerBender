import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async findOrCreateByEmail(email: string) {
    const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    const insert = await this.db.query('INSERT INTO users (email) VALUES ($1) RETURNING *', [email]);
    return insert.rows[0];
  }

  async getAllUsers() {
    const result = await this.db.query('SELECT * FROM users ORDER BY id');
    return result.rows;
  }

  async getUserById(id: number) {
    const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }
}
