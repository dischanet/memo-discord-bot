module.exports = {
    env: { // 変数設定
        es6: true, // ECMAScript6 モードを有効化
        node: true, // Node.js モードを有効化
        browser: false //ブラウザ モードを無効化
    },
    parserOptions: { // パーサーの設定
        "sourceType": `module`,// ソースタイプをモジュールに設定
        "ecmaVersion": 2017
    },
    rules: { // ここからエラー内容一覧
        "no-var": 2, // var の使用を禁止（代わりに変数に変更を加えないなら const それ以外は let を使う）
        "eqeqeq": 1, // === または !== の使用を推奨（条件式の精度を向上させるため）
        "indent": [2, 2], // インデント数を2に固定
        "semi": 2,//セミコロンをつける
        "eol-last": 2, // ファイルの最後に改行する（OS の互換性のため）
        "quotes": [2, `single`], // クォートを '' に固定 
        "no-shadow": 2, // コールバック時に既に定義されている変数名を禁止
        "no-undefined": 2, // if なので undefined の使用を禁止（代わりに ! を使う）
        "no-undef": 2,//未定義の変数は利用しないこと
        "no-unused-vars": 1, // 未使用の変数を警告
        "no-use-before-define": 2,//定義される前に変数を使用しないこと
        "no-dupe-keys": 2, // オブジェクト 内で重複したキーの使用を禁止
        "no-dupe-args": 2, //function 内で重複して変数宣言を行わないこと
        "require-await": 1, // async を使用している場合、 await がなかったら警告
        "no-undef-init": 2, // 変数定義時に undefined の使用を禁止（代わりに何も入力しないようにする。例：let test;）
        "no-extra-semi": 1, //不要なセミコロンを記述しないこと
        "prefer-template": 2, // ${} の使用を強制
        "use-isnan": 2, //NaNチェックにはisNaN()を利用すること
    }
};
