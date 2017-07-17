/*
sha-3-blake-256

adapted from: https://131002.net/blake/#fi
author: Jeffrey David Allen
created: Saturday, July 15th, 2017
github: https://github.com/jeffallen6767/sha-3-blake-256
website: http://jdallen.net/


Note 1: All variables are 32 bit unsigned integers and addition is calculated modulo 2^32

Helpers:
----------------------
byte = 8 bits

1111 1111 = FF = 256

dec:000 hex:00 bin:00000000 char:
dec:001 hex:01 bin:00000001 char:☺
dec:002 hex:02 bin:00000010 char:☻
dec:003 hex:03 bin:00000011 char:♥
dec:004 hex:04 bin:00000100 char:♦
dec:005 hex:05 bin:00000101 char:♣
dec:006 hex:06 bin:00000110 char:♠
dec:007 hex:07 bin:00000111 char:
dec:008 hex:08 bin:00001000 char:
dec:009 hex:09 bin:00001001 char:
dec:010 hex:0A bin:00001010 char:[linefeed?]
dec:011 hex:0B bin:00001011 char:♂
dec:012 hex:0C bin:00001100 char:♀
dec:013 hex:0D bin:00001101 char:
dec:014 hex:0E bin:00001110 char:♫
dec:015 hex:0F bin:00001111 char:☼
dec:016 hex:10 bin:00010000 char:►
dec:017 hex:11 bin:00010001 char:◄
dec:018 hex:12 bin:00010010 char:↕
dec:019 hex:13 bin:00010011 char:‼
dec:020 hex:14 bin:00010100 char:¶
dec:021 hex:15 bin:00010101 char:§
dec:022 hex:16 bin:00010110 char:▬
dec:023 hex:17 bin:00010111 char:↨
dec:024 hex:18 bin:00011000 char:↑
dec:025 hex:19 bin:00011001 char:↓
dec:026 hex:1A bin:00011010 char:→
dec:027 hex:1B bin:00011011 char:
dec:028 hex:1C bin:00011100 char:∟
dec:029 hex:1D bin:00011101 char:↔
dec:030 hex:1E bin:00011110 char:▲
dec:031 hex:1F bin:00011111 char:▼
dec:032 hex:20 bin:00100000 char:
dec:033 hex:21 bin:00100001 char:!
dec:034 hex:22 bin:00100010 char:"
dec:035 hex:23 bin:00100011 char:#
dec:036 hex:24 bin:00100100 char:$
dec:037 hex:25 bin:00100101 char:%
dec:038 hex:26 bin:00100110 char:&
dec:039 hex:27 bin:00100111 char:'
dec:040 hex:28 bin:00101000 char:(
dec:041 hex:29 bin:00101001 char:)
dec:042 hex:2A bin:00101010 char:*
dec:043 hex:2B bin:00101011 char:+
dec:044 hex:2C bin:00101100 char:,
dec:045 hex:2D bin:00101101 char:-
dec:046 hex:2E bin:00101110 char:.
dec:047 hex:2F bin:00101111 char:/
dec:048 hex:30 bin:00110000 char:0
dec:049 hex:31 bin:00110001 char:1
dec:050 hex:32 bin:00110010 char:2
dec:051 hex:33 bin:00110011 char:3
dec:052 hex:34 bin:00110100 char:4
dec:053 hex:35 bin:00110101 char:5
dec:054 hex:36 bin:00110110 char:6
dec:055 hex:37 bin:00110111 char:7
dec:056 hex:38 bin:00111000 char:8
dec:057 hex:39 bin:00111001 char:9
dec:058 hex:3A bin:00111010 char::
dec:059 hex:3B bin:00111011 char:;
dec:060 hex:3C bin:00111100 char:<
dec:061 hex:3D bin:00111101 char:=
dec:062 hex:3E bin:00111110 char:>
dec:063 hex:3F bin:00111111 char:?
dec:064 hex:40 bin:01000000 char:@
dec:065 hex:41 bin:01000001 char:A
dec:066 hex:42 bin:01000010 char:B
dec:067 hex:43 bin:01000011 char:C
dec:068 hex:44 bin:01000100 char:D
dec:069 hex:45 bin:01000101 char:E
dec:070 hex:46 bin:01000110 char:F
dec:071 hex:47 bin:01000111 char:G
dec:072 hex:48 bin:01001000 char:H
dec:073 hex:49 bin:01001001 char:I
dec:074 hex:4A bin:01001010 char:J
dec:075 hex:4B bin:01001011 char:K
dec:076 hex:4C bin:01001100 char:L
dec:077 hex:4D bin:01001101 char:M
dec:078 hex:4E bin:01001110 char:N
dec:079 hex:4F bin:01001111 char:O
dec:080 hex:50 bin:01010000 char:P
dec:081 hex:51 bin:01010001 char:Q
dec:082 hex:52 bin:01010010 char:R
dec:083 hex:53 bin:01010011 char:S
dec:084 hex:54 bin:01010100 char:T
dec:085 hex:55 bin:01010101 char:U
dec:086 hex:56 bin:01010110 char:V
dec:087 hex:57 bin:01010111 char:W
dec:088 hex:58 bin:01011000 char:X
dec:089 hex:59 bin:01011001 char:Y
dec:090 hex:5A bin:01011010 char:Z
dec:091 hex:5B bin:01011011 char:[
dec:092 hex:5C bin:01011100 char:\
dec:093 hex:5D bin:01011101 char:]
dec:094 hex:5E bin:01011110 char:^
dec:095 hex:5F bin:01011111 char:_
dec:096 hex:60 bin:01100000 char:`
dec:097 hex:61 bin:01100001 char:a
dec:098 hex:62 bin:01100010 char:b
dec:099 hex:63 bin:01100011 char:c
dec:100 hex:64 bin:01100100 char:d
dec:101 hex:65 bin:01100101 char:e
dec:102 hex:66 bin:01100110 char:f
dec:103 hex:67 bin:01100111 char:g
dec:104 hex:68 bin:01101000 char:h
dec:105 hex:69 bin:01101001 char:i
dec:106 hex:6A bin:01101010 char:j
dec:107 hex:6B bin:01101011 char:k
dec:108 hex:6C bin:01101100 char:l
dec:109 hex:6D bin:01101101 char:m
dec:110 hex:6E bin:01101110 char:n
dec:111 hex:6F bin:01101111 char:o
dec:112 hex:70 bin:01110000 char:p
dec:113 hex:71 bin:01110001 char:q
dec:114 hex:72 bin:01110010 char:r
dec:115 hex:73 bin:01110011 char:s
dec:116 hex:74 bin:01110100 char:t
dec:117 hex:75 bin:01110101 char:u
dec:118 hex:76 bin:01110110 char:v
dec:119 hex:77 bin:01110111 char:w
dec:120 hex:78 bin:01111000 char:x
dec:121 hex:79 bin:01111001 char:y
dec:122 hex:7A bin:01111010 char:z
dec:123 hex:7B bin:01111011 char:{
dec:124 hex:7C bin:01111100 char:|
dec:125 hex:7D bin:01111101 char:}
dec:126 hex:7E bin:01111110 char:~
dec:127 hex:7F bin:01111111 char:⌂
dec:128 hex:80 bin:10000000 char:?
dec:129 hex:81 bin:10000001 char:?
dec:130 hex:82 bin:10000010 char:?
dec:131 hex:83 bin:10000011 char:?
dec:132 hex:84 bin:10000100 char:?
dec:133 hex:85 bin:10000101 char:?
dec:134 hex:86 bin:10000110 char:?
dec:135 hex:87 bin:10000111 char:?
dec:136 hex:88 bin:10001000 char:?
dec:137 hex:89 bin:10001001 char:?
dec:138 hex:8A bin:10001010 char:?
dec:139 hex:8B bin:10001011 char:?
dec:140 hex:8C bin:10001100 char:?
dec:141 hex:8D bin:10001101 char:?
dec:142 hex:8E bin:10001110 char:?
dec:143 hex:8F bin:10001111 char:?
dec:144 hex:90 bin:10010000 char:?
dec:145 hex:91 bin:10010001 char:?
dec:146 hex:92 bin:10010010 char:?
dec:147 hex:93 bin:10010011 char:?
dec:148 hex:94 bin:10010100 char:?
dec:149 hex:95 bin:10010101 char:?
dec:150 hex:96 bin:10010110 char:?
dec:151 hex:97 bin:10010111 char:?
dec:152 hex:98 bin:10011000 char:?
dec:153 hex:99 bin:10011001 char:?
dec:154 hex:9A bin:10011010 char:?
dec:155 hex:9B bin:10011011 char:[backspace or delete?]
dec:156 hex:9C bin:10011100 char:?
dec:157 hex:9D bin:10011101 char:?
dec:158 hex:9E bin:10011110 char:?
dec:159 hex:9F bin:10011111 char:?
dec:160 hex:A0 bin:10100000 char: 
dec:161 hex:A1 bin:10100001 char:¡
dec:162 hex:A2 bin:10100010 char:¢
dec:163 hex:A3 bin:10100011 char:£
dec:164 hex:A4 bin:10100100 char:☼
dec:165 hex:A5 bin:10100101 char:¥
dec:166 hex:A6 bin:10100110 char:▌
dec:167 hex:A7 bin:10100111 char:§
dec:168 hex:A8 bin:10101000 char:"
dec:169 hex:A9 bin:10101001 char:c
dec:170 hex:AA bin:10101010 char:ª
dec:171 hex:AB bin:10101011 char:«
dec:172 hex:AC bin:10101100 char:¬
dec:173 hex:AD bin:10101101 char:-
dec:174 hex:AE bin:10101110 char:r
dec:175 hex:AF bin:10101111 char:_
dec:176 hex:B0 bin:10110000 char:°
dec:177 hex:B1 bin:10110001 char:±
dec:178 hex:B2 bin:10110010 char:²
dec:179 hex:B3 bin:10110011 char:3
dec:180 hex:B4 bin:10110100 char:'
dec:181 hex:B5 bin:10110101 char:µ
dec:182 hex:B6 bin:10110110 char:¶
dec:183 hex:B7 bin:10110111 char:·
dec:184 hex:B8 bin:10111000 char:,
dec:185 hex:B9 bin:10111001 char:1
dec:186 hex:BA bin:10111010 char:º
dec:187 hex:BB bin:10111011 char:»
dec:188 hex:BC bin:10111100 char:¼
dec:189 hex:BD bin:10111101 char:½
dec:190 hex:BE bin:10111110 char:_
dec:191 hex:BF bin:10111111 char:¿
dec:192 hex:C0 bin:11000000 char:A
dec:193 hex:C1 bin:11000001 char:A
dec:194 hex:C2 bin:11000010 char:A
dec:195 hex:C3 bin:11000011 char:A
dec:196 hex:C4 bin:11000100 char:Ä
dec:197 hex:C5 bin:11000101 char:Å
dec:198 hex:C6 bin:11000110 char:Æ
dec:199 hex:C7 bin:11000111 char:Ç
dec:200 hex:C8 bin:11001000 char:E
dec:201 hex:C9 bin:11001001 char:É
dec:202 hex:CA bin:11001010 char:E
dec:203 hex:CB bin:11001011 char:E
dec:204 hex:CC bin:11001100 char:I
dec:205 hex:CD bin:11001101 char:I
dec:206 hex:CE bin:11001110 char:I
dec:207 hex:CF bin:11001111 char:I
dec:208 hex:D0 bin:11010000 char:D
dec:209 hex:D1 bin:11010001 char:Ñ
dec:210 hex:D2 bin:11010010 char:O
dec:211 hex:D3 bin:11010011 char:O
dec:212 hex:D4 bin:11010100 char:O
dec:213 hex:D5 bin:11010101 char:O
dec:214 hex:D6 bin:11010110 char:Ö
dec:215 hex:D7 bin:11010111 char:x
dec:216 hex:D8 bin:11011000 char:O
dec:217 hex:D9 bin:11011001 char:U
dec:218 hex:DA bin:11011010 char:U
dec:219 hex:DB bin:11011011 char:U
dec:220 hex:DC bin:11011100 char:Ü
dec:221 hex:DD bin:11011101 char:Y
dec:222 hex:DE bin:11011110 char:_
dec:223 hex:DF bin:11011111 char:ß
dec:224 hex:E0 bin:11100000 char:à
dec:225 hex:E1 bin:11100001 char:á
dec:226 hex:E2 bin:11100010 char:â
dec:227 hex:E3 bin:11100011 char:a
dec:228 hex:E4 bin:11100100 char:ä
dec:229 hex:E5 bin:11100101 char:å
dec:230 hex:E6 bin:11100110 char:æ
dec:231 hex:E7 bin:11100111 char:ç
dec:232 hex:E8 bin:11101000 char:è
dec:233 hex:E9 bin:11101001 char:é
dec:234 hex:EA bin:11101010 char:ê
dec:235 hex:EB bin:11101011 char:ë
dec:236 hex:EC bin:11101100 char:ì
dec:237 hex:ED bin:11101101 char:í
dec:238 hex:EE bin:11101110 char:î
dec:239 hex:EF bin:11101111 char:ï
dec:240 hex:F0 bin:11110000 char:d
dec:241 hex:F1 bin:11110001 char:ñ
dec:242 hex:F2 bin:11110010 char:ò
dec:243 hex:F3 bin:11110011 char:ó
dec:244 hex:F4 bin:11110100 char:ô
dec:245 hex:F5 bin:11110101 char:o
dec:246 hex:F6 bin:11110110 char:ö
dec:247 hex:F7 bin:11110111 char:÷
dec:248 hex:F8 bin:11111000 char:o
dec:249 hex:F9 bin:11111001 char:ù
dec:250 hex:FA bin:11111010 char:ú
dec:251 hex:FB bin:11111011 char:û
dec:252 hex:FC bin:11111100 char:ü
dec:253 hex:FD bin:11111101 char:y
dec:254 hex:FE bin:11111110 char:_
dec:255 hex:FF bin:11111111 char:ÿ

Test message:
"Jeffrey David Allen"
Expected hashing result:
"33F9383A 82D3ADE9 B4BD7BEB 43691ACA 9DFD2102 3D3102AD 5B02DA94 6BDF11E3"

char - dec - hex - bin
---------------------------
J       74   4A    01001010 (start of message)
e      101   65    01100101
f      102   66    01100110
f      102   66    01100110

r      114   72    01110010
e      101   65    01100101
y      121   79    01111001
(space) 32   20    00100000

D       68   44    01000100
a       97   61    01100001
v      118   76    01110110
i      105   69    01101001

d      100   64    01100100
(space) 32   20    00100000
A       65   41    01000001
l      108   6C    01101100

l      108   6C    01101100
e      101   65    01100101
n      110   6E    01101110 (end of message)
(pad)  128   80    10000000 <--- start of pad - start with a one bit and add minimum 7 0's

(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000

(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000

(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000

(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000

(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000

(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000

(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000

(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000

(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000
(pad)    0   00    00000000 <--- end of pad

(size)   0   00    00000000 <--- start size of message as a 64-bit big-endian integer
(size)   0   00    00000000
(size)   0   00    00000000
(size)   0   00    00000000

(size)   0   00    00000000
(size)   0   00    00000000
(size)   0   00    00000000
(size)   0   00    00000000 <--- end size of message as a 64-bit big-endian integer

original message: "Jeffrey David Allen"
char length: 19

1 block = 512 bits (16 words x 32 bits)

*/

function blockOut(block) {
  var width = 8,
    len = block.length,
    stp = len / width,
    x,y,z;
  for (x=0; x<len; x+=stp) {
    z = [];
    for (y=0; y<width; y++) {
      z.push(block[x+y]);
    }
    console.log([x, z.join()].join(" "));
  }
}

function outIdx(vals, size) {
  var len = vals.length,
    x;
  for (x=0; x<len; x++) {
    console.log(x, vals[x]);
  }
}

/*
BLAKE-256 uses 16 constants
First digits of π (pi):
k[0..15] :=
  0x243F6A88, 0x85A308D3, 0x13198A2E, 0x03707344, 0xA4093822, 0x299F31D0, 0x082EFA98, 0xEC4E6C89,
  0x452821E6, 0x38D01377, 0xBE5466CF, 0x34E90C6C, 0xC0AC29B7, 0xC97C50DD, 0x3F84D5B5, 0xB5470917
*/
var u256 = [
  0x243F6A88, 0x85A308D3, 0x13198A2E, 0x03707344, 0xA4093822, 0x299F31D0, 0x082EFA98, 0xEC4E6C89,
  0x452821E6, 0x38D01377, 0xBE5466CF, 0x34E90C6C, 0xC0AC29B7, 0xC97C50DD, 0x3F84D5B5, 0xB5470917
];

// Permutations of {0, . . . , 15} used by the BLAKE functions
// NOTE: repeats after round 10
var sigma = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
  [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
  [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
  [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
  [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
  [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
  [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
  [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
  [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]
];

// 1 character = 8 bits = 1 byte
var COMPRESSION_ROUNDS = 14,
  
  BYTE_SIZE = 8,
  WORD_SIZE_BYTES = 4,

  PAD_START_DEC_VAL_SOME = 128,
  PAD_END_DEC_VAL_SOME = 1,

  PAD_START_DEC_VAL_NONE = 129,
  PAD_END_DEC_VAL_NONE = 0,

  MIN_PAD_BYTES = 1,
  MSG_SIZE_BYTES = 8,
  MIN_PRE_CALC_BYTES = MIN_PAD_BYTES + MSG_SIZE_BYTES,

  BLOCK_SIZE_BYTES = 64,
  
  WORDS_IN_BLOCK = BLOCK_SIZE_BYTES / WORD_SIZE_BYTES,
  
  BYTE_MULT_32_1 = 16777216,
  BYTE_MULT_32_2 = 65536,
  BYTE_MULT_32_3 = 256,
  
  ZERO_BITS_4_BYTES = "00000000",
  ZERO_BITS_8_BYTES = "0000000000000000",
  
  NUM_SIGMA = sigma.length,
  
  INPUT_TYPE_ARRAY = "bytes",
  INPUT_TYPE_STRING = "string";

function rightrotate(bits, num) {
  return ((bits >>> num) | (bits << (32 - num)));
}

function sha3blake256(obj, next) {
  
  var input = obj.input,
    salt = obj.salt,
    inputType = Array.isArray(input) ? INPUT_TYPE_ARRAY : INPUT_TYPE_STRING,
    inputBytes = input.length,
    // # of chars + 0x81 [1000 0001] + 64bit length of msg in bits
    preProcessOffsetBytes = (inputBytes + MIN_PRE_CALC_BYTES) % BLOCK_SIZE_BYTES,
    padStart = preProcessOffsetBytes ? PAD_START_DEC_VAL_SOME : PAD_START_DEC_VAL_NONE,
    padEnd = preProcessOffsetBytes ? PAD_END_DEC_VAL_SOME : PAD_END_DEC_VAL_NONE,
    preProcessZeroPadBytes = preProcessOffsetBytes ? BLOCK_SIZE_BYTES - preProcessOffsetBytes - padEnd : preProcessOffsetBytes,
    preProcessBlockWidth = inputBytes + MIN_PRE_CALC_BYTES + preProcessZeroPadBytes + padEnd,
    inputSizeInBits = inputBytes * BYTE_SIZE,
    sizeBytes = inputSizeInBits.toString(16),
    hexSize = ZERO_BITS_8_BYTES.substr(sizeBytes.length) + sizeBytes,
    arrHexSize = hexSize.split(""),
    
    buffer = new Array(preProcessBlockWidth),
    
    s = [0,0,0,0],
    
    t = [0,0],
    
    h = [
      0x6a09e667,
      0xbb67ae85,
      0x3c6ef372,
      0xa54ff53a,
      0x510e527f,
      0x9b05688c,
      0x1f83d9ab,
      0x5be0cd19
    ],
    
    m = new Array(WORDS_IN_BLOCK),
    v = new Array(WORDS_IN_BLOCK),
    
    x,y,z,
    
    output;
  
  /*
  Pre-processing:
  begin with the original message of length L bits
  */
  console.log("input", input);
  console.log("salt", salt);
  console.log("inputBytes", inputBytes);
  console.log("preProcessOffsetBytes", preProcessOffsetBytes);
  console.log("preProcessZeroPadBytes", preProcessZeroPadBytes);
  console.log("preProcessBlockWidth", preProcessBlockWidth);
  console.log("inputSizeInBits", inputSizeInBits);
  console.log("sizeBytes", sizeBytes);
  console.log("hexSize", hexSize);
  
  // add message
  switch (inputType) {
    case INPUT_TYPE_ARRAY:
      for (x=0; x<inputBytes; x++) {
        buffer[x] = input[x];
      }
      break;
    case INPUT_TYPE_STRING:
    default:
      for (x=0; x<inputBytes; x++) {
        buffer[x] = input.charCodeAt(x);
      }
      break;
  }
  
  // add first pad byte:
  buffer[x++] = padStart;
  
  // add zero pad fill:
  for (y=0; y<preProcessZeroPadBytes; y++) {
    buffer[x++] = 0;
  }
  
  // add last pad byte?:
  if (padEnd) {
    buffer[x++] = padEnd;
  }
  
  // add 8 byte size:
  while (arrHexSize.length > 0) {
    buffer[x++] = parseInt(arrHexSize.shift() + arrHexSize.shift(), 16);
  }
  
  console.log("buffer", BYTE_SIZE);
  outIdx(buffer, BYTE_SIZE);
  
  console.log("u256", u256);
  
  function transform(a,b,c,d,e, i) {
    
    var j = sigma[i % NUM_SIGMA],
      k1 = j[e],
      k2 = j[e+1];
    
    v[a] = (v[a] + v[b] + (m[k1] ^ u256[k2])) >>> 0;
    v[d] = (rightrotate(v[d] ^ v[a], 16)) >>> 0;
    v[c] = (v[c] + v[d]) >>> 0;
    v[b] = (rightrotate(v[b] ^ v[c], 12)) >>> 0;
    
    v[a] = (v[a] + v[b] + (m[k2] ^ u256[k1])) >>> 0;
    v[d] = (rightrotate(v[d] ^ v[a], 8)) >>> 0;
    v[c] = (v[c] + v[d]) >>> 0;
    v[b] = (rightrotate(v[b] ^ v[c], 7)) >>> 0;
    
    console.log("transform["+i+"]", a,b,c,d,e, v);
  }
  
  for (x=0; x<preProcessBlockWidth; x+=BLOCK_SIZE_BYTES) {
    
    // copy message bytes
    for (z=0; z<16; z++) {
      u = z * WORD_SIZE_BYTES;
      y = x + u;
      m[z] = buffer[y] * BYTE_MULT_32_1 + buffer[y+1] * BYTE_MULT_32_2 + buffer[y+2] * BYTE_MULT_32_3 + buffer[y+3];
      console.log("z", z, "u", u, "y", y, "m["+z+"]", m[z]);
    }
    
    // copy hash bytes
    v[0] = h[0];
    v[1] = h[1];
    v[2] = h[2];
    v[3] = h[3];
    v[4] = h[4];
    v[5] = h[5];
    v[6] = h[6];
    v[7] = h[7];
    
    // salt bytes mixed with pi constants
    v[8] = (s[0] ^ u256[0]) >>> 0;
    v[9] = (s[1] ^ u256[1]) >>> 0;
    v[10] = (s[2] ^ u256[2]) >>> 0;
    v[11] = (s[3] ^ u256[3]) >>> 0;
    
    // counter and more pi constants
    v[12] = (t[0] ^ u256[4]) >>> 0;
    v[13] = (t[0] ^ u256[5]) >>> 0;
    v[14] = (t[1] ^ u256[6]) >>> 0;
    v[15] = (t[1] ^ u256[7]) >>> 0;
    
    console.log("v", v);
    
    // compression rounds
    for (z=0; z<COMPRESSION_ROUNDS; z++) {
      // columns
      transform( 0,  4,  8, 12,  0, z );
      transform( 1,  5,  9, 13,  2, z );
      transform( 2,  6, 10, 14,  4, z );
      transform( 3,  7, 11, 15,  6, z );
      // diagonals
      transform( 0,  5, 10, 15,  8, z );
      transform( 1,  6, 11, 12, 10, z );
      transform( 2,  7,  8, 13, 12, z );
      transform( 3,  4,  9, 14, 14, z );
    }
    
    h[0] = (h[0] ^ s[0] ^ v[0] ^ v[8]) >>> 0;
    h[1] = (h[1] ^ s[1] ^ v[1] ^ v[9]) >>> 0;
    h[2] = (h[2] ^ s[2] ^ v[2] ^ v[10]) >>> 0;
    h[3] = (h[3] ^ s[3] ^ v[3] ^ v[11]) >>> 0;
    h[4] = (h[4] ^ s[0] ^ v[4] ^ v[12]) >>> 0;
    h[5] = (h[5] ^ s[1] ^ v[5] ^ v[13]) >>> 0;
    h[6] = (h[6] ^ s[2] ^ v[6] ^ v[14]) >>> 0;
    h[7] = (h[7] ^ s[3] ^ v[7] ^ v[15]) >>> 0;
    
    console.log("h", h);
    
  }
  
  
  /*
  Produce the final hash value (big-endian):
  digest := hash := h0 append h1 append h2 append h3 append h4 append h5 append h6 append h7
  */

  output = h.map(function(uInt32) {
    var hex = uInt32.toString(16).toUpperCase(),
      len = hex.length;
    return len < BYTE_SIZE ? ZERO_BITS_4_BYTES.substr(len) + hex : hex;
  }).join("");
  
  return "function" === typeof next ? next(output) : output;
}

module.exports = sha3blake256;
