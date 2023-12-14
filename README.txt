

Installation Steps:

1) Install nvm and install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 14
2) Fill out details for the .env file - tradebid s3 key credentials are in zoho
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=historycheck
PDF_DIRECTORY_PATH=/var/app/current/sweep/api/history-check/
3) npm install
4) run the script , node upload.js
