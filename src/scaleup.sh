# pm2 로 프로세스를 scaleup
APP_NAME=restapi-template
pm2 scale ${APP_NAME} +1

