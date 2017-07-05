#/bin/bash

ID=$1
jmeter -n -t Login-mfa.jmx -l results-mfa-$ID -o output-mfa-$ID/ -r
