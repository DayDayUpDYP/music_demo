<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="6">
      <van-col span="8" v-for="(obj, i) in reList" :key="obj.id">
        <van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}{{ i }}</p>
      </van-col>
    </van-row>

    <p class="title">最新的音乐</p>
    <van-cell :title="obj.name" :label="obj.song.artists[0].name + ' - ' + obj.name" center v-for="obj in songList" :key="obj.id">
      <template #right-icon>
        <van-icon name="play-circle-o" size="0.7rem"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 目标：铺设推荐歌单
// 1 van-row 和 van-col来搭建外框布局
// 2 van-col 里内容 van-image 和p 搭建
// 3 调整间距和属性值
// 4 调用封装的api -推荐歌单的
// 5 拿到数据保存到 reList 循环使用

import { newMusicAPI, recommendMusicAPI} from "../../api";
export default {
  data() {
    return {
      reList: [], //推荐歌单的数据
      songList:[] //最新的数据
    };
  },
  async created() {
    // 获取推荐歌单数据
    const res = await recommendMusicAPI({
      limit: 6
    });
    this.reList = res.data.result;

    const NewSongRes = await newMusicAPI({
      limit:20
    });
 
    this.songList = NewSongRes.data.result;
  },
};
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
/* 给单元格 设置 底部小边框  美化 */
.van-cell{
  border-bottom: 1px solid lightgray;
}
</style>