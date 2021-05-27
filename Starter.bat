echo off
title Bot Starter
cls
:start
echo -------------------------------
echo Hypnotic Development
echo Bot Booting/Starting
echo -------------------------------
node index.js
echo -------------------------------
echo Bot Crashed... Looping for Restart
echo -------------------------------
timeout 1 > null
goto start