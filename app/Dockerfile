# We use alpine for a lightweight (less memory) image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy the files that declares the dependencies (in this case using yarn)
COPY package.json ./
COPY package-lock.json ./

# Install the dependencies
RUN npm install

# Copy all the files into the container to run the app
COPY . .
# Run command to start the process runing a shell command using node

RUN npm install sequelize-cli

ENTRYPOINT [ "./start.sh" ]

# CMD [ "npm", "run", "start" ]

# This is for documentation only, the port muyst be exposed manually or in compose definition.
EXPOSE 3000