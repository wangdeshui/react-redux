IF EXIST "C:%HOMEPATH%\AppData\Roaming\npm\pm2" (
	pm2 delete all
	pm2 start src/server.js
) ELSE (
	npm install pm2 -g
	pm2 delete all
	pm2 start src/server.js
)