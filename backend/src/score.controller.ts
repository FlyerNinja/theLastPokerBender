import { Controller, Get } from '@nestjs/common';
import { getRoomState } from './room.state';

@Controller('scores')
export class ScoreController {
  @Get()
  getScores() {
    const state = getRoomState();
    if (!state) return [];
    const scores = state.getScores();
    return Object.entries(scores).map(([user_id, points]) => ({
      user_id: Number(user_id),
      points,
    }));
  }
}
