import { Controller, Post, Body, Get, Param, Put, Patch} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { ParseIntPipe } from '@nestjs/common'
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data : CreateUserDTO) {
    return this.userService.create(data)
  }

  @Get()
  async list() {
    return this.userService.list();
  }
  @Get(':id')
  async show(@Param('id', ParseIntPipe)id: number) {
    return this.userService.show(id);
  }

    @Put(':id') 
    async update(@Body()  data: UpdatePutUserDTO, @Param('id', ParseIntPipe)id: number){
        return this.userService.update(id, data)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe)id: number) {
        return this.userService.updatePartial(id,data)
        
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe)id: number) {
        return {
            method: 'delete',
            id
        }
    }

}
