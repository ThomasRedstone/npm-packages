import test from "ava";
const JWE = require("./dist/cjs/jwe");

const key = require("crypto").randomBytes(64);

test("JWE Basic features ", t =>
  new Promise(async resolve => {
    t.timeout(5000);
    t.plan(5);

    const payload = {
      my: {
        user: "data"
      },
      role: "admin"
    };
    const signed = await JWE.sign(payload, key, { expiresIn: 2 });
    t.pass("Signing token was passed");

    const verify = await JWE.verify(signed, key);

    t.deepEqual(verify.payload, payload, "Verify token was not passed");

    t.throwsAsync(
      JWE.verify("a" + signed, key),
      "Validation error",
      "Verify invalid token is passed and this mean this does not work properly"
    );

    const decode = await JWE.decode(signed, key);
    t.deepEqual(decode.payload, payload, "Decode token was not passed");

    setTimeout(async () => {
      await t.throwsAsync(
        JWE.verify(signed, key),
        "Token expired",
        "JWE Expiration does not work properly"
      );
      resolve();
    }, 3000);
  }));
