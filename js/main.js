let projectCode = '6TLMq';  // https://freshlive.tv/projects/***** ←ここの部分を入れる
let viewTime = 8000;        // 画面に表示している時間(1000=1秒)


let getProjectId = () => {
	$.ajax({
		url: apiUrl + 'projectCode=' + projectCode + '?returnMeta=true',
		type: 'GET',
		dataType: 'json',
		timeout: 1000,
		error: function () {
			drawScreen('', 'プロジェクトIDの取得に失敗しました。', 'log', 1);
		},
		success: function (json) {
			projectTitle = json.data.data.title;
			projectId = json.data.data.id;
			(projectId)?loopStart():drawScreen('', 'プロジェクトIDが見つかりませんでした。', 'log', 1);
		}
	});
}

let loopStart = () => {
	drawScreen('', '「' + projectTitle + '」巡回を開始しました。', 'log', 1);
	var projectCheckLoop = setInterval("checkProject()", 3000);
}

let checkProject = () => {
	$.ajax({
		url: apiUrl + 'history=true;projectId=' + projectId + ';query=%7B%22count%22:5%7D',
		type: 'GET',
		dataType: 'json',
		timeout: 1000,
		error: function () {
			console.log('APIの取得に失敗しました。');
		},
		success: function (json) {
			let newUserTime = new Date(json.data[0].cheeredAt);
			if (latestUserTime < newUserTime) {
				for (var i = 0; i < 5; i++) {
					var message = json.data[i].user.displayName + 'さんが、' + json.data[i].point + 'ptの支援をしてくれました！';
					drawScreen('', message, 'project', 1);
					let checkTime = new Date(json.data[i + 1].cheeredAt);
					if (latestUserTime >= checkTime) break;
				}
				latestUserTime = newUserTime;
			}
		}
	});
}

let drawScreen = (name, text, type, owner) => {
	if (type == 'project') {
		let p = $("#projectSE")[0].play();
		p.catch(function (e) {});
	}
	var id = idGenerator();
	html += '<span id="' + id + '" class="generator" style="display:none">' + text + '</span>';
	$('#drawArea').html(html);
	$('span#' + id).css('background-color', '#' + id);
	$('span#' + id).css('display', 'block');
	setTimeout(deleteScreen, viewTime, id);
}

let deleteScreen = (id) => {
	$('span#' + id).css('display', 'none');
}

let idGenerator = () => {
	var randomColor = "";
	for (var i = 0; i < 6; i++) {
		randomColor += (8 * Math.random() | 0).toString(16); // 濃いめの背景にしたいので16->8に変更
	}
	return randomColor;
}

let latestUserTime = new Date();
let html = '';
let projectTitle = '';
let projectId = 0;
let apiUrl = 'https://freshlive.tv/proxy/Projects;';

getProjectId();