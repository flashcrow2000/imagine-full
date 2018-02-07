#!/bin/bash

envsubst < "/usr/html/dist/assets/systemconfiguration.src.js" > "/usr/html/dist/assets/systemconfiguration.js"
envsubst < "/usr/html/dist-server/assets/systemconfiguration.src.js" > "/usr/html/dist-server/assets/systemconfiguration.js"

node server.js