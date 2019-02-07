module.exports.alias = ["test"];
//コマンド内容
module.exports.run = (db, client, message) => {
  message.channel.send("テストです");
};
