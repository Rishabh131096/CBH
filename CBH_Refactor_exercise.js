const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  /*
   * Used Ternary Operator to make the code more readable as too many nested if-else cases were confusing
   * Used Logical && Operator to execute a statement only if the left Hand Side of the Operator is true
   * All the logic should remain unaffected
   */

  if (event) {
    // Used Ternary Operator to assign value to candidate
    candidate = event.partitionKey
      ? event.partitionKey
      : crypto
          .createHash("sha3-512")
          .update(JSON.stringify(event))
          .digest("hex");
    // replaced unnecessary variable 'data' as it makes the code more readable - Another method could be to assign it separately
  }

  // Used Ternary Operator and Logical &&
  // Another method could be to use Nested Ternary Operator but it was not more readable than before
  candidate
    ? typeof candidate !== "string" && (candidate = JSON.stringify(candidate))
    : (candidate = TRIVIAL_PARTITION_KEY);

  // Used Logical && to replace if statement
  // Can use Ternary Operator as well without loss of readability
  candidate.length > MAX_PARTITION_KEY_LENGTH &&
    (candidate = crypto.createHash("sha3-512").update(candidate).digest("hex"));

  return candidate;
};
