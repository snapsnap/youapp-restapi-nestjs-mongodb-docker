import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model, model } from 'mongoose';

describe('UserService', () => {
  let userService: UserService;
  let model: Model<Profile>;

  const mockProfile = {
    _id: '66220cbfdd2e96fd94478cc5',
    name: 'ian',
    birthday: '10/04/1994',
    height: 160,
    weight: 50,
    interest: ['music','coding']
  }

  const mockProfileService = {
    findById: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(Profile.name),
          useValue: mockProfileService
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should find and return a Profile by Id', async () => {
    jest.spyOn(model, 'findById').mockResolvedValue(mockProfile);

    const result = await userService.findById(mockProfile._id);

    expect(model).toHaveBeenCalledWith(mockProfile._id);
    expect(result).toEqual(mockProfile);
  });

});
