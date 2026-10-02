const range = "bytes=0-100";
const match = range.match(/bytes=(\d*)-(\d*)/);
if (match) {
  const start = match[1] ? parseInt(match[1], 10) : undefined;
  const end = match[2] ? parseInt(match[2], 10) : undefined;
  let rangeConfig = {};
  if (start !== undefined && end !== undefined) {
    rangeConfig = { range: { offset: start, length: end - start + 1 } };
  } else if (start !== undefined) {
    rangeConfig = { range: { offset: start } };
  } else if (end !== undefined) {
    rangeConfig = { range: { suffix: end } };
  }
  console.log(rangeConfig);
}
