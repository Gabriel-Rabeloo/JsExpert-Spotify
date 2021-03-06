import { expect, describe, test, jest, beforeEach } from '@jest/globals';

import { Controller } from '../../../backend/controller.js';
import { Service } from '../../../backend/service.js';
import TestUtil from '../_util/testUtil.js';

describe('#Controller - test suite for controller calls', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('#getFileStream', async () => {
    const mockStream = TestUtil.generateReadableStream(['anything']);
    const mockType = '.html';
    const mockFileName = 'test.html';

    jest.spyOn(Service.prototype, Service.prototype.getFileStream.name).mockResolvedValue({
      stream: mockStream,
      type: mockType,
    });

    const controller = new Controller();
    const { stream, type } = await controller.getFileStream(mockFileName);

    expect(stream).toStrictEqual(mockStream);
    expect(type).toStrictEqual(mockType);
  });

  test('#createClientStream', async () => {
    const mockStream = TestUtil.generateReadableStream(['test']);
    const mockId = '1';
    jest.spyOn(Service.prototype, Service.prototype.createClientStream.name).mockReturnValue({
      id: mockId,
      clientStream: mockStream,
    });

    jest.spyOn(Service.prototype, Service.prototype.removeClientStream.name).mockReturnValue();

    const controller = new Controller();
    const { stream, onClose } = controller.createClientStream();

    onClose();

    expect(stream).toStrictEqual(mockStream);
    expect(Service.prototype.removeClientStream).toHaveBeenCalledWith(mockId);
    expect(Service.prototype.createClientStream).toHaveBeenCalled();
  });

  describe('handleCommand', () => {
    test('command stop', async () => {
      jest.spyOn(Service.prototype, Service.prototype.stopStreaming.name).mockResolvedValue();

      const controller = new Controller();
      const data = {
        command: '   stop   ',
      };
      const result = await controller.handleCommand(data);
      expect(result).toStrictEqual({
        result: 'ok',
      });
      expect(Service.prototype.stopStreaming).toHaveBeenCalled();
    });

    test('command start', async () => {
      jest.spyOn(Service.prototype, Service.prototype.startStreaming.name).mockResolvedValue();

      const controller = new Controller();
      const data = {
        command: ' START ',
      };
      const result = await controller.handleCommand(data);
      expect(result).toStrictEqual({
        result: 'ok',
      });
      expect(Service.prototype.startStreaming).toHaveBeenCalled();
    });

    test('non existing command', async () => {
      jest.spyOn(Service.prototype, Service.prototype.startStreaming.name).mockResolvedValue();

      const controller = new Controller();
      const data = {
        command: ' NON EXISTING ',
      };
      const result = await controller.handleCommand(data);
      expect(result).toStrictEqual({
        result: 'ok',
      });
      expect(Service.prototype.startStreaming).not.toHaveBeenCalled();
    });
  });
});
