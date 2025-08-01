import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  async findAll() {
    return this.locationService.findAllLocations();
  }

  @Get('history')
  async getHistory(@Query('date') date?: string) {
    return this.locationService.getLocationHistory(date);
  }
}
