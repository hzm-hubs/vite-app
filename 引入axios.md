# 安装插件 axios 后引入依赖 axios.ts
import axios from 'axios'

# 在axios.ts 中根据实际情况设置拦截等（如设置公参）后导出
........
export default axios

# 在main.ts中引入axios后 挂载到全局
app.config.globalProperties.axios = axios