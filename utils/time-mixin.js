export default {
	methods: {
		toZero (num) {
        return num > 9 ? num : `0${num}`
      },
      toTime(str, type) {
          const date = new Date(str)
          return `${date.getFullYear()}${type}${this.toZero(date.getMonth() + 1)}${type}${this.toZero(date.getDate())}`
      }
	}
}
