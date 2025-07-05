import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private readonly cards: CardService) {}

  @Post()
  create(@Body() body: any) {
    const { userId, title, description, element, weight } = body;
    return this.cards.createCard(userId, title, description, element, weight);
  }

  @Get()
  list() {
    return this.cards.getCards();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.cards.getCard(Number(id));
  }

  @Get(':id/logs')
  logs(@Param('id') id: string) {
    return this.cards.getCardLogs(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const { userId, ...fields } = body;
    return this.cards.updateCard(Number(id), userId, fields);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body('userId') userId: number) {
    return this.cards.deleteCard(Number(id), userId);
  }

  @Post(':id/split')
  split(@Param('id') id: string, @Body() body: any) {
    const { userId, titles } = body;
    return this.cards.splitCard(Number(id), userId, titles);
  }

  @Post(':id/refuse')
  refuse(@Param('id') id: string, @Body('userId') userId: number) {
    return this.cards.refuseCard(Number(id), userId);
  }

  @Post(':id/element')
  setElement(@Param('id') id: string, @Body() body: any) {
    const { userId, element } = body;
    return this.cards.assignElement(Number(id), userId, element);
  }

  @Post(':id/weight')
  setWeight(@Param('id') id: string, @Body() body: any) {
    const { userId, weight } = body;
    return this.cards.assignWeight(Number(id), userId, weight);
  }
}
