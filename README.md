# Dev setup

- git https://github.com/kenguru33/rs-position-tracker.git
- cd rs-position-tracker
- npm install
- cp .env-example .env
Edit .env according to your needs. At a minimum change the DB_URI to point to your mongo database.

-- Note: on Windows you need to build-tools to be able to install node-gyp first
- npm install --global --production windows-build-tools

