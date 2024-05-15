import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository:
    Repository<City>) {
  }

  //CREATE THE CITY
  async create(createCityDto: CreateCityDto) {
    const city = this.citiesRepository.create(createCityDto)

    return await this.citiesRepository.save(city)
  }

  //GET ALL CITY
  async findAll() {
    return await this.citiesRepository.find();
  }

  //GET SINGLE CITY WITH (:ID)
  async findOne(id: number) {
    return await this.citiesRepository.findOne({ where: { id } });
  }

  //UPDATE CITY WITH (:ID)
  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.findOne(id)
    if(!city) {
      throw new NotFoundException()
    }

    Object.assign(city, updateCityDto)
    return await this.citiesRepository.save(city);
  }

  //REMOVE CITY WITH (:ID)
  async remove(id: number) {
    const city = await this.findOne(id)
    if(!city) {
      throw new NotFoundException()
    }

    return await this.citiesRepository.remove(city);
  }
}
