# pm2 로 프로세스를 시작한다.
# --name 은 pm2 에서 보이는 App name
# --i 5 는 cluster 5개 설정, 하나의 port 에서 round-robin
# --max-memory-restart 50M 는 재시작이 필요한 최대 메모리
# -- 4696 에 넘기는 argument, 현재는 port number
#EXEC_FILE_NAME=restapi-template
#PM2_NAME=restapi-template
#HOW_MANY=3
#pm2 start ${EXEC_FILE_NAME} --name "${PM2_NAME}-1" -i 3  --max-memory-restart 80M -- 4696
#pm2 start ${EXEC_FILE_NAME} --name "${PM2_NAME}-2" -i 3  --max-memory-restart 80M -- 4697

ECO_CONFIG=./config/ecosystem.config.js
APP_NAME=restapi-template

# delete all pm2 process
pm2 delete ${APP_NAME}
# start again.
pm2 start ${ECO_CONFIG} --only ${APP_NAME} --env production


