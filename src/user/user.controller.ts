import { Controller, Post, Body, Get, Put, Patch} from '@nestjs/common';
import { Delete, UseInterceptors } from '@nestjs/common/decorators';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() data : CreateUserDTO) {
    return this.userService.create(data)
  }

  @Get()
  async list() {
    return this.userService.list();
  }
  @Get(':id')
  async show(@ParamId() id: number) {
    console.log({id})
    return this.userService.show(id);
  }

    @Put(':id') 
    async update(@Body()  data: UpdatePutUserDTO, @ParamId() id: number){
        return this.userService.update(id, data)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
        return this.userService.updatePartial(id,data)
        
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id)
     
    }
}
