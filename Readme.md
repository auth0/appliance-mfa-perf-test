# MFA Performance test

This repo contains JMeter tests to test MFA under the conditions stated in this document.

## How To Run

1. *Create test users*: Execute [./warmup/signup.jmx](Signup test plan) using a number of threads equal to the number of users you want to create.

2. Enable mfa on the tenant you're going to use for testing.

3. Modify `tenant` variable on [./warmup/mfa_users.js] mongo mfa users enrollment script.

4. On the monogdb primary node, run `mongo admin -u siteRootAdmin -p <password> mfa_users.js`

5. Enable webtask sms provider on mfa: (Instructions https://github.com/auth0/auth0-mfa-product/wiki/Functional-tests) 

6. Disable webtask request and oob validation on auth0-mfa-api

7. Test your tests (intended recursion) by using Jmeter GUI and setting thread number and loop to 1.

8. On your test environment, use `run-mfa-test.sh <id>` to execute test suite. <id> can be anything that can be used to name a folder, results will be stored on `results-<id>`  