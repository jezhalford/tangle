#!/bin/sh

export DEBIAN_FRONTEND=noninteractive

echo "Update aptitude..."
echo "---------------------------------------------------"
echo ""
apt-get update

echo "Install PHP..."
echo "---------------------------------------------------"
echo ""
apt-get install php5 -yq

echo "Install MySQL..."
echo "---------------------------------------------------"
echo ""
apt-get install mysql-server -yq


echo "Install PHP's MySQL module..."
echo "---------------------------------------------------"
echo ""
apt-get install php5-mysql -yq

