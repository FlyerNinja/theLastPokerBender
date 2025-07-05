import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initRoom, getRoomState } from './room.state';
import { CardService } from './card.service';

const { WebSocketServer } = require('../../client/node_modules/ws');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }
  await initRoom(app.get(CardService));

  const server = app.getHttpServer();
  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws: any) => {
    ws.on('message', async (data: Buffer) => {
      const msg = JSON.parse(data.toString());
      const room = getRoomState();
      if (!room) return;
      if (msg.type === 'join') {
        ws.userId = msg.userId;
        ws.send(JSON.stringify({ type: 'state', ...room.getState() }));
      } else if (msg.type === 'draw') {
        const card = room.drawCard();
        if (card) {
          await room.cardService.recordAction(card.id, msg.userId, 'draw', {});
          const payload = JSON.stringify({ type: 'card', card, deckCount: room.deck.length });
          wss.clients.forEach((c: any) => c.send(payload));
        }
      } else if (msg.type === 'vote') {
        room.vote(msg.cardId, msg.userId, msg.value);
        await room.cardService.recordAction(msg.cardId, msg.userId, 'vote', { value: msg.value });
        const payload = JSON.stringify({ type: 'vote', cardId: msg.cardId, userId: msg.userId, value: msg.value });
        wss.clients.forEach((c: any) => c.send(payload));
      } else if (msg.type === 'end') {
        room.endSession();
        const payload = JSON.stringify({ type: 'end' });
        wss.clients.forEach((c: any) => c.send(payload));
      }
    });
  });

  server.on('upgrade', (req: any, socket: any, head: any) => {
    if (req.url === '/room') {
      wss.handleUpgrade(req, socket, head, (ws: any) => {
        wss.emit('connection', ws, req);
      });
    }
  });

  await app.listen(4000);
}

bootstrap();
