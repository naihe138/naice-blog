<template>
	<div class="musicBox" ref="musicBox">
		<div class="oparations">
			<div class="lyricBox abs"  v-show="showLyric">
				<div class="topMask" @click="hideLyric"></div>
				<div class="bottomMask"  @click="hideLyric"></div>
				<div class="lyriList">
					<ul ref="lyriList">
						<li v-for="(item, index) in lyricArr" :key="index">{{item.text}}</li>
						<li v-if="lyricArr.length === 0">大侠，请点击播放加载歌词吧...</li>
					</ul>
				</div>
			</div>
			<div class="musicBtnBox abs" v-show="showBtns" @mouseenter="btnMousrenter" @mouseleave="btnMouseleave">
				<transition name="slide-fade">
					<div class="musicBtns" v-show="showAllBtn">
						<span class="btnList pbtn" @click="toList"><i class="iconfont">&#xe628;</i></span>
						<span class="btnLyric pbtn" @click="toLyric"><i class="iconfont">&#xe70f;</i></span>
						<span class="btnPlay pbtn" ref="play" @click="toPlay"><i class="iconfont">{{playing ? '&#xe618;' : '&#xe617;'}}</i></span>
						<span class="btnPrev pbtn" ref="prev" @click="toPrev"><i class="iconfont">&#xe619;</i></span>
						<span class="btnNext pbtn" ref="next" @click="toNext"><i class="iconfont">&#xe61a;</i></span>
					</div>
				</transition>
				<transition name="poster-fade">
					<img v-show="!showAllBtn" v-if="poster" :src="poster" />
				</transition>
			</div>
		</div>
		<canvas class="musicCanvas" ref="canvas" width="1000" height="800">您的浏览器不支持canvas标签</canvas>
		<audio ref="audio" :src="musicLink" crossOrigin="anonymous" style="display: none">您的浏览器不支持audio标签</audio>
		<transition name="list-fade">
			<div class="musicList" ref="musicListBox" v-show="showList">
				<ul ref="musicList">
					<li v-for="(item, index) in music" :key="item._id" @click="selectMusic(index)">{{item.title}}({{item.name}})</li>
				</ul>
				<div class="lyricScroll" v-show="showlyricScroll">
					<div class="lyricScrollBar" :class="isScrolling ? 'active' : ''" ref="lyricScrollBar"></div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import FooterMixin from '../utils/footer-mixin'
import { getMusic } from '../api'
import { formatLyric, findLine } from '../utils/music'
import MusicDraw from '../utils/draw'
export default {
	head: {
		title: 'naice | 音乐',
		meta: [
      { hid: 'description', name: 'description', content: 'naice | 音乐' }
    ]
	},
	layout: 'music-layout',
	data () {
		return {
			music: [],
			lyricArr: [],
			playing: false,
			musicLink: '',
			text1: '',
			text2: '',
			playIndex: 0,
			showLyric: false,
			poster: '',
			showAllBtn: false,
			showlyricScroll: false,
			lyricScrollY: 0,
			isScrolling: false,
			showList: false
		}
	},
	mixins: [FooterMixin],
	computed: {
		showBtns () {
			return !this.showLyric
		}
	},
	methods: {
		initDom () {
			const refs = this.$refs
			this.play = refs.play
			this.pause = refs.pause
			this.next = refs.next
			this.prev = refs.prev
			this.canvas = refs.canvas
			this.audio = refs.audio
			this.musicBox = refs.musicBox
			this.lyriList = refs.lyriList
			this.lyricScrollBar = refs.lyricScrollBar
			this.musicList = refs.musicList
			this.musicListBox = refs.musicListBox
			this.init()
			this.initCanvas()
			this.initLyricScroll()
		},
		init () {
			this.ctx = this.canvas.getContext('2d')
			this.audioCtx = new (window.AudioContext || window.webkitAudioContext)() // 创建音频上下文
			this.source = this.audioCtx.createMediaElementSource(this.audio) // 在音频上下文里创建源来关联myAudio
			this.analyser = this.audioCtx.createAnalyser() // 创建一个分析器，它可以用来显示音频时间和频率的数据。
			this.analyser.fftSize = 1024
			this.analyser.minDecibels = -100
			this.analyser.maxDecibels = -30
			this.analyser.smoothingTimeConstant = 0.8
			this.analyser.connect(this.audioCtx.destination) // 需要将分析器连接到audioContext.destination
			this.source.connect(this.analyser) // audioBufferSouceNode连接到analyser,analyser连接destination。此刻所有音频数据都会经过analyser，我们再从analyser中获取频谱的能量信息
		},
		initCanvas () {
			const {ctx, analyser, musicBox, canvas } = this
			let width = musicBox.offsetWidth
			let height = musicBox.offsetHeight
			canvas.width = width
			canvas.height = height
			canvas.style.width = width + 'px'
			canvas.style.height = height + 'px'
			this.musicDraw = new MusicDraw(ctx, analyser, width, height, this.getLineLyric)
			this.audio.onended = () => {
				this.toNext()
			};
			this.poster = this.music[0] ? this.music[0].poster : ''
		},
		toPlay () {
			if (this.playing) {
				this.toPause()
			} else if (!this.musicLink) {
				this.loadMusic()
			} else {
				this.audioCtx.resume().then(() => {
					this.audio.play()
					this.playing = true
					this.musicDraw.updatePlaying(this.playing)
					this.musicDraw.animate()
				})
			}
		},
		toPause () {
			this.audio.pause()
			this.playing = false
			this.musicDraw.updatePlaying(this.playing)
		},
		toNext () {
			this.playIndex += 1
			if (this.playIndex === this.music.length) {
				this.playIndex = 0
			}
			this.loadMusic()
		},
		toPrev () {
			this.playIndex -= 1
			if (this.playIndex <= 0) {
				this.playIndex = 0
			}
			this.loadMusic()
		},
		selectMusic (index) {
			this.playIndex = index
			this.loadMusic()
			this.showList = false
		},
		btnMousrenter () {
			this.showAllBtn = true
		},
		btnMouseleave () {
			this.showAllBtn = false
		},
		loadMusic () {
			let music = this.music[this.playIndex]
			if (this.musicLink === music.url) return
			this.toPause()
			this.musicLink = music.url
			this.poster = music.poster
			this.lyricArr = formatLyric(music.lyrics)
			this.audio.onloadedmetadata = () => {
				this.toPlay()
			}
		},
		toList () {
			this.showList = !this.showList
		},
		toLyric () {
			this.showLyric = true
		},
		hideLyric () {
			this.showLyric = false
		},
		getLineLyric () {
			const { audio, lyricArr, lyriList } = this
			let index = findLine(audio.currentTime, lyricArr)
			if (index > 0) {
				index -= 1
			}
			this.text2 = lyricArr[index].text
			if (this.text1 !== this.text2) {
				lyriList.style.transform = `translate3d(0, ${-index * 32}px,0)`
			}
			this.text1 = this.text2
		},
		initLyricScroll () {
			const { music, lyricScrollBar } = this
			this.ah = music.length * 41
			if (this.ah === 0) {
				this.showlyricScroll = false
			} else if ( this.ah > 400) {
				this.lyricScrollBarHeight = (400 * 400) / this.ah
				lyricScrollBar.style.height = this.lyricScrollBarHeight + 'px'
				this.showlyricScroll = true
				this.initLyricScrollEvernt()
			}
		},
		initLyricScrollEvernt () {
			const { lyricScrollBar, musicListBox } = this
			let starty = 0
			let disScroll = 400 - this.lyricScrollBarHeight
			let count = 0
			let y = 0
			const toScroll = () => {
				if (y <= 0) {
					y = 0
					count++
				} else if (y > disScroll) {
					y = disScroll
					count++
				} else {
					count = 0
				}
				if (count <= 2) {
					this.lyricScrollBar.style.transform = `translateY(${y}px)`
					this.musicList.style.transform = `translateY(${-(y / 400) * this.ah}px)`
				}
			}
			const mousemove = e => {
				let disy = e.clientY - starty
				y = this.lyricScrollY + disy
				this.isScrolling = true
				toScroll()
			}
			const mosueup = e => {
				this.lyricScrollY = y
				this.isScrolling = false
				document.removeEventListener('mousemove', mousemove)
				document.removeEventListener('mouseup', mosueup)
			}
			lyricScrollBar.addEventListener('mousedown', e => {
				starty = e.clientY
				this.isScrolling = false
				document.addEventListener('mousemove', mousemove)
				document.addEventListener('mouseup', mosueup)
			})
			musicListBox.addEventListener('mousewheel', e => {
				e.preventDefault()
				e.stopPropagation()
				y = this.lyricScrollY + e.deltaY
				toScroll()
				this.lyricScrollY = y
			})
		}
	},
	async mounted () {
		let list = await getMusic()
		this.music = list.result || []
		this.$nextTick(() => {
			this.initDom()
			this.footer()
		})
	},
	beforeDestroy () {
		this.ctx = null
		this.audioCtx = null
		this.source = null
		this.analyser = null
	}
}
</script>

<style scoped>
	.slide-fade-enter-active, .slide-fade-leave-active {
		transition: all .3s ease;
	}
	.slide-fade-enter {
		transform: translateX(-20px);
		opacity: 0;
	}
	.slide-fade-leave-to {
		transform: translateX(20px);
		opacity: 0;
	}
	.poster-fade-enter-active, .poster-fade-leave-active {
		transition: opacity .5s;
	}
	.poster-fade-enter, .poster-fade-leave-to {
		opacity: 0;
	}
	.list-fade-enter-active, .list-fade-leave-active {
		transition: all .3s ease;
	}
	.list-fade-enter, .list-fade-leave-to {
		transform: translateX(-400px);
		opacity: 0;
	}
	
	@keyframes myrotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
  .musicBox {
		width: 100%;
		height: 100%;
		position: relative;
		background: #000;
	}
	.oparations {
		width: 20vw;
		height: 20vw;
		background: transparent;
		left: 50%;
		top: 50%;
		position: absolute;
		transform: translate(-10vw, -10vw);
		z-index: 10;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 0 50px rgba(255, 255, 255, 0.3)
	}
	.oparations .abs{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
	.musicBtns {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 160px;
		height: 160px;
		margin: -80px 0 0 -80px;
		z-index: 1;
	}
	.musicBtnBox img {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		animation: myrotate 30s linear infinite;
	}
	.musicBtnBox .pbtn {
		position: absolute;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 1px solid #326b9f;
		text-align: center;
		line-height: 60px;
		cursor: pointer;
		z-index: 1;
	}
	.musicBtnBox .pbtn i {
		font-size: 20px;
		color: #326b9f;
	}
	.musicBtnBox .pbtn:hover {
		border-color: #2b9aff;
		box-shadow: 0px 0px 16px #2b9aff inset;
	}
	.musicBtnBox .pbtn:hover i {
		color: #2b9aff;
	}
	.musicBtnBox .btnList {
		left: 10px;
		top: 2px;
	}
	.musicBtnBox .btnLyric {
		right: 10px;
		top: 2px;
	}
	.musicBtnBox .btnPlay {
		left: 50%;
		top: 50%;
		margin-top: -30px;
		margin-left: -30px;
	}
	.musicBtnBox .btnNext {
		right: 10px;
		bottom: 2px;
	}
	.musicBtnBox .btnPrev {
		left: 10px;
		bottom: 2px;
	}
	.lyricBox {
		overflow: hidden;
		z-index: 1;
	}
	.lyricBox .topMask {
		width: 100%;
		height: 10vw;
		position: absolute;
		left: 0;
		top: 0;
		background: linear-gradient(0deg, rgba(3,6,24,0.1), rgba(3,6,24,1));
		z-index: 1;
	}
	.lyricBox .bottomMask {
		width: 100%;
		height: 10vw;
		position: absolute;
		left: 0;
		bottom: 0;
		background: linear-gradient(180deg, rgba(3,6,24, 0.1), rgba(3,6,24,1));
		z-index: 1;
	}
	.lyricBox .lyriList {
		text-align: center;
		position: absolute;
		left: 0;
		top: 50%;
		width: 100%;
		margin-top: -16px;
	}
	.lyricBox .lyriList ul{
		transition: 0.3s;
	}
	.lyricBox .lyriList li {
		color: #ffffff;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 32px;
		height: 32px;
		font-size: 14px;
	}
	.musicList {
		position: fixed;
		width: 200px;
		height: 400px;
		border: 1px solid #326b9f;
		border-left: 0;
		left: 0;
		top: 50%;
		margin-top: -250px;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: 4px;
	}
	.musicList li:hover {
		background: #ffffff;
	}
	.musicList li {
		line-height: 40px;
		color: #2b9aff;
		width: 100%;
		box-sizing: border-box;
		border-bottom: 1px dashed #1c6fbb;
		font-size: 12px;
		cursor: pointer;
		text-align: center;
		transition: 0.3s;
		padding: 0 8px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		user-select: none;
	}
	.lyricScroll {
		width: 10px;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
	}
	.lyricScroll .lyricScrollBar {
		width: 8px;
		height: 20px;
		position: absolute;
		left: 1px;
		top: 0;
		background: #006bcc;
		border-radius: 8px;
		cursor: pointer;
		opacity: 0.7;
	}
	.lyricScroll .lyricScrollBar:hover {
		opacity: 1;
	}
	.lyricScroll .lyricScrollBar.active {
		opacity: 1;
	}
</style>
