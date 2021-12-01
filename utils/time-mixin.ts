export default {
  methods: {
    toZero: (num: number): string => num > 9 ? `${num}` : `0${num}`,
    toTime(str: string, type: string): string {
      const date = new Date(str)
      return `${date.getFullYear()}${type}${this.toZero(date.getMonth() + 1)}${type}${this.toZero(date.getDate())}`
    }
  }
}
