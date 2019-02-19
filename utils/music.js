function formatTime(num) {
  var arr = num.substring(1, num.length).split(':')
  return (parseFloat(arr[0] * 60) + parseFloat(arr[1]))
}

export const formatLyric = str => {
  let arr = []
  if (str) {
    arr = str.split('[').reduce((current, v) => {
      let arr = v.trim().split(']')
      if (arr[1])  {
        current.push({time: formatTime(arr[0]), text: arr[1]})
      }
      return current
    }, [])
  }
  return arr
}

export const findLine = (time, arr) => {
  let len = arr.length - 1
  for (let i = 0; i < len; i++) {
    if (time <= arr[i].time) {
      return i
    }
  }
  return len
}
