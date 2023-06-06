import { Module } from '@nestjs/common';
import { AppartementService } from './appartement.service';
import { AppartementController } from './appartement.controller';

@Module({
  providers: [AppartementService],
  controllers: [AppartementController]
})
export class AppartementModule {}
