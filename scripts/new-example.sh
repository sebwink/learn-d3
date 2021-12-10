#!/usr/bin/env bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

EXAMPLE_PATH=$SCRIPTPATH/../site/$1

if [ -d "$EXAMPLE_PATH" ]; then
  echo "Abort. Example with path $1 does already exist."
else
  mkdir -p $(dirname $EXAMPLE_PATH)
  cp -r $SCRIPTPATH/template $EXAMPLE_PATH
  touch $EXAMPLE_PATH/{script.js,style.css}
fi