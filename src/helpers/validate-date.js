const { DateTime } = require("luxon");
function isISODate(value) {
  const dt = DateTime.fromISO(value);
  if (dt.invalidExplanation) {
    throw new Error(dt.invalidExplanation);
  }
  console.log(dt.toString());
  return true;
}

module.exports = { isISODate };
