import 'dotenv/config';
import { Bot } from '@maxhub/max-bot-api';
import fs from 'fs/promises';

export default defineEventHandler(async (event) => {
  return 'Hello Nitro';
});
