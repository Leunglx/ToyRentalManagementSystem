/**
 * 请求错误信息处理-提取消息
 * @param {err} 错误信息
 */
export function handleErrMsg(err) {
  let msg = err.response.data.errors
  for (let key in msg) {
    console.log('错误：', msg[key])
  }
}