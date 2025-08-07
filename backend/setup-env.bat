@echo off
echo # MongoDB Connection> .env
echo MONGO_URI=mongodb://admin:password@localhost:27017/group33?authSource=admin>> .env
echo.>> .env
echo # Server Port>> .env
echo PORT=5000>> .env
echo.>> .env
echo # JWT Secret>> .env
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production>> .env
echo.>> .env
echo # NODE_ENV>> .env
echo NODE_ENV=development>> .env

echo .env file has been created with default settings.
echo Please review and modify the values as needed.

paus