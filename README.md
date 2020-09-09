### RestAPI Template

-   fast and easily to create Restapi Server for production
-   include in express, pm2, babel, morgan, winston, ws ....

About folders

```
src - javascript source for developing
	bin - express www file
	config - configuration files
	public - http web contents
	routes - some of api logics
	system - setting log, accesslog, config, websocket
	database - logic of database
dist - babel changing node.js source for deployment(ES6)
deploy - .tgz file for deploy to server.
```

About npm scripts

```
"bundle": "rimraf dist/ && babel src --out-dir dist/ --ignore deploy.sh,logs,test --copy-files",
"copy": "cp package.json dist/ && cp README.md dist/",
"build": "npm run bundle && npm run copy",
"devstart": "npm run build && cd dist && pm2 start ./config/ecosystem.config.js --only restapi-template-dev --env development",
"prodstart": "npm run build && cd dist && pm2 start ./config/ecosystem.config.js --only restapi-template --env production",
"clean": "rimraf deploy && mkdir deploy",
"pack": "cd dist && npm pack",
"deploy": "npm run clean && npm run pack && mv ./dist/*.tgz ./deploy/",
"watch:devstart": "watch 'npm run devstart' src --wait=10",
"watch:prodstart": "watch 'npm run prodstart' src --wait=10"
```

About configurations

```
./config/config.json
	-> about log, database and any custom settings
./config/ecosystem.config.js
	-> about pm2 config, development or production mode settings.
```

About shell scripts

```
start.sh         // when staring in production mode
stop.sh          // when stopping in production mode
scaleup.sh       // when sacle up in production mode
install.sh       // installing npm packages
```

About database

```
[oracle]

    
[mysql]

```

### git flow 전략

https://gmlwjd9405.github.io/2018/05/11/types-of-git-branch.html // 여기 설명이 잘되어 있네

```
master branch
	배포 이력만을 관리하는 브랜치, 배포 상태만을 관리 , tag 0.1 부터 시작된다.

develop branch
	다음 출시 버전을 개발하는 브랜치, 'master branch'에 병합하기 위한 브랜치

feature branch
	새로운 기능을 개발하는 브랜치, 개발이 끝나면 develop 브랜치에 병합하기 위한 브랜치
	보통은 feature/기능 으로 작명한다.
	--no-ff 옵션
		새로운 커밋 객체를 만들어 ‘develop’ 브랜치에 merge 한다.
	// 신규 브랜치 생성
	$git checkout -b feature/login develop

	// feature 에서 작업이 끝나면 아래를 진행해 본다.
	$git checkout develop
	// develop 브랜치에다가 feature를 머지 한다.
	$git merge --no-ff feature/login
	// feature 브랜치 삭제, 결국 github에는 develop만 올라갈듯 ?
	$git branch -d feature/login
	// develop 을 올린다.
	$git push origin develop

release branch
	이번 출시 버전을 준비하는 브랜치, develop 버전에서 배포할수 있는 기능들이 모아지거나,
	특정 배포일 일정이 잡히면 develop 버전에서 따서 진행한다.
	// 릴리즈 버전을 develop에서 딴다.
	$ git checkout -b release-1.2 develop

hotfix branch
	출시버전(master)에서 발생한 버그를 수정하는 브랜치, master에서 분기하여 수정하며
	master에 머지하고, develop에도 머지한다.
	1.2 -> 1.2.1 로 tag를 변경한다.

git에서 tag는 ? - 소스버전을 관리하는 history용도

git 에 tag 를 추가하는 방법 ?
> tag조회
	git tag
> 만약 원하는 태그명을 조건으로 검색하고자 한다면?
	git tag -l v1.1.*
> tag 붙이기
	Lightweight 태그는 git tag [Tag Name]으로 붙일 수 있습니다
	$git tag v1.0.2
	Annotated 태그는 -a 를 추가한다.
	$git tag -a v1.0.3 -m"Release version 1.0.3"
> tag를 만들고 원격저장소에 올리려면 ?
  $git push origin v1.0.3
> 모든 tag를 올리려면?
	$git push origin --tags
> tag 삭제하려면 ?
 	$git tag -d v1.0.0
> 이미 커밋된 소스에 tag를 추가 하려면 ?
  $ git tag {tag-name} {commit-id}
> commit 을 취소하는 경우 ?
  $ git reset HEAD^
```

신규 feature 생성

![image-20200828044600235](/Users/simonchoi/Library/Application Support/typora-user-images/image-20200828044600235.png)

tag 추가

![image-20200828045853426](/Users/simonchoi/Library/Application Support/typora-user-images/image-20200828045853426.png)
