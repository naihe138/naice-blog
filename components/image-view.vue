<template>
  <div class="preview"
    v-show="visible"
    :class="visible ? 'preview-visible' : 'preview-hidden'"
    ref="preview"
    @mousewheel="scroll">
    <div class="preview-image-mask">
      <div class="preview-image-container" :style="containerStyle">
        <div class="preview-image-wrapper-container"
          :style="{'transform': `scale(${imgStyle.scale}) translate(${imgStyle.translate.x}px, ${imgStyle.translate.y}px)`}"
          @mousedown="dragImage">
           <transition name="fade">
            <img v-if="currenImage" class="preview-image" :src="currenImage"/>
          </transition>
        </div>
      </div>
    </div>
    
    <div class="preview-hot-zone">
      <div class="preview-widgets-container-top preview-widgets-container-visible">
        <div class="preview-button-close" @click="close"></div>
      </div>
      <div class="preview-button-prev" @click="prev" v-if="showIndex > 0"></div>
      <div class="preview-button-next" @click="next" v-if="showIndex < images.length - 1"></div>
      <div class="preview-bottom-container">
        <div class="preview-page-number preview-page-number-visible">{{showIndex + 1}}/{{imagesArr.length}}</div>
        <div class="preview-widgets-button-container-bottom preview-widgets-button-container-visible">
          <span class="preview-scale-up-button"
            :class="imgStyle.scale >= scaleMax ? 'preview-disable-click' : ''"
            @click="toScaleMax"></span>
          <span class="preview-scale-down-button"
            :class="imgStyle.scale <= scaleMin ? 'preview-disable-click' : ''"
            @click="toScaleMin"></span>
          <span class="preview-real-screen-button" @click="realScreen"></span>
          <span class="preview-divide-line"></span>
          <span class="preview-download-button" @click="toDownload"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default() {
        return [];
      },
    },
    src: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      default() {
        return {};
      },
    },
    visible: {
      type: Boolean,
      default: false
    },
    size: {
      type: Object,
      default() {
        return {};
      },
    }
  },
  data () {
    return {
      currenImage: '',
      containerStyle: {
        transform: 'translate(0px, 0px) scale(0.5)',
        '--init-coord': 'translate(0px, 0px) scale(0.5)'
      },
      imgStyle: {
        scale: 1,
        translate: {
          x: 0,
          y: 0
        }
      },
      showIndex: 0,
      imagesArr: []
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    next() {
      if (this.showIndex < this.imagesArr.length - 1) {
        this.showIndex++;
        this.currenImage = '';
        
        this.$nextTick(() => {
          this.change(this.imagesArr[this.showIndex]);
        });
      }
    },
    prev() {
      if (this.showIndex > 0) {
        this.showIndex--;
        this.currenImage = '';
        this.$nextTick(() => {
          this.change(this.imagesArr[this.showIndex]);
        });
      }
    },
    change(data) {
      const { width, height, src } = data;
      const previewBounds = this.$refs.preview.getBoundingClientRect();
      const innerWidth = previewBounds.width;
      const innerHeight = previewBounds.height;
      const boxMaxWidth = innerWidth - 60;
      const boxMaxHeight = innerHeight - 60;
      
      let imsc_w = 1;
      let imsc_h = 1;

      if (width >= boxMaxWidth) {
        imsc_w = Number(parseFloat(boxMaxWidth / width).toFixed(3))
      }
      if (height >= boxMaxHeight) {
        imsc_h = Number(parseFloat(boxMaxHeight / height).toFixed(3))
      }
      const minScale = Math.min(imsc_w, imsc_h);
      this.imgStyle.scale = minScale;
      this.imgStyle.translate.x = 0;
      this.imgStyle.translate.y = 0;
      this.currenImage = src;
      this.scaleMin = minScale > 0.5 ? 0.5 : 0.1;
    },
    scroll(e) {
      if (!this.scheduledAnimationFrame) {
        this.scheduledAnimationFrame = true
        requestAnimationFrame(() => {
          const step = this.imgStyle.scale + (e.deltaY * 0.01);
          this.scheduledAnimationFrame = false
          this.toScaleOfStep(step)
        })
      }
      e.preventDefault();
    },
    dragImage(e) {
      const { width, height } = this.imagesArr[this.showIndex];
      const previewBounds = this.$refs.preview.getBoundingClientRect();
      const innerWidth = previewBounds.width;
      const innerHeight = previewBounds.height;
      this.overWidth = width * this.imgStyle.scale - innerWidth;
      this.overHeight = height * this.imgStyle.scale - innerHeight;
      if (this.overWidth > 0 || this.overHeight > 0) {
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.boxLeft = ((this.overWidth / 2) + 30) / this.imgStyle.scale;
        this.boxTop = ((this.overHeight / 2) + 30) / this.imgStyle.scale;
        this.boxRight = ((this.overHeight / 2) + 30) / this.imgStyle.scale;
        document.addEventListener('mousemove', this.imageMove);
        document.addEventListener('mouseup', this.imgageUp)
      }
      e.preventDefault()
    },
    imageMove (e) {
      if (!this.dragAnimationFrame) {
        this.dragAnimationFrame = true
        requestAnimationFrame(() => {
          this.dragAnimationFrame = false
          const { clientX, clientY } = e;
          let disx = clientX - this.startX;
          let disY = clientY - this.startY;

          let x = this.imgStyle.translate.x + disx * 0.5;
          let y = this.imgStyle.translate.y + disY * 0.5;

          if (x >= this.boxLeft) {
            x = this.boxLeft
          }
          if (y >= this.boxTop) {
            y = this.boxTop
          }
          if (x <= -this.boxLeft) {
            x = -this.boxLeft;
          }
          if (y <= -this.boxTop) {
            y = -this.boxTop
          }
          if (this.overWidth > 0) {
            this.imgStyle.translate.x = x;
          }

          if (this.overHeight > 0) {
            this.imgStyle.translate.y = y;
          }
          
          this.startX = clientX;
          this.startY = clientY;
          
        })
      }
      e.preventDefault()
    },
    imgageUp(e) {
      document.removeEventListener('mousemove', this.imageMove);
      document.removeEventListener('mouseup', this.imgageUp);
      e.preventDefault()
    },
    toScaleMax() {
      this.toScaleOfStep(this.imgStyle.scale + 0.2);
    },
    toScaleMin() {
      this.toScaleOfStep(this.imgStyle.scale - 0.2);
    },
    realScreen() {
      this.imgStyle.scale = 1;
      this.imgStyle.translate.x = 0;
      this.imgStyle.translate.y = 0;
    },
    toScaleOfStep(step) {
      if (step <= this.scaleMin) {
        step = this.scaleMin
      } else if (step >= this.scaleMax) {
        step = this.scaleMax
      }
      this.imgStyle.scale = step
    },
    toDownload() {
      const strArr = this.src.split('/');
      const a = document.createElement('a');
      console.log(this.src, strArr[strArr.length - 1]);
      a.download = strArr[strArr.length - 1];
      a.href = this.src;
      a.click();
    },
    loadImage(src) {
      return new Promise((resolved, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = function() {
          resolved({
            src,
            width: img.width,
            height: img.height
          })
        };
        img.onerror = reject;
      })
    },
    async imagesChanged() {
      let arr = [];
      for (let i = 0; i < this.images.length; i++) {
        try {
          const obj = await this.loadImage(this.images[i]);
          arr.push(obj)
        } catch(err) {
          console.log(err);
        }
      }
      this.imagesArr = arr
    },
  },
  watch: {
    visible (v) {
      if (v) {
        this.showIndex = this.imagesArr.findIndex(item => item.src === this.src);
        this.$nextTick(() => {
          this.change(this.imagesArr[this.showIndex]);
        })
      }
    },
    images () {
      this.imagesChanged();
    }
  },
  created () {
    this.scaleMax = 3;
    this.scaleMin = 0.5;
  },
  mounted() {
    document.body.appendChild(this.$el);
  }
};
</script>

<style scoped>
.preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 10001;
  font-family: PingFang SC, Microsoft YaHei, sans-serif;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.preview ::-webkit-scrollbar {
  display: none;
}
.preview-image-mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.preview-disable-click {
  opacity: 0.5;
  pointer-events: none;
}
.preview-image {
  background-color: #fff;
}
.preview-image-error,
.preview-image-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.preview-image-error {
  width: 100px;
  height: 20px;
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.4);
  text-align: center;
}
.preview-image-container {
  overflow: visible;
}
.preview-widgets-container-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  -webkit-backdrop-filter: blur(50px);
  backdrop-filter: blur(50px);
  background-color: rgba(0, 0, 0, 0.32);
  transition: 0.3s;
}
.preview-widgets-container-top:after {
  content: "";
  position: absolute;
  bottom: -64px;
  left: 0;
  right: 0;
  height: 64px;
  background: transparent;
}
.preview-hidden .preview-widgets-container-top,
.preview-hot-zone:not(:hover):not(.preview-force-hover)
  .preview-widgets-container-top {
  transform: translateY(-100%);
}
.preview-widgets-container-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  -webkit-backdrop-filter: blur(50px);
  backdrop-filter: blur(50px);
  background-color: rgba(0, 0, 0, 0.32);
  transition: 0.3s;
}
.preview-widgets-container-bottom:after {
  content: "";
  position: absolute;
  top: -64px;
  left: 0;
  right: 0;
  height: 64px;
  background: transparent;
}
.preview-hidden .preview-widgets-container-bottom,
.preview-hot-zone:not(:hover):not(.preview-force-hover)
  .preview-widgets-container-bottom {
  transform: translateY(100%);
}
.preview-button-close {
  position: absolute;
  top: 8px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.364 11.05L17.414 16l4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95 1.414-1.414 4.95 4.95 4.95-4.95 1.414 1.414z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-color: hsla(0, 0%, 60%, 0.64);
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  transition: 0.3s;
  cursor: pointer;
  z-index: 1;
}
.preview-button-close:hover {
  background-color: hsla(0, 0%, 60%, 0.8);
}
.preview-button-close:active {
  background-color: hsla(0, 0%, 100%, 0.021);
}
.preview-button-prev {
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
  width: 48px;
  height: 64px;
  border-radius: 4px;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='48' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.03 32l14.142 14.142 1.414-1.414L15.858 32l12.728-12.728-1.414-1.414L13.029 32z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-color: hsla(0, 0%, 60%, 0.64);
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  transition: 0.3s;
  cursor: pointer;
}
.preview-button-prev:hover {
  background-color: hsla(0, 0%, 60%, 0.8);
}
.preview-button-prev:active {
  background-color: hsla(0, 0%, 100%, 0.04);
}
.preview-button-prev:after {
  content: "";
  position: absolute;
  top: -128px;
  left: -24px;
  right: -28px;
  bottom: -128px;
  background: transparent;
}
.preview-hot-zone:not(:hover):not(.preview-force-hover)
  .preview-button-prev {
  opacity: 0;
}
.preview-button-next {
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  width: 48px;
  height: 64px;
  border-radius: 4px;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='48' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M34.97 32L20.829 46.142l-1.414-1.414L32.142 32 19.414 19.272l1.414-1.414L34.971 32z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-color: hsla(0, 0%, 60%, 0.64);
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  transition: 0.3s;
  cursor: pointer;
}
.preview-button-next:hover {
  background-color: hsla(0, 0%, 60%, 0.8);
}
.preview-button-next:active {
  background-color: hsla(0, 0%, 100%, 0.04);
}
.preview-button-next:after {
  content: "";
  position: absolute;
  top: -128px;
  left: -28px;
  right: -24px;
  bottom: -128px;
  background: transparent;
}
.preview-hot-zone:not(:hover):not(.preview-force-hover)
  .preview-button-next {
  opacity: 0;
}
.preview-bottom-container {
  left: 0;
  right: 0;
  justify-content: center;
  flex-direction: column;
}
.preview-bottom-container,
.preview-widgets-button-container-bottom {
  display: flex;
  align-items: center;
}
.preview-widgets-button-container-bottom {
  position: absolute;
  border-radius: 8px 8px 0 0;
  bottom: 0;
  backdrop-filter: blur(50px);
  background-color: rgba(0, 0, 0, 0.48);
  justify-content: space-evenly;
  transition: 0.5s;
}
.preview-widgets-button-container-bottom > * {
  margin: 8px 12px;
}
.preview-widgets-button-container-bottom :first-child {
  margin-left: 24px;
}
.preview-widgets-button-container-bottom :last-child {
  margin-right: 24px;
}
.preview-widgets-button-container-bottom:after {
  content: "";
  position: absolute;
  top: -88px;
  bottom: -88px;
  left: -150px;
  right: -150px;
  z-index: -1;
  background: transparent;
}
.preview-hidden .preview-widgets-button-container-bottom,
.preview-hot-zone:not(:hover):not(.preview-force-hover)
  .preview-widgets-button-container-bottom {
  transform: translateY(100%);
}
.preview-page-number {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 24px;
  padding: 0 15px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  border-radius: 20px;
  transition: 0.3s;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid hsla(0, 0%, 100%, 0.4);
}
.preview-hidden .preview-page-number,
.preview-hot-zone:not(:hover):not(.preview-force-hover)
  .preview-page-number {
  opacity: 0;
}
.preview-hot-zone.preview-force-hover {
  background: rgba(0, 0, 0, 0.1);
}

@keyframes preview-fade-out {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes preview-scale-in {
  to {
    transform: scale(1) translate(0);
  }
}

@keyframes preview-scale-out {
  0% {
    transform: scale(1) translate(0);
  }
  to {
    transform: scale(0);
  }
  to {
    transform: var(--init-coord);
  }
}

.preview,
.preview-image,
.preview-image-wrapper,
.preview-mask {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.preview-visible .preview-image-container {
  animation-duration: 0.3s;
  animation-name: preview-scale-in;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.2, 0.1, 0.2, 1);
}
.preview-hidden {
  animation-duration: 0.24s;
  animation-name: preview-fade-out;
  animation-timing-function: cubic-bezier(0.2, 0.1, 0.2, 1);
}
.preview-hidden .preview-image-container {
  animation-duration: 0.3s;
  animation-name: preview-scale-out;
  animation-timing-function: cubic-bezier(0.2, 0.1, 0.2, 1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.preview-scale-up-button {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none' fill-rule='evenodd' stroke='%23fff'%3E%3Ccircle stroke-width='2' cx='15' cy='15' r='8'/%3E%3Cg fill='%23979797'%3E%3Cpath d='M21.586 19.88l4.243 4.243-.707.707-4.243-4.243zM11.5 14.5h7v1h-7z'/%3E%3Cpath d='M14.5 11.5h1v7h-1z'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  transition: 0.3s;
}
.preview-scale-up-button:hover {
  background-color: hsla(0, 0%, 100%, 0.12);
}
.preview-scale-down-button {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none' fill-rule='evenodd' stroke='%23fff'%3E%3Ccircle stroke-width='2' cx='15' cy='15' r='8'/%3E%3Cpath d='M21.586 19.88l4.243 4.243-.707.707-4.243-4.243zM11.5 14.5h7v1h-7z' fill='%23979797'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  left: 100px;
  transition: 0.3s;
}
.preview-scale-down-button:hover {
  background-color: hsla(0, 0%, 100%, 0.12);
}
.preview-image-wrapper-container {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}
.preview-image-wrapper-container-scale {
  transition: transform 0.2s;
}

.preview-adapt-screen-button {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath d='M13 19v1.413L10.413 23H13v2H8a1 1 0 01-1-1v-5h2v2.585L11.586 19H13zm12 0v5a1 1 0 01-1 1h-5v-2h2.586L19 20.414V19h1.414L23 21.586V19h2zM13 7v2h-2.586L13 11.586V13h-1.414L9 10.414V13H7V8a1 1 0 011-1h5zm11 0a1 1 0 011 1v5h-2v-2.587L20.414 13H19v-1.415L21.585 9H19V7h5z' fill='%23fff'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  left: 100px;
  transition: 0.3s;
}
.preview-adapt-screen-button:hover {
  background-color: hsla(0, 0%, 100%, 0.12);
}
.preview-real-screen-button {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='32'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect stroke='%23fff' stroke-width='2' x='8' y='8' width='16' height='16' rx='1'/%3E%3Cg fill='%23fff'%3E%3Cg fill-rule='nonzero'%3E%3Cuse xlink:href='%23B'/%3E%3Cuse xlink:href='%23B' x='8.312' y='.005'/%3E%3C/g%3E%3Ccircle cx='16' cy='14' r='1'/%3E%3Ccircle cx='16' cy='18' r='1'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3Cpath id='B' d='M13.016 19.475v-7.492h-.86a4.378 4.378 0 01-.944.745c-.378.2-.724.357-1.06.44v1.133c.693-.2 1.27-.514 1.72-.944v6.118h1.144z'/%3E%3C/defs%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  left: 100px;
  transition: 0.3s;
}
.preview-real-screen-button:hover {
  background-color: hsla(0, 0%, 100%, 0.12);
}
.preview-divide-line {
  width: 1px;
  height: 16px;
  opacity: 0.5;
  background-color: #fff;
}
.preview-download-button {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='%23fff'%3E%3Cpath d='M15 7h2v11h-2z'/%3E%3Cpath d='M18.832 14.3l1.414 1.414-4.243 4.243-4.243-4.243 1.414-1.414 2.828 2.828 2.83-2.828zM24 24H8a1 1 0 01-1-1v-5h2v4h14v-4h2v5a1 1 0 01-1 1z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  left: 100px;
  transition: 0.3s;
}
.preview-download-button:hover {
  background-color: hsla(0, 0%, 100%, 0.12);
}
</style>
