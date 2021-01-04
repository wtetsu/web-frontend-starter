#! /bin/sh

ncu -u
npm install
npm audit fix
npm dedupe

