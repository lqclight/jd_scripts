const APIKey = "TiebaCookie";
$ = new API(APIKey, true);
const CacheKey = `#${APIKey}`;

const main = async () => {
  try {
    const BDUSS = $.read(CacheKey);
    if (!BDUSS) {
      $.notify("贴吧签到", "", "BDUSS 读取失败，请先获取 BDUSS");
      $.done({});
      return;
    }
    
    // 获取 tbs
    const tbsUrl = 'http://tieba.baidu.com/dc/common/tbs';
    const tbsHeaders = {
      'Cookie': BDUSS
    };
    const tbsResp = await $.http.get({url: tbsUrl, headers: tbsHeaders});
    const tbs = JSON.parse(tbsResp.body).tbs;
    
    if (!tbs) {
      $.notify("贴吧签到", "", "获取 tbs 失败");
      $.done({});
      return;
    }
    
    // 签到
    const signUrl = 'http://c.tieba.baidu.com/c/c/forum/sign';
    const signHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const signBody = `BDUSS=${BDUSS}&tbs=${tbs}`;
    const signResp = await $.http.post({url: signUrl, headers: signHeaders, body: signBody});
    const signResult = JSON.parse(signResp.body);
    
    if (signResult.error_code === '0') {
      $.notify("贴吧签到", "", "签到成功");
    } else {
      $.notify("贴吧签到", "", `签到失败: ${signResult.error_msg}`);
    }
  } catch (error) {
    $.notify("贴吧签到", "", `出现错误: ${error.message}`);
  }
  
  $.done({});
};

main();
