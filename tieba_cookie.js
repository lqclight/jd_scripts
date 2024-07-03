const $httpClient = require('http');
const $persistentStore = require('persistentStore');
const $notification = require('notify');

// 获取请求头中的 Cookie
const cookie = $request.headers['Cookie'];
const match = cookie.match(/BDUSS=([^;]+)/);

if (match) {
  const BDUSS = match[1];
  $persistentStore.write(BDUSS, 'BDUSS');
  $notification.post('贴吧签到', '', 'BDUSS 获取成功');
} else {
  $notification.post('贴吧签到', '', '获取 BDUSS 失败');
}

$done({});
