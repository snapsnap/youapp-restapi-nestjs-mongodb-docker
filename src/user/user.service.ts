import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(Profile.name) private profileModel: mongoose.Model<Profile>
    ) {}

    async findAll() : Promise<Profile[]> {
        const profiles = await this.profileModel.find();
        return profiles;
    }

    async create(
        profile: Profile
    ) : Promise<Profile> {
        const res = await this.profileModel.create(profile);
        return res;
    }

    async findById(
        id: string
    ) : Promise<Profile> {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new NotFoundException('Profile not found');
        }
        const profile = await this.profileModel.findById(id);
        if(!profile) {
            throw new NotFoundException('Profile not found');
        }
        return profile;
    }

    async updateProfileById(
        id: string,
        profile: Profile
    ) : Promise<Profile> {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new NotFoundException('Profile not found');
        }
        
        return await this.profileModel.findByIdAndUpdate(
            id,
            profile,
            {
                new: true,
                runValidators: true
            }
        );
    }
}
