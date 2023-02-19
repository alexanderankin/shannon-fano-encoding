import {
  codesMap,
  codes,
  encode,
  length,
  decode,
  _shannonValuesOfKeys,
} from '../index.js'

describe('basic functionality:', function basics() {
  describe('round trip:', function rtBlock() {
    [
      'a',
      'ab',
      'yz',
      'abc',
      'shannon',
      `Ad quis incididunt aliqua aute aliqua reprehenderit officia
       ad proident eiusmod duis amet ea ullamco nulla ullamco incididunt
       fugiat in aliquip est duis labore dolore cupidatat reprehenderit ut
       officia consectetur dolore tempor nulla in esse eu ea duis
       exercitation ut commodo laboris tempor ut anim sunt est duis
       incididunt aute laborum id deserunt dolor ad laboris aute ullamco amet
       cupidatat aute commodo voluptate ullamco nisi in et elit enim ullamco
       incididunt sed exercitation dolor nulla consequat sed veniam ullamco
       voluptate enim ut sunt consequat aliqua deserunt anim eu incididunt
       adipisicing sunt nostrud qui adipisicing ad dolore pariatur eiusmod
       nostrud excepteur ut voluptate sit consectetur do elit sunt elit
       consectetur dolor amet dolor ad exercitation et ad in elit ut
       exercitation laboris quis in ut id deserunt consequat amet est fugiat
       mollit eu in laboris reprehenderit velit labore cillum et incididunt
       cupidatat id tempor amet elit magna ut laboris incididunt et irure non
       sit eiusmod proident excepteur non sint eu exercitation et pariatur
       non nulla do aute eiusmod dolor occaecat elit deserunt pariatur
       reprehenderit ea minim dolore minim quis id tempor et exercitation eu
       incididunt velit et nisi laborum ullamco aliquip duis velit culpa
       consectetur deserunt mollit ad.`,
    ].forEach(function rtSpecific(input) {
      let preview = input.length > 10 ? (input.slice(0, 10) + '...') : input;
      it(`should decode same value after encoding: '${preview}'`, () => {
        expect(decode(encode(input), codesMap(input))).toBe(input);
     });
    });
  });

  describe('individual functions:', () => {
    it('should correctly determine codes/codesMap', function codesMapTest() {
      expect(Object.fromEntries(codesMap('abcde')))
        .toEqual({ a: '00', b: '01', c: '10', d: '110', e: '111' });
      expect(codes('abcde'))
        .toEqual({ a: '00', b: '01', c: '10', d: '110', e: '111' });
      expect(codes('codes/codesMap'))
        .toEqual({ c: '00', o: '01', d: '10', e: '110', s: '1110',
          '/': '11110', M: '111110', a: '1111110', p: '1111111' });
      expect(codes('abbcccddddeeeeeffffff'))
        .toEqual({ f: '00', e: '01', d: '10', c: '110', a: '1111', b: '1110', });
      expect(codes('aaaaaabbbbbccccdddeef'))
        .toEqual({ a: '00', b: '01', c: '10', d: '110', f: '1111', e: '1110', });
    });

    it('should correctly encode', function encodeTest() {
      expect(encode('abcde')).toBe('000110110111');
      expect(encode('def')).toBe('000110');
    });

    it('should correctly decode', function decodeTest() {
      expect(decode('000110110111',
          { a: '00', b: '01', c: '10', d: '110', e: '111' }))
        .toBe('abcde');
      expect(decode('000110',
          { d: '00', e: '01', f: '10' }))
        .toBe('def');
    });

    it('should correctly determine length', function lengthTest() {
      expect(length('abcde')).toBe('000110110111'.length);
      expect(length('def')).toBe('000110'.length);
    });

    it('should correctly determine _shannonValuesOfKeys', function shannonValuesTest() {
      expect(Object.fromEntries(_shannonValuesOfKeys('abcde')))
        .toEqual({ a: '00', b: '01', c: '10', e: '111', d: '110' })
      expect(Object.fromEntries(_shannonValuesOfKeys('abcdefghij')))
        .toEqual({ a: '00', b: '01', c: '10', d: '110', e: '1110',
          f: '11110', g: '111110', h: '1111110', j: '11111111', i: '11111110' })
    })
  });
});
