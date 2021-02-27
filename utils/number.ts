// utils for manipulating with numbers
export class NumberUtils {
  // get the value in range of min and max (inclusive)
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  // get the random value in range of min and max (could be inclusive max)
  static randomBetween(min: number, max: number, inclusiveMax = true): number {
    const ceilMin = Math.ceil(min)
    const ceilMax = Math.floor(max)
    return (
      Math.floor(Math.random() * (ceilMax - ceilMin + (inclusiveMax ? 1 : 0))) +
      ceilMin
    )
  }
}
