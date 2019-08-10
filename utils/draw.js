var fftSize = 1024,
background_gradient_color_1 = '#000011',
background_gradient_color_2 = '#060D1F',
background_gradient_color_3 = '#02243F',

stars_color = '#465677',
stars_color_2 = '#B5BFD4',
stars_color_special = '#F451BA',
TOTAL_STARS = 1500,
STARS_BREAK_POINT = 140,

waveform_color = 'rgba(29, 36, 57, 0.05)',
waveform_color_2 = 'rgba(0,0,0,0)',
waveform_line_color = 'rgba(157, 242, 157, 0.11)',
waveform_line_color_2 = 'rgba(157, 242, 157, 0.8)',
waveform_tick = 0.05,
TOTAL_POINTS = fftSize / 2,

bubble_avg_color = 'rgba(29, 36, 57, 0.1)',
bubble_avg_color_2 = 'rgba(29, 36, 57, 0.05)',
bubble_avg_line_color = 'rgba(77, 218, 248, 1)',
bubble_avg_line_color_2 = 'rgba(77, 218, 248, 1)',
bubble_avg_tick = 0.001,
TOTAL_AVG_POINTS = 64,
AVG_BREAK_POINT = 100,

floor = Math.floor,
round = Math.round,
random = Math.random,
sin = Math.sin,
cos = Math.cos,
PI = Math.PI,
PI_TWO = PI * 2,
PI_HALF = PI / 180,
cx = 0,
cy = 0,
rotation = 0;

class Star {
  constructor (avg, w, h) {
    let xc, yc;
    this.x = Math.random() * w - cx
    this.y = Math.random() * h - cy
    this.z = this.max_depth = Math.max(w / h)
    this.radius = 0.2
    xc = this.x > 0 ? 1 : -1
    yc = this.y > 0 ? 1 : -1

    if (Math.abs(this.x) > Math.abs(this.y)) {
      this.dx = 1.0
      this.dy = Math.abs(this.y / this.x)
    } else {
      this.dx = Math.abs(this.x / this.y)
      this.dy = 1.0
    }

    this.dx *= xc
    this.dy *= yc
    this.dz = -0.1

    this.ddx = .001 * this.dx
    this.ddy = .001 * this.dy

    if (this.y > (cy / 2)) {
      this.color = stars_color_2
    } else {
      if (avg > AVG_BREAK_POINT + 10) {
        this.color = stars_color_2
      } else if (avg > STARS_BREAK_POINT) {
        this.color = stars_color_special
      } else {
        this.color = stars_color
      }
    }
    xc = yc = null
  }
}

class Point {
  constructor (config) {
    this.index = config.index
    this.angle = (this.index * 360) / TOTAL_POINTS
    this.updateDynamics(config.w, config.h)
    this.value = Math.random() * 256
    this.dx = this.x + this.value * sin(PI_HALF * this.angle)
    this.dy = this.y + this.value * cos(PI_HALF * this.angle)
  }
  updateDynamics (w, h) {
    this.radius = Math.abs(w, h) / 10
    this.x = cx + this.radius * sin(PI_HALF * this.angle)
    this.y = cy + this.radius * cos(PI_HALF * this.angle)
  }
}

class AvgPoint {
  constructor (config) {
    this.index = config.index
    this.angle = (this.index * 360) / TOTAL_AVG_POINTS
    this.updateDynamics(config.w, config.h)
    this.value = Math.random() * 256
    this.dx = this.x + this.value * sin(PI_HALF * this.angle)
    this.dy = this.y + this.value * cos(PI_HALF * this.angle)
  }
  updateDynamics (w, h) {
    this.radius = Math.abs(w, h) / 10
    this.x = cx + this.radius * sin(PI_HALF * this.angle)
    this.y = cy + this.radius * cos(PI_HALF * this.angle)
  }
}

class MusicDraw {
  constructor (ctx, analyser, w, h, cb) {
    this.analyser = analyser
    this.ctx = ctx
    this.stars = []
    this.points = []
    this.avg_points = []
    this.w = w
    this.h = h
    this.playing = false
    this.frequencyDataLength = analyser.frequencyBinCount;
    this.frequencyData = new Uint8Array(this.frequencyDataLength);
    this.timeData = new Uint8Array(this.frequencyDataLength);
    this.cb = cb
    this.init()
  }
  init () {
    this.resizeHandler()
    this.createStarField()
    this.createPoints()
    this.clearCanvas()
    this.drawStarField()
    this.drawAverageCircle()
    this.drawWaveform()
  }
  updatePlaying (b) {
    this.playing = b
  }
  createStarField () {
    let i = -1;
    while (++i < TOTAL_STARS) {
      this.stars.push(new Star(this.avg, this.w, this.h))
    }
    this.catchOriginStart = JSON.parse(JSON.stringify(this.stars))
    i = null
  }
  createPoints() {
    const { w, h } = this
    let i = -1;
    while (++i < TOTAL_POINTS) {
      this.points.push(new Point({
        index: i + 1,
        w, h
      }))
    }
    i = -1
    while (++i < TOTAL_AVG_POINTS) {
      this.avg_points.push(new AvgPoint({
        index: i + 1,
        w, h
      }))
    }
    i = null
  }
  getAvg(values) {
    let value = 0
    values.forEach(v => {
      value += v
    })
    return value / values.length
  }
  animate () {
    if (!this.playing) return
    const { analyser, getAvg, frequencyData, timeData } = this
    requestAnimationFrame(this.animate.bind(this))
    
    analyser.getByteFrequencyData(frequencyData)
    analyser.getByteTimeDomainData(timeData)
    this.avg = getAvg([].slice.call(frequencyData))
    this.clearCanvas()
    this.drawStarField()
    this.drawAverageCircle()
    this.drawWaveform()
    this.cb && this.cb()
  }
  clearCanvas () {
    const { ctx, w, h } = this
    let gradient = ctx.createLinearGradient(0, 0, 0, h)
    gradient.addColorStop(0, background_gradient_color_1)
    gradient.addColorStop(0.96, background_gradient_color_2)
    gradient.addColorStop(1, background_gradient_color_3)

    ctx.beginPath()
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
    ctx.fill()
    ctx.closePath()
    gradient = null
  }
  drawStarField() {
    let { stars, avg, ctx, catchOriginStart } = this
    let w = this.w
    let h = this.h
    let i, len, p, tick
    for (i = 0, len = stars.length; i < len; i++) {
      p = stars[i]
      p.x = p.x || catchOriginStart[i].x
      p.y = p.y || catchOriginStart[i].y
      tick = (avg > AVG_BREAK_POINT) ? (avg / 20) : (avg / 50)
      p.x += p.dx * tick
      p.y += p.dy * tick
      p.z += p.dz
      p.dx += p.ddx
      p.dy += p.ddy
      p.radius = 0.2 + ((p.max_depth - p.z) * .1)
      if (p.x < -cx || p.x > cx || p.y < -cy || p.y > cy) {
        stars[i] = new Star(avg, w, h)
        continue
      }
      ctx.beginPath()
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = p.color
      ctx.arc(p.x + cx, p.y + cy, p.radius, PI_TWO, false)
      ctx.fill()
      ctx.closePath()
    }
    i = len = p = tick = null
  }
  drawAverageCircle() {
    let { avg, ctx, avg_points } = this
    let i, len, p, value, xc, yc;
    if (avg > AVG_BREAK_POINT) {
      rotation += -bubble_avg_tick
      value = avg + random() * 10
      ctx.strokeStyle = bubble_avg_line_color_2
      ctx.fillStyle = bubble_avg_color_2
    } else {
      rotation += bubble_avg_tick
      value = avg
      ctx.strokeStyle = bubble_avg_line_color
      ctx.fillStyle = bubble_avg_color
    }
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.lineCap = "round"

    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rotation)
    ctx.translate(-cx, -cy)

    ctx.moveTo(avg_points[0].dx, avg_points[0].dy)

    for (i = 0, len = TOTAL_AVG_POINTS; i < len - 1; i++) {
      p = avg_points[i]
      p.dx = p.x + value * sin(PI_HALF * p.angle)
      p.dy = p.y + value * cos(PI_HALF * p.angle)
      xc = (p.dx + avg_points[i + 1].dx) / 2
      yc = (p.dy + avg_points[i + 1].dy) / 2
      ctx.quadraticCurveTo(p.dx, p.dy, xc, yc)
    }

    p = avg_points[i]
    p.dx = p.x + value * sin(PI_HALF * p.angle)
    p.dy = p.y + value * cos(PI_HALF * p.angle)
    xc = (p.dx + avg_points[0].dx) / 2
    yc = (p.dy + avg_points[0].dy) / 2

    ctx.quadraticCurveTo(p.dx, p.dy, xc, yc)
    ctx.quadraticCurveTo(xc, yc, avg_points[0].dx, avg_points[0].dy)

    ctx.stroke()
    ctx.fill()
    ctx.restore()
    ctx.closePath()
    i = len = p = value = xc = yc = null
  }
  drawWaveform() {
    let { avg, ctx, points, timeData } = this
    let i, len, p, value, xc, yc;

    if (avg > AVG_BREAK_POINT) {
      rotation += waveform_tick
      ctx.strokeStyle = waveform_line_color_2
      ctx.fillStyle = waveform_color_2
    } else {
      rotation += -waveform_tick
      ctx.strokeStyle = waveform_line_color
      ctx.fillStyle = waveform_color
    }

    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.lineCap = "round"

    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rotation)
    ctx.translate(-cx, -cy)

    ctx.moveTo(points[0].dx, points[0].dy)

    for (i = 0, len = TOTAL_POINTS; i < len - 1; i++) {
      p = points[i]
      value = timeData[i]
      p.dx = p.x + value * sin(PI_HALF * p.angle)
      p.dy = p.y + value * cos(PI_HALF * p.angle)
      xc = (p.dx + points[i + 1].dx) / 2
      yc = (p.dy + points[i + 1].dy) / 2

      ctx.quadraticCurveTo(p.dx, p.dy, xc, yc)
    }

    value = timeData[i]
    p = points[i]
    p.dx = p.x + value * sin(PI_HALF * p.angle)
    p.dy = p.y + value * cos(PI_HALF * p.angle)
    xc = (p.dx + points[0].dx) / 2
    yc = (p.dy + points[0].dy) / 2

    ctx.quadraticCurveTo(p.dx, p.dy, xc, yc)
    ctx.quadraticCurveTo(xc, yc, points[0].dx, points[0].dy)

    ctx.stroke()
    ctx.fill()
    ctx.restore()
    ctx.closePath()

    i = len = p = value = xc = yc = null
  }
  resizeHandler() {
    let { ctx, w, h, avg_points, points }  = this
    cx = w / 2
    cy = h / 2
    ctx.canvas.width = w
    ctx.canvas.height = h
    points.forEach(p => {
      p.updateDynamics()
    })
    avg_points.forEach(p => {
      p.updateDynamics()
    })
  }
}

export default MusicDraw