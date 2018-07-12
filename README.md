# FRESH LIVEプロジェクト速報ビュワー v1.0

### これは何か
FRESH LIVEで自分のプロジェクトに誰かが支援してくれた時に、放送画面に速報を出すことができる

### 設定方法
js/main.jsをひらく
1行目のprojectCodeを自分のプロジェクトのものに変更する。
通知音を変更したかったらaudio/se1.mp3ファイルを差し替える（音ならなくていいなら削除）

### 使い方(Xsplitを使用する場合)
表示したいシーンに「Webpage」を追加し、「参照」からindex.htmlを選ぶだけ。
    
### 使い方(OBSを使用する場合)
表示したいシーンに「BrowserSource」を追加し、「LocalFile」にチェック、「参照」からindex.htmlを選ぶ。
WidthとHeightはキャンバスサイズと同じ数字がおすすめ。そのほかは初期設定のままで。
多分このままだと「プロジェクトIDの取得に失敗しました」と表示されるので、一度OBSを終了。
OBSのショートカットを右クリック。「リンク先」のところに
`*****\obs-studio\bin\64bit\obs64.exe`
こんな感じの事が書いてあると思うので、後ろに「 --disable-web-security」を追加する。
`*****\obs-studio\bin\64bit\obs64.exe --disable-web-security`
こんなふうになればOK。そのショートカットから起動したら多分動くはず。
    
### なぜ--disable-web-securityが必要か
OBSのBrowserSourceでローカルファイルを開くとクロスドメイン通信ができない(CORS)ので、
プロジェクトのAPIを叩けないため。xsplitだと普通に通信できる。 

### 問い合わせ
[Twitter](https://twitter.com/jintokai)までお願いします。

### その他
audioファイルは、[効果音ラボ](https://soundeffect-lab.info/)より使用させて頂きました。
[解説ブログ](https://tokaisodachi.com/archives/1795)
