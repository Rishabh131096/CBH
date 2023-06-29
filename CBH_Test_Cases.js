const deterministicPartitionKey = require("./index");

const MAX_LENGTH_PARTITION_KEY = 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
const MAX_LENGTH_PARTITION_KEY_STRING =
  "8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888";

describe("FizzBuzz", () => {
  // 1. Empty Event
  test('Empty Event should result in "0"', () => {
    expect(deterministicPartitionKey("")).toStrictEqual("0");
  });

  // 2. Event without partitionKey - assume it returns createHash(JSON.stringify({cbh: 9}))
  test("Event without partitionKey should result in ", () => {
    expect(deterministicPartitionKey({ cbh: 9 })).toStrictEqual(
      "createHash(JSON.stringify({cbh: 9}))"
    );
  });

  // 3. Event with partitionKey as non-string
  test("Event without partitionKey should result in ", () => {
    expect(deterministicPartitionKey({ partitionKey: 9 })).toStrictEqual("9");
  });

  // 4. Event with partitionKey as non-string with length(partitionKey) >  MAX_PARTITION_KEY_LENGTH
  // - assume it returns createHash(8......)
  test("Event without partitionKey should result in createHash(8......)", () => {
    expect(
      deterministicPartitionKey({ partitionKey: MAX_LENGTH_PARTITION_KEY })
    ).toStrictEqual("createHash(8......)");
  });

  // 5. Event with partitionKey as string
  test("Event with partitionKey as string should result in the partitionKey", () => {
    expect(deterministicPartitionKey({ partitionKey: "256" })).toStrictEqual(
      "256"
    );
  });

  // 6. Event with partitionKey as string with length(partitionKey) >  MAX_PARTITION_KEY_LENGTH
  // - assume it returns createHash(8......)
  test("Event without partitionKey should result in createHash(8......)", () => {
    expect(
      deterministicPartitionKey({
        partitionKey: MAX_LENGTH_PARTITION_KEY_STRING,
      })
    ).toStrictEqual("createHash(8......)");
  });

});
