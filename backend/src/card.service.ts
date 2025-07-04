import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class CardService {
  constructor(private readonly db: DatabaseService) {}

  private async log(cardId: number, userId: number, action: string, details: any) {
    await this.db.query(
      'INSERT INTO card_logs (card_id, user_id, action, details) VALUES ($1, $2, $3, $4)',
      [cardId, userId, action, JSON.stringify(details)]
    );
  }

  async createCard(userId: number, title: string, description?: string, element?: string, weight?: number) {
    const result = await this.db.query(
      `INSERT INTO cards (title, description, element, weight, created_by) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, description, element, weight, userId]
    );
    const card = result.rows[0];
    await this.log(card.id, userId, 'create', { title, description, element, weight });
    return card;
  }

  async getCards() {
    const result = await this.db.query('SELECT * FROM cards ORDER BY id');
    return result.rows;
  }

  async getCard(id: number) {
    const result = await this.db.query('SELECT * FROM cards WHERE id = $1', [id]);
    return result.rows[0];
  }

  async updateCard(id: number, userId: number, fields: any) {
    const updates = [] as string[];
    const params = [] as any[];
    let idx = 1;
    for (const key of ['title', 'description', 'element', 'weight', 'status', 'parent_id']) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = $${idx}`);
        params.push(fields[key]);
        idx++;
      }
    }
    if (updates.length === 0) return this.getCard(id);
    params.push(id);
    await this.db.query(`UPDATE cards SET ${updates.join(', ')} WHERE id = $${idx}`, params);
    await this.log(id, userId, 'update', fields);
    return this.getCard(id);
  }

  async deleteCard(id: number, userId: number) {
    await this.db.query('DELETE FROM cards WHERE id = $1', [id]);
    await this.log(id, userId, 'delete', {});
  }

  async splitCard(id: number, userId: number, titles: string[]) {
    const created = [] as any[];
    for (const title of titles) {
      const res = await this.db.query(
        `INSERT INTO cards (title, parent_id, created_by) VALUES ($1,$2,$3) RETURNING *`,
        [title, id, userId]
      );
      created.push(res.rows[0]);
      await this.log(res.rows[0].id, userId, 'create_split', { parentId: id });
    }
    await this.log(id, userId, 'split', { count: titles.length });
    return created;
  }

  async refuseCard(id: number, userId: number) {
    await this.db.query(`UPDATE cards SET status = 'rejected' WHERE id = $1`, [id]);
    await this.log(id, userId, 'refuse', {});
    return this.getCard(id);
  }

  async assignElement(id: number, userId: number, element: string) {
    await this.db.query(`UPDATE cards SET element = $1 WHERE id = $2`, [element, id]);
    await this.log(id, userId, 'assign_element', { element });
    return this.getCard(id);
  }

  async assignWeight(id: number, userId: number, weight: number) {
    await this.db.query(`UPDATE cards SET weight = $1 WHERE id = $2`, [weight, id]);
    await this.log(id, userId, 'assign_weight', { weight });
    return this.getCard(id);
  }
}
