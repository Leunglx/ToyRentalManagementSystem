/**
 * 请求错误信息处理-提取消息
 * @param {err} 错误信息
 */
export function handleMuiltiErrMsg(err) {
  let msg = err.response.data.errors
  for (let key in msg) {
    console.log('错误：', msg[key])
    showMessage(msg[key], 'error')
  }
}

/** 
 * 弹出消息提示框
 * @param {message} 消息内容
 * @param {type} 消息提示框类型
 * @param {duration} 消息框显示持续时间
 * @param {showClose} 是否显示删除按钮
 */
export function showMessage(message, type, duration, showClose) {
  if (message && type) {
    ElMessage({
      message,
      type: type || 'info',
      duration: duration || 2500,
      showClose,
    })
  } else {
    console.warn('showMessage工具函数参数不足！')
  }
}