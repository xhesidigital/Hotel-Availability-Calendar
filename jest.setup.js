jest.mock('flatpickr', () => jest.fn(() => ({
    config: {},
    destroy: jest.fn(),
  })));
  