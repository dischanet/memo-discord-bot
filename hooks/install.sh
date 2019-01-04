#!/bin/bash

cd /home/ec2-user/repos/memo-discord-bot
npm install

ZONE=$(curl 169.254.169.254/latest/meta-data/placement/availability-zone)
REGION=$(echo ${ZONE/%?/})
PARAMETER_NAME=MEMO_DISCORD_BOT_SECRET
echo "DISCORD_BOT_TOKEN=$(aws --region ${REGION} ssm get-parameters --name ${PARAMETER_NAME} --query "Parameters[0].Value" --output text)" > environment

sudo cp ./hooks/memo-discord-bot.service /etc/systemd/system/memo-discord-bot.service
sudo /usr/bin/systemctl enable memo-discord-bot
