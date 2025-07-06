import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { getRoomState } from './room.state';

@Controller('kpi')
export class KpiController {
  constructor(private readonly db: DatabaseService) {}

  @Get('summary')
  async summary() {
    const usersRes = await this.db.query(
      'SELECT id, email, display_name FROM users ORDER BY id',
    );

    const scores = getRoomState()?.getScores() || {};

    const userStatsRes = await this.db.query(
      `SELECT u.id,
              COUNT(CASE WHEN cl.action = 'create' THEN 1 END) AS cards_created,
              COUNT(CASE WHEN cl.action = 'vote' THEN 1 END) AS votes
         FROM users u
         LEFT JOIN card_logs cl ON cl.user_id = u.id
        GROUP BY u.id
        ORDER BY u.id`,
    );

    const totalCardsRes = await this.db.query('SELECT COUNT(*) FROM cards');
    const totalVotesRes = await this.db.query(
      "SELECT COUNT(*) FROM card_logs WHERE action = 'vote'",
    );

    const statsMap: Record<number, any> = {};
    for (const row of userStatsRes.rows) {
      statsMap[row.id] = {
        cards_created: Number(row.cards_created),
        votes: Number(row.votes),
      };
    }

    const users = usersRes.rows.map((u: any) => ({
      id: u.id,
      email: u.email,
      display_name: u.display_name,
      score: scores[u.id] || 0,
      cards_created: statsMap[u.id]?.cards_created || 0,
      votes: statsMap[u.id]?.votes || 0,
    }));

    return {
      team: {
        total_cards: Number(totalCardsRes.rows[0].count),
        total_votes: Number(totalVotesRes.rows[0].count),
      },
      users,
    };
  }
}
