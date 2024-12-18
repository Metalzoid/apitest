import { Test, TestingModule } from '@nestjs/testing';
import { UserServicesController } from './user-services.controller';

describe('UserServicesController', () => {
  let controller: UserServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserServicesController],
    }).compile();

    controller = module.get<UserServicesController>(UserServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
