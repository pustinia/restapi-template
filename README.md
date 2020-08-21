### RestAPI Template

- fast and easily to create Restapi Server for production
- include in express, pm2, babel, morgan, winston, ws ....



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
deploy - tar file for deploy any server
```

About npm scripts

```
npm run build -- make dist foler and files with babel
npm run devstart -- starting pm2, with development mode and config
npm run prodstart -- starting pm2, with production mode and config
npm run maketgz  -- make tar file to deploy folder for deploy
```



