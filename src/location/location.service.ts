import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationGateway } from './location.gateway';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    private locationGateway: LocationGateway,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = new Location();
    location.longitude = createLocationDto.longitude;
    location.latitude = createLocationDto.latitude;
    location.timestamp = new Date(createLocationDto.timestamp);
    location.store = createLocationDto.store;

    const savedLocation = await this.locationRepository.save(location);

    // Emit the new location to all connected clients
    this.locationGateway.emitNewLocation(savedLocation);

    return savedLocation;
  }

  async findAllLocations(): Promise<Location[]> {
    const locations = await this.locationRepository.find({
      order: { timestamp: 'DESC' },
    });

    // Emit all locations to connected clients
    this.locationGateway.emitLocationHistory(locations);

    return locations;
  }

  async getLocationHistory(dateStr?: string): Promise<Location[]> {
    // If no date is provided, use today's date
    const targetDate = dateStr ? new Date(dateStr) : new Date();

    // Ensure the date is valid
    if (isNaN(targetDate.getTime())) {
      throw new Error('Invalid date format. Please use YYYY-MM-DD format.');
    }

    // Set start time to midnight (00:00:00) of the target date
    const startDate = new Date(targetDate);
    startDate.setHours(0, 0, 0, 0);

    // Set end time to 23:59:59.999 of the target date
    const endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999);

    const locations = await this.locationRepository.find({
      where: {
        timestamp: Between(startDate, endDate),
      },
      order: { timestamp: 'ASC' },
    });

    // Emit the location history to all connected clients
    this.locationGateway.emitLocationHistory(locations);

    return locations;
  }
}
