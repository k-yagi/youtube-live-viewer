// プロジェクトのルート(package.jsonがあるディレクトリ)での実行を想定してます

const fs         = require('fs');
const cron       = require('node-cron');
const { google } = require('googleapis');
const exec       = require('child_process').exec;
require('dotenv').config();

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_DATA_API_KEY
})

function clearContents() {
  const dir = './src/contents/'
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.map(file => {
      if (fs.statSync(dir+file).isFile()) {
        fs.unlinkSync(dir+file);
      }
    });
  });
}

async function run(channelId) {
  const res = await youtube.search.list({
    part: 'id,snippet',
    channelId: channelId,
    order: 'date',
    type: 'video'
  })
  return new Promise((resolve, reject) => {
    res.data.items.map((item, i) => {
      item['videoId'] = item.id.videoId
      delete item.id

      fs.writeFileSync(`./src/contents/youtube_search_result_${item.videoId}.json`, JSON.stringify(item));

      // 最後のデータ処理が完了したらresolveで返す
      if (res.data.items.length -1 == i) {
        resolve();
      }
    });
  });
}

const channelIds = process.env.CHANNEL_IDS.split(',');

// 更新の一連の処理
async function update_process() {
  clearContents();
  await Promise.all(channelIds.map(async (id) => {
    await run(id).catch(console.error);
  }));
  console.log("コンテンツが更新されました");

  console.log("ビルドを開始します");
  exec("npm run build", (err, stdout, stderr) => {
    console.log("ビルドが完了しました");
  });
}

let args = [];
process.argv.slice(2, 99).map((arg) => {
  args.push(arg);
})

// --now 実行時にコンテンツ更新を行う
if (args.indexOf('--now') >= 0) {
  update_process();
}

console.log("待機中");
cron.schedule('0 * * * *', () => {
  update_process();
});
