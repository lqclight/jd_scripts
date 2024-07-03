const $httpClient = require('http');
const $notification = require('notify');

// 填入你的 BDUSS
const BDUSS = "你的BDUSS";

// 获取贴吧列表
const getTbs = () => {
  const url = 'http://tieba.baidu.com/dc/common/tbs';
  const options = {
    headers: {
      'Cookie': `BDUSS=${BDUSS}`
    }
  };

  return new Promise((resolve, reject) => {
    $httpClient.get(url, options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const result = JSON.parse(body);
        if (result && result.tbs) {
          resolve(result.tbs);
        } else {
          reject(new Error('获取tbs失败'));
        }
      }
    });
  });
};

// 签到
const sign = (tbs) => {
  const url = 'http://c.tieba.baidu.com/c/c/forum/sign';
  const data = `BDUSS=${BDUSS}&tbs=${tbs}`;
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return new Promise((resolve, reject) => {
    $httpClient.post(url, options, data, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const result = JSON.parse(body);
        if (result && result.error_code === '0') {
          resolve('签到成功');
        } else {
          reject(new Error(result.error_msg));
        }
      }
    });
  });
};

// 主函数
const main = async () => {
  try {
    const tbs = await getTbs();
    const result = await sign(tbs);
    $notification.post('贴吧签到', '', result);
  } catch (error) {
    $notification.post('贴吧签到', '', `失败: ${error.message}`);
  }
};

main();
