#!/usr/bin/env bash

# Copies DB from production to testing (or local).
# Must be run from testing (or local)!! Do not run this from production!!

DB=ss1
SSH_PORT=22
MYSQL_PORT=3306

GUID=`date +%Y%m%d%H%M%S`
DUMP_FILE_NAME=${DB}-backup-${GUID}.sql
DB_SCRIPT=./buildScripts/drop-db.sql

REMOTE_COMMAND="mysqldump --port=${MYSQL_PORT} --host=127.0.0.1 --extended-insert --user=root --password=6425kr ${DB} > ${DUMP_FILE_NAME}"

echo GUID: ${GUID}
echo DB: ${DB}
echo SSH_PORT: ${SSH_PORT}
echo MYSQL_PORT: ${MYSQL_PORT}
echo DUMP_FILE_NAME: ${DUMP_FILE_NAME}
echo REMOTE_COMMAND: ${REMOTE_COMMAND}
echo DB_SCRIPT: ${DB_SCRIPT}

echo "Building mysql5 dump file on mysql5 server..."
sshpass -p "gGJ#*(Gmfio;2e" ssh -p ${SSH_PORT} -o StrictHostKeyChecking=no dford@72.249.19.8 ${REMOTE_COMMAND}
echo "  Building mysql5 dump file on mysql5 server complete! Exit code: $?"



echo "Downloading mysql5 dump file to backup dir..."
mkdir -p ~/ss1-backup  #create ~/ramko-backup dir if it doesn't exist
sshpass -p "gGJ#*(Gmfio;2e" scp -P ${SSH_PORT} dford@72.249.19.8:${DUMP_FILE_NAME} ~/ss1-backup
echo "  Downloading mysql5 dump file to backup dir complete! Exit code: $?"

echo "Delete and recreate database ${DB}..."
mysql --host=127.0.0.1 --port=3306 --user=root --password=dQxx-PoopSwagger   < ${DB_SCRIPT}
echo "  Delete and recreate database ${DB} complete! Exit code: $?"

echo "Importing dump file into local mysql..."
mysql --host=127.0.0.1 --port=3306 --user=root --password=dQxx-PoopSwagger ${DB} < ~/ss1-backup/${DUMP_FILE_NAME}
echo "  Importing dump file into local mysql complete! Exit code: $?"