import { CardService } from './card.service';

export interface TableCard {
  card: any;
  votes: Record<number, number>;
}

export class RoomState {
  deck: any[] = [];
  table: TableCard[] = [];
  scores: Record<number, number> = {};

  constructor(public cardService: CardService) {}

  async init() {
    const cards = await this.cardService.getCards();
    this.deck = cards.filter((c) => c.element);
  }

  drawCard() {
    const card = this.deck.shift();
    if (!card) return null;
    this.table.push({ card, votes: {} });
    return card;
  }

  vote(cardId: number, userId: number, value: number) {
    const tc = this.table.find((t) => t.card.id === cardId);
    if (!tc) return;
    tc.votes[userId] = value;
    this.scores[userId] = (this.scores[userId] || 0) + value;
  }

  endSession() {
    this.table = [];
  }

  getScores() {
    return this.scores;
  }

  getState() {
    return { deckCount: this.deck.length, table: this.table };
  }
}

let state: RoomState;

export async function initRoom(cardService: CardService) {
  state = new RoomState(cardService);
  await state.init();
}

export function getRoomState() {
  return state;
}
