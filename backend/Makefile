
# set tsc build dependency
files = $(shell find src -type f)

default: test

init:
	npm install

run: build/main.js
	node build/Main.js

test: build/main.js
	node build/Test.js

build/main.js: $(files)
	tsc

# you will probably want to run watchBuild and watchTest in two shells

# watch for file changes, automatically build
buildwatch:
	tsc --watch

# watch for build changes, automatically run test
testwatch:
	npx nodemon build/Test.js

clean: dbrm buildrm

buildrm:
	rm -rf build

dbmake:
	docker create --name pgdb \
		-e POSTGRES_USER=dateam \
		-e POSTGRES_PASSWORD=dateam \
		-e PGDATA=/var/lib/postgresql/data/pgdata \
		-v "$(PWD)/dbdata":/var/lib/postgresql/data \
		-v "$(PWD)/src/DBInit":/docker-entrypoint-initdb.d \
		-p 5432:5432 \
		postgres:alpine

dbrm:
	rm -rf dbdata
	docker rm pgdb

dmrun:
	docker start pgdb
	docker logs --follow pgdb

dbstop:
	docker stop pgdb
