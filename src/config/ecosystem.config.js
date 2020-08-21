// pm2 default settings
const defaultPm2Config = {
    // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
    name: 'restapi-template',
    // pm2로 실행될 파일 경로
    script: './bin/www',
    // pm2 instance
    instances: 3,
    watch: false,
    // pm2 mode cluster or fork
    exec_mode: 'cluster',
    // pm2 memory settings
    max_memory_restart: '150M',
    // 앱 실행 신호까지 기다릴 최대 시간. ms 단위.
    listen_timeout: 50000,
    // 새로운 프로세스 실행이 완료된 후 예전 프로세스를 교체하기까지 기다릴 시간
    kill_timeout: 5000,
    // 개발환경시 적용될 설정 지정
    env: {
        PORT: 3002,
        NODE_ENV: 'development',
    },
    // 배포환경시 적용될 설정 지정
    env_production: {
        PORT: 8080,
        NODE_ENV: 'production',
    },
};

// 개발로 설정 변경시 추가.
const developmentConfig = {
    name: 'restapi-template-dev',
    script: './src/bin/www',
    instances: 1,
};

module.exports = {
    apps: [
        Object.assign({}, defaultPm2Config, developmentConfig), // development 환경
        Object.assign({}, defaultPm2Config), // production 환경
    ],
};
