// api文件夹下 各个请求模块js 都统一在index.js再向外导出

import { recommendMusic, newMusic} from "./Home";
import { hotSearch } from "./Search";
export const recommendMusicAPI = recommendMusic // 请求推荐歌单的方法导出
export const newMusicAPI = newMusic //请求最新的音乐的API

export const hotSearchAPI = hotSearch() // 搜索 --热搜关键词