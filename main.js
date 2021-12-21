// リアルの現在時刻取得用
// 表示されている時間取得用
// 経過時間計算用
// 合計時間
// 合計時間を表示用に変換
// 余り
// ストップウォッチ用
let stat_time;
let base_time;
let diff_time;
let post_time;
let aray_show_time = new Array(4);
let amari;
let stop_watch_time;

// ボタン切り替え用の変数作成 
let show_time = document.getElementById("disply_time");　// ストップウォッチの時間表示用
let stat_btn = document.getElementById("btn_start"); // スタートボタン用
let stop_btn = document.getElementById("btn_stop"); // ストップボタン用
let reset_btn = document.getElementById("btn_reset"); // リセットボタン用

// 表示されている時間取得して表示する
function display_post_time() {
    // 時間の差分を計算
    diff_time = Date.now() - stat_time;

    //　時間の合計(ミリ秒)
    post_time = base_time + diff_time;

    //　ミリ秒から表示用の値に変換
    // 割り算だけすると商が出ないのでMath.floorを使用
    // 時間
    aray_show_time[0] = Math.floor(post_time / (1000 * 60 * 60));

    // 分
    amari = post_time -  aray_show_time[0] * 1000 * 60 * 60;
    aray_show_time[1] = Math.floor(amari / (1000 * 60));
    
    // 秒
    amari = amari -  aray_show_time[1] * 1000 * 60;
    aray_show_time[2] = Math.floor(amari / 1000);

    // ミリ秒
    amari = amari -  aray_show_time[2] * 1000;
    aray_show_time[3] = Math.floor(amari / 100); //３桁表示の先頭の字だけ取得する

    // 連結
    stop_watch_time = aray_show_time.join(' : ');
    show_time.innerText = stop_watch_time;
}

// スタートボタンクリックした時:OFF
// ストップボタン：ON,リセットボタン:ON
function click_btn_start() {
    stat_btn.setAttribute("disabled",true);
    stop_btn.removeAttribute("disabled");
    reset_btn.removeAttribute("disabled");
    
    // 表示されている文字取得して数値変換したものをミリ秒に換算
    let temp_time = show_time.textContent;
    let aray_time = temp_time.split(':');
    let msec = Number(aray_time[3]) * 100; //本来は３桁だが先頭文字だけ表示されている
    let sec = Number(aray_time[2]) * 1000;
    let min = Number(aray_time[1]) * 1000 * 60;
    let hr = Number(aray_time[0]) * 1000 * 60 * 60;
    base_time = hr + min + sec + msec;     
    // alert(base_time);

    // 現在の時間 
    stat_time = Date.now();

    // 繰り返し表示
    Timer_ID = setInterval('display_post_time()',100);
}

// ストップボタンクリックした時:OFF
// スタートボタン：ON,リセットボタン:ON
// 現在の時間取得
function click_btn_stop() {
    stat_btn.removeAttribute("disabled");
    stop_btn.setAttribute("disabled",true);
    reset_btn.removeAttribute("disabled");

    // 繰り返しストップ
    clearInterval(Timer_ID);
}

// リセットボタンクリックした時
// stopwatchが動いてる時（スタート:OFF,ストップ:ON）=> リセット:ONのまま
// stopwatchが動いてない時（スタート:ON,ストップ:OFF）=> リセット:OFF
function click_btn_reset() {
    if (stat_btn.disabled === false){
        reset_btn.setAttribute("disabled",true);
    } 

    // stat_btn.removeAttribute("disabled");
    // stop_btn.setAttribute("disabled",true);
    // reset_btn.setAttribute("disabled",true);

    // base_time = 0にする
    base_time = 0;

    // リセットボタン押した時に基準時間を変える
    stat_time = Date.now();

    // 表示時間を0:0:0:0に変更する
    show_time.innerText =" 0 : 0 : 0 : 0 ";
}
