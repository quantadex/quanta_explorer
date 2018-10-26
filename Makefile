build:
	NOPUSH=1 ./build-docker.sh

push:
	NOPUSH=0 ./build-docker.sh

up: build
	docker run -it -e PORT=5000 -p 5000:5000 --rm --name=quanta-explorer 691216021071.dkr.ecr.us-east-1.amazonaws.com/quanta-explorer:latest	

local-up:
	docker-compose up

