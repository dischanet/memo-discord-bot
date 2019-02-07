const fs = require("fs");

const commands = {};

fs.readdir("files/commands/", (err, files) => {
    if (err) throw new Error(`コマンドの読み込みでエラーが発生しました\n${err}`);

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;

        const command = require(`./commands/${file}`);

        command.alias.forEach((name) => {
            if (commands[name]) {
                throw new Error(
                    `重複したコマンドがあります エイリアスを確認してください\n問題のコマンド:${name}`
                );
            }
            commands[name] = command;
        });
    });
});

module.exports = commands;

console.log("------------------------------------");
console.log("コマンドの読み込みが完了しました")
console.log("------------------------------------")
