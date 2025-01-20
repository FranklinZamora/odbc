#!/usr/bin/env bash

echo "Actualizando los paquetes del sistema..."
apt-get update

echo "Instalando las dependencias del sistema necesarias para ODBC..."
apt-get install -y unixodbc unixodbc-dev

echo "Instalando las dependencias de la aplicación..."
npm install

echo "Build completado."