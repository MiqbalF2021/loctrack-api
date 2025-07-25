import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    // Using a default user ID (1) or you could modify the DTO to include userId
    return this.locationService.createWithoutAuth(createLocationDto, 1);
  }

  @Get()
  async findAll() {
    // Return all locations or locations for a default user (1)
    return this.locationService.findAllLocations();
  }

  @Get('history')
  async getHistory(@Query('date') date?: string) {
    return this.locationService.getLocationHistory(date);
  }
}
