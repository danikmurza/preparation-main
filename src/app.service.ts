import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'USER LIST - LEARNING API PROJECT';
  }
}
