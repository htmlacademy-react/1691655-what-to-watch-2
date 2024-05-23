export function shuffleArray<T>(arr: T[]): T[] {
  let currentIndex = arr.length, tempValue, index;

  while (currentIndex) {
    index = Math.floor(Math.random() * currentIndex--);

    tempValue = arr[currentIndex];
    arr[currentIndex] = arr[index];
    arr[index] = tempValue;
  }

  return arr;
}
