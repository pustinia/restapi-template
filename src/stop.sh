# pm2 프로세스를 종료 한다.
#PM2_NAME=
#pm2 stop agi-ding-select-1
#pm2 stop agi-ding-select-2
ECO_CONFIG=./config/ecosystem.config.js
APP_NAME=restapi-template
pm2 stop ${ECO_CONFIG} --only ${APP_NAME}
