const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    candidate = event.partitionKey
      ? event.partitionKey
      : crypto
          .createHash("sha3-512")
          .update(JSON.stringify(event))
          .digest("hex");
  }

  candidate
    ? typeof candidate !== "string" && (candidate = JSON.stringify(candidate))
    : (candidate = TRIVIAL_PARTITION_KEY);

  candidate.length > MAX_PARTITION_KEY_LENGTH &&
    (candidate = crypto.createHash("sha3-512").update(candidate).digest("hex"));

  return candidate;
};
