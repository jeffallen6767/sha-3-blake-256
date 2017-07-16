var fs = require('fs'),
  utf8 = require('utf8'),
  sha3blake256 = require("./index"),
  tester = require("testing"),
  data = {
    "sha3blake256": [
    {
      "input": "The quick brown fox jumps over the lazy dog",
      "salt": null,
      "output": "7576698EE9CAD30173080678E5965916ADBB11CB5245D386BF1FFDA1CB26C9D7"
    },
      /*
      ["abc", "BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD"],
      ["abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", "248D6A61D20638B8E5C026930C3E6039A33CE45964FF2167F6ECEDD419DB06C1"]
      */
    ]
  },
  tests = {
    "sync test sha3blake256()": function(test) {
      data.sha3blake256.forEach(function(obj) {
        var testData = {
          "input": obj.input,
          "salt": obj.salt
        };
        test.startTime();
        var result = sha3blake256(testData);
        test.endTime();
        test.assert.identical(result, obj.output);
      });
      test.done();
    },
    /*
    "async test sha3blake256()": function(test) {
      data.sha3blake256.forEach(function(pair) {
        test.startTime();
        sha3blake256(pair[0], function(result) {
          test.endTime();
          test.assert.identical(result, pair[1]);
        });
      });
      test.done();
    }
    */
  };

tester.run(tests);
