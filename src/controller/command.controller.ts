/**
 * File: command.controller.ts
 * Description: 口令解析和生成入口
 * Author: zhx47
 */

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ResBaseDto } from './dto/res.dto';
import { CommandService } from '../services/command.service';

@Controller()
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Get('/jComExchange')
  handleJComExchangeGet(@Query('command') command: string): ResBaseDto<string> {
    const url = this.commandService.jComExchange(command);
    return new ResBaseDto<string>(url);
  }

  @Post('/jComExchange')
  handleJComExchangePost(@Body('command') command: string): ResBaseDto<string> {
    const url = this.commandService.jComExchange(command);
    return new ResBaseDto<string>(url);
  }
}
