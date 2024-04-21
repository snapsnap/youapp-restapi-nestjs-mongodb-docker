import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;
  let model: Model<User>;
  let jwtService: JwtService;

  const mockUser = {
    _id: '66220cbfdd2e96fd94478cc5',
    name: 'tes',
    email: 'tes@gmail.com',
    password: '$2a$10$8uJnZ4YbsonjFbx8cVt7xutFDbuWc9ZjxKla78dZXAtFCoqFubHRm',
    // createdAt: '2024-04-19T06:17:00.279+00:00',
    // updatedAt: '2024-04-19T06:17:00.279+00:00',
    // __v: 0
  }

  let token = 'jwtToken';

  const mockAuthService = {
    create: jest.fn(),
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    model = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register a new user', async () => {

    const registerDto = {
      name: 'ian',
      email: 'ian@example.com',
      password: '1234567'
    }

    // jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
    // jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mockUser) as unknown as User);

    // jest.spyOn(jwtService, 'sign').mockReturnValue('jwtToken');

    const result = await authService.register(registerDto);
    // expect(bcrypt.hash).toHaveBeenCalled();
    expect(result.token).toBeDefined();
  });

});
