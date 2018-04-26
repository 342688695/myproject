<template>
<div>
 <Ctitle title="分享" :have-back='haveBack' @back="clickBack" word="发布" :haveWord='haveWord' @right='clickRight'></Ctitle>
 <div class="share-content">
   <div class="content-wrapper">
     <div><textarea placeholder="留下孩子的足迹吧~" class="share-text" v-model="shareText"></textarea></div>
     <div class="update-photo" ref="updateImg"><span v-for="(src,index) in imgDataUrl" v-show="imgDataUrl?true:false" :key="index" class="add-wrapper"><img :src="src" alt="抱歉图片出错"  class="upload-img"><img src="../share/del-share.png" class="del-share" @click="delPhoto(index)"></span><img src="../share/addPhoto.png" class="add-photo" @click="clickAdd" v-show="imgDataUrl.length>=9?false:true"><input type="file" @change="getFile"  accept="image/png,image/gif,image/jpeg" v-show="false" ref="file"></div>
     <div class="share-where" @click="showMask">分享到<span class="share-type">{{this.where}}</span><i class="iconfont icon-return-copy"></i></div>
   </div>
   <div class="share-mask" v-show="this.haveMask" @click="hideMask">
     <div class="share-to-wrapper">
      <div class="share-to">分享到...</div>
      <div ref="shareWrapper"  class="warpper-div">
        <ul class="share-ul" ref="shareUl">
          <li class="share-li" v-for="(item, index) in this.shareTo" :key="index" @click="toWhere(item.title, item.id)">{{item.title}}</li>
        </ul>
      </div>
     </div>
   </div>
 </div>
 </div>
</template>
<script>
import BScroll from 'better-scroll'
import Ctitle from '../../base/title/title.vue'
import { getShareList, setshareContent } from '../../api/share.js'
import { mapGetters, mapActions } from 'vuex'
import { getLogin } from '../../api/login.js'
export default {
  data () {
    return {
      haveBack: true,
      haveWord: true,
      shareTo: [],
      haveMask: false,
      where: '',
      file: '',
      imgDataUrl: [],
      shareText: '',
      selectId: '',
      uploadUrl: []
    }
  },
  computed: {
    ...mapGetters(['baseData', 'userid', 'token', 'username', 'password'])
  },
  created () {
    getShareList(this.userid, this.token).then(res => {
      if (res.status === 'error' && res.returnCode === '10003') {
        getLogin(this.username, this.password).then(logres => {
          this.saveToken(logres.data.baseData.token)
        })
      }
      if (res.returnCode === '00000' && res.status === 'success') {
        this.shareTo = res.data
        this.shareTo.shift()
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.shareWrapper, {
          click: true
        })
      }
    })
  },
  methods: {
    clickBack () {
      this.$router.go(-1)
    },
    toWhere (title, id) {
      this.where = title
      this.selectId = id
      console.log(this.where, this.selectId)
      this.hideMask()
    },
    hideMask () {
      this.haveMask = false
    },
    showMask () {
      this.haveMask = true
    },
    getFile ($event) {
      this.file = $event.target.files[0]
      this.getBase64($event.target, url => {
        let realUrl = 'data:image/png;base64,' + url
        this.imgDataUrl.push(realUrl)
        this.uploadUrl.push(url)
      })
    },
    getBase64 (file, callback) {
      var maxWidth = 640
      if (file.files && file.files[0]) {
        var thisFile = file.files[0]
        if (thisFile.size > 2019200) {
          alert('图片不能超过2M')
          return
        }
        var reader = new FileReader()
        reader.onload = function (event) {
          var imgUrl = event.target.result
          var img = new Image()
          img.onload = function () {
            var canvasId = 'canvasBase64Imgid'
            var canvas = document.getElementById(canvasId)
            if (canvas != null) {
              document.body.removeChild(canvas)
            }
            canvas = document.createElement('canvas')
            canvas.innerHTML = 'New Canvas'
            canvas.setAttribute('id', canvasId)
            canvas.style.display = 'none'
            document.body.appendChild(canvas)
            canvas.width = this.width
            canvas.height = this.height
            var imageWidth = this.width
            var imageHeight = this.height
            if (this.width > maxWidth) {
              imageWidth = maxWidth
              imageHeight = this.height * maxWidth / this.width
              canvas.width = imageWidth
              canvas.height = imageHeight
            }
            var context = canvas.getContext('2d')
            context.clearRect(0, 0, imageWidth, imageHeight)
            context.drawImage(this, 0, 0, imageWidth, imageHeight)
            var base64 = canvas.toDataURL('image/png', 1)
            var imgbase = base64.substr(22)
            callback(imgbase)
          }
          img.src = imgUrl
        }
        reader.readAsDataURL(file.files[0])
      }
    },
    clickAdd () {
      this.$refs.file.click()
    },
    delPhoto (index) {
      this.imgDataUrl.splice(index, 1)
    },
    clickRight () {
      setshareContent(this.userid, this.token, this.shareText, this.selectId, this.uploadUrl).then((res) => {
        console.log(this.uploadUrl)
        console.log(res)
        if (res.returnCode === '00000' && res.status === 'success') {
          alert('发布成功')
          this.$router.push('/target/hotKey')
        } else if (res.returnCode === '100010' && res.status === 'error') {
          alert('发布失败，内容为空')
        } else {
          alert('请选择分享类型')
        }
      })
    },
    ...mapActions(['saveToken'])
  },
  components: {
    Ctitle
  }
}
</script>
<style lang='less' scoped>
@import '../../common/less/z.less';
@import '../../common/less/variables';
.share-content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 45px;
  left: 0;
  background: @shareBg;
  .content-wrapper {
    background: @white;
    margin-top: 10px;
    .share-text {
      box-sizing: border-box;
      font-size: 16px;
      padding: 10px;
      text-indent: 2em;
      width: 100%;
      height: 120px;
      display: block;
    }
    .update-photo {
      padding-left: 10px;
      .upload-img{
        width: 76px;
        height: 76px;
        display: inline-block;
        margin-right: 15px;
        margin-bottom: 10px;
      }
      .add-wrapper{
        display: inline-block;
        position: relative;
        .del-share{
          width: 20px;
          height: 20px;
          padding: 5px;
          position: absolute;
          top: -10px;
          right: -2px;
        }
      }
      .add-photo {
        width: 76px;
        height: 76px;
        display: inline-block;
        margin-bottom: 10px;
      }
    }
    .share-where {
      .clearfix();
      padding: 0 12px;
      height: 50px;
      line-height: 50px;
      border-top: 1px solid @share-where;
      border-bottom: 1px solid @share-where;
      font-size: 14px;
      .share-type {
        font-size: 16px;
        margin-left: 15px;
      }
      .icon-return-copy {
        .fr();
        font-size: 25px;
      }
    }
  }
  .share-mask {
    position: fixed;
    top: 45px;
    bottom: 0;
    width: 100%;
    background: rgba(204, 204, 204, 0.8);
    .share-to-wrapper {
      width: 100%;
      min-height: 330px;
      position: fixed;
      left: 0;
      bottom: 0;
      background: @white;
      .share-to {
        line-height: 30px;
        height: 30px;
        padding-left: 15px;
        font-size: 14px;
        font-weight: 700;
        color: @balck;
        background: @share-title;
      }
      .warpper-div {
        height: 330px;
        overflow: hidden;
        .share-ul {
          margin-left: 15px;
          .share-li {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid @share-devider;
            font-size: 16px;
          }
        }
      }
    }
  }
}
textarea::-webkit-input-placeholder {
  color: @placeHolder;
}
textarea::-moz-placeholder {
  color: @placeHolder;
}
textarea:-moz-placeholder {
  color: @placeHolder;
}
textarea:-ms-input-placeholder {
  color: @placeHolder;
}
</style>

