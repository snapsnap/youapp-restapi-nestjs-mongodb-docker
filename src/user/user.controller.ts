import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Profile } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/createprofile.dto';
import { UpdateProfileDto } from './dto/updateprofile.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    // @Get()
    // @UseGuards(AuthGuard())
    // async getAllProfiles() : Promise<Profile[]> {
    //     return this.userService.findAll();
    // }

    @Post('/createProfile')
    @UseGuards(AuthGuard('jwt'))
    async createProfile(
        @Body() profile: CreateProfileDto,
        // @Req() req
    ) : Promise<Profile> {
        // console.log(req.user);
        return this.userService.create(profile);
    }

    @Get('/getProfile/:id')
    @UseGuards(AuthGuard())
    async getProfile(
        @Param('id') id: string
    ) : Promise<Profile> {
        return this.userService.findById(id);
    }

    @Put('/updateProfile/:id')
    @UseGuards(AuthGuard())
    async updateProfile(
        @Param('id') id: string,
        @Body() profile: UpdateProfileDto
    ) : Promise<Profile> {
        return this.userService.updateProfileById(id, profile);
    }
}
