import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(id: number): string {
    if (id == 1) {
      return 'Hello World!'
    } else {
      return 'Hello TypeScript! Hello Nest.js!';
    }
  }
}
