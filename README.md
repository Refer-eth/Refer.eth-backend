# Refer.eth backend
This project is developed for stanbol dev-connect eth hackathon.

## Running Unit Tests:
Before running tests, you should install test dependencies by "yarn install" command.
you should enter this command in the terminal at the main directory of project.

To run unit tests, you can enter "yarn test" command in the terminal at the main directory of project.

After that, you can see test coverage and test results.

## Running Program:
### locally:
Before running this program, you should have typescript, node and yarn on your PC.

First, you should build the project by enter "yarn build" command in the terminal at the main directory of project.

Then, you should install dependencies by enter "yarn install" command in the terminal at the main directory of project.

For the first time, you should run migrations by enter "yarn migrate" command in the terminal at the main directory of project.

Then, you can run this program by enter "yarn start" command in the terminal at the main directory of project.

### By Docker:
You can make docker image of the project by enter "docker build . -t refereum-backend:01" command in the terminal at the main directory of project.

After the image built, you can run it by this command: "docker run -i refereum-backend:01"
