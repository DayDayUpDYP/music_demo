// api文件夹下 各个请求模块js 都统一在index.js再向外导出

import { recommendMusic } from "./Home";
export const recommendMusicAPI = recommendMusic // 请求推荐歌单的方法导出