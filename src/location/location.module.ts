import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { UserModule } from '../user/user.module';
import { LocationGateway } from './location.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationService, LocationGateway],
  controllers: [LocationController],
  exports: [LocationService, LocationGateway],
})
export class LocationModule {}
