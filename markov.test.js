const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
  describe('constructor', () => {
    it('should create a MarkovMachine instance', () => {
      const markov = new MarkovMachine('This is a test sentence.');
      expect(markov).toBeInstanceOf(MarkovMachine);
    });

    it('should create the correct word chains', () => {
      const markov = new MarkovMachine('This is a test sentence.');
      expect(markov.chains.get('This')).toEqual(['is']);
      expect(markov.chains.get('is')).toEqual(['a']);
      expect(markov.chains.get('a')).toEqual(['test']);
      expect(markov.chains.get('test')).toEqual(['sentence.']);
      expect(markov.chains.get('sentence.')).toEqual([null]);
    });
  });

  describe('makeText', () => {
    it('should generate text', () => {
      const markov = new MarkovMachine('This is a test sentence.');
      const text = markov.makeText();
      expect(text).not.toBeNull();
      expect(typeof text).toBe('string');
    });

    it('should generate text with the given number of words', () => {
      const markov = new MarkovMachine('This algorithm is inherently random. But there are things you can test.');
      const text = markov.makeText(numWords=10);
      const words = text.split(' ');
      expect(words.length).toBeLessThanOrEqual(numWords);
      expect(words.length).toBeGreaterThan(0);
      console.log(words.length)
    });
  });
});
