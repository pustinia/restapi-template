deploy_path=deploy
npm run build
rm -r ${deploy_path}
mkdir ${deploy_path}
tar -cvf ./${deploy_path}/restapi-template.tar ./dist
