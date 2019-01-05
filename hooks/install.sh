#!/bin/bash

cd /home/ec2-user/repos/memo-discord-bot

PARAMETER_NAME=MEMO_DISCORD_BOT_SECRET
if [ "$DEPLOYMENT_GROUP_NAME" == "develop" ]
then
    PARAMETER_NAME=MEMO_DEVELOP_DISCORD_BOT_SECRET
fi
REGION=$(curl -s 169.254.169.254/latest/meta-data/local-hostname | cut -d '.' -f2)
echo "DISCORD_BOT_TOKEN=$(aws --region ${REGION} ssm get-parameter --name ${PARAMETER_NAME} --query "Parameter.Value" --output text)" > environment

cp ./hooks/memo-discord-bot.service /etc/systemd/system/memo-discord-bot.service
/usr/bin/systemctl enable memo-discord-bot
