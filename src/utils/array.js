function toArray(value) {
  if (Array.isArray(value)) {
    return value.slice();
  }

  if (value === undefined || value === null) {
    return [];
  }

  return [value];
}

function shuffle(items, randomFn = Math.random) {
  const source = Array.isArray(items) ? items.slice() : [];

  for (let index = source.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(randomFn() * (index + 1));
    const current = source[index];
    source[index] = source[swapIndex];
    source[swapIndex] = current;
  }

  return source;
}

function uniqueBy(items, resolver) {
  const source = Array.isArray(items) ? items : [];
  const getKey =
    typeof resolver === "function"
      ? resolver
      : (item) =>
          resolver && item && typeof item === "object" ? item[resolver] : item;
  const seen = new Set();

  return source.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export {
  shuffle,
  toArray,
  uniqueBy
};
