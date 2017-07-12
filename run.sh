#!/bin/bash

/usr/bin/mongod --quiet --dbpath db --fork --syslog
npm start
