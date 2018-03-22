const superagent = require('superagent')
require('superagent-charset')(superagent)
const cheerio = require('cheerio');
const reptileUrl = "http://zhjw.dlnu.edu.cn/loginAction.do";
const reptileUrl1 = "http://zhjw.dlnu.edu.cn";
const xkAction = "http://zhjw.dlnu.edu.cn/xkAction.do"

let HTML;
async function getData() {
    let getcookie = await superagent.post(reptileUrl)
        .send({
            ldap: "auth",
            mm: "", //密码
            zjh: "" //学号
        })
        .set('Accept', 'text/html')
        .set('Referer', 'http://zhjw.dlnu.edu.cn/')
        .set('Content-Type', 'application/x-www-form-urlencoded')

    cookie = getcookie.headers["set-cookie"];
    console.log(cookie)
    let getKeBiao = await superagent.get(xkAction).query({
            actionType: 17
        }).set('Accept', 'text/html')
        .set('Cookie', cookie)
        .set('Content-Type', 'application/x-www-form-urlencoded;charset=GBK')
        .set('Accept-Language', 'en-US,en;q=0.5')
        .charset('gbk')

    let $ = cheerio.load(getKeBiao.text);
    console.log(getKeBiao.text)
    return $.html()

}
exports = module.exports = getData