
  /*
  break message into 512-bit chunks
  for each chunk
    create a 64-entry message schedule array w[0..63] of 32-bit words
    (The initial values in w[0..63] don't matter, so many implementations zero them here)
    copy chunk into first 16 words w[0..15] of the message schedule array
  */
  for (x=0; x<preProcessBlockWidth; x+=BLOCK_SIZE_BYTES) {
    //console.log("x", x);
    
    w = new Array(BLOCK_SIZE_BYTES);
    for (z=0; z<16; z++) {
      u = z * WORD_SIZE_BYTES;
      v = x + u;
      w[z] = buffer[v] * BYTE_MULT_32_1 + buffer[v+1] * BYTE_MULT_32_2 + buffer[v+2] * BYTE_MULT_32_3 + buffer[v+3];
      //console.log("z", z, "u", u, "v", v, "w["+z+"]", w[z]);
    }
   
    /*
    Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array:
      s0 := (w[i-15] rightrotate 7) xor (w[i-15] rightrotate 18) xor (w[i-15] rightshift 3)
      s1 := (w[i-2] rightrotate 17) xor (w[i-2] rightrotate 19) xor (w[i-2] rightshift 10)
      w[i] := w[i-16] + s0 + w[i-7] + s1
    */
    for (z=16; z<64; z++) {
      u = w[z-15];
      //s0 = (u >>> 7 | u << (32 - 7)) ^ (u >>> 18 | u << (32 - 18)) ^ (u >>> 3);
      s0 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ (u >>> 3);
      u = w[z-2];
      //s1 = (u >>> 17 | u << (32 - 17)) ^ (u >>> 19 | u << (32 - 19)) ^ (u >>> 10);
      s1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ (u >>> 10);
      w[z] = (w[z-16] + s0 + w[z-7] + s1) >>> 0;
    }
    
    //console.log("w int32 x 64 block\n");
    //blockOut(w);
    
    /*
    Initialize working variables to current hash value:
    a := h0
    b := h1
    c := h2
    d := h3
    e := h4
    f := h5
    g := h6
    h := h7
    */
    a = h0;
    b = h1;
    c = h2;
    d = h3;
    e = h4;
    f = h5;
    g = h6;
    h = h7;
    
    /*
    Compression function main loop:
    for i from 0 to 63
    */
    for (i=0; i<64; i++) {
      /*
      S1 := (e rightrotate 6) xor (e rightrotate 11) xor (e rightrotate 25)
      */
      //s1 = (e >>> 6 | e << (32 - 6)) ^ (e >>> 11 | e << (32 - 11)) ^ (e >>> 25 | e << (32 - 25));
      s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
      /*
      ch := (e and f) xor ((not e) and g)
      */
      ch = (e & f) ^ ((~e) & g);
      /*
      temp1 := h + S1 + ch + k[i] + w[i]
      */
      temp1 = (h + s1 + ch + k[i] + w[i]) >>> 0;
      /*
      S0 := (a rightrotate 2) xor (a rightrotate 13) xor (a rightrotate 22)
      */
      //s0 = (a >>> 2 | a << (32 - 2)) ^ (a >>> 13 | a << (32 - 13)) ^ (a >>> 22 | a << (32 - 22));
      s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
      /*
      maj := (a and b) xor (a and c) xor (b and c)
      */
      maj = (a & b) ^ (a & c) ^ (b & c);
      /*
      temp2 := S0 + maj
      */
      temp2 = (s0 + maj) >>> 0;
      /*
      h := g
      g := f
      f := e
      e := d + temp1
      d := c
      c := b
      b := a
      a := temp1 + temp2
      */
      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }
    /*
    Add the compressed chunk to the current hash value:
    h0 := h0 + a
    h1 := h1 + b
    h2 := h2 + c
    h3 := h3 + d
    h4 := h4 + e
    h5 := h5 + f
    h6 := h6 + g
    h7 := h7 + h
    */
    h0 = (h0 + a) >>> 0;
    h1 = (h1 + b) >>> 0;
    h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0;
    h5 = (h5 + f) >>> 0;
    h6 = (h6 + g) >>> 0;
    h7 = (h7 + h) >>> 0;
  }