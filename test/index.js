import {
  codesMap,
  codes,
  encode,
  length,
  decode,
} from '../index.js'

describe('basic functionality', function basics() {
  describe('round trip', function rtBlock() {
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
      it('round trip: gets same answer for: ' + preview, function rtTest() {
        expect(input).toBe(decode(encode(input), codesMap(input)));
     });
    });
  });
});
