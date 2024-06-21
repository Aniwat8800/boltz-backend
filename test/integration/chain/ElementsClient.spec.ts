import { elementsClient } from '../Nodes';

jest.mock('../../../lib/db/repositories/ChainTipRepository');

describe('ElementsClient', () => {
  beforeAll(async () => {
    await elementsClient.connect();
  });

  afterAll(() => {
    elementsClient.disconnect();
  });

  describe('getNewAddress', () => {
    test('should add label', async () => {
      const label = 'test';
      const address = await elementsClient.getNewAddress(label);
      const { labels } = await elementsClient.getAddressInfo(address);
      expect(labels).toEqual([label]);
    });
  });

  describe('sendToAddress', () => {
    test('should add label', async () => {
      const label = 'test tx';
      const transactionId = await elementsClient.sendToAddress(
        await elementsClient.getNewAddress(''),
        100_000,
        undefined,
        false,
        label,
      );
      const { comment } =
        await elementsClient.getWalletTransaction(transactionId);
      expect(comment).toEqual(label);
    });
  });
});
