# dcloud-uccx-reset
This is a script to delete all of the objects created by the dCloud Toolbox
provision scripts. It will delete users in LDAP, phones CUCM, and multiple
objects in UCCX.

# usage
1. copy the .env.example to .env and then edit the values in .env to match your
environment.
2. run `npm install`
3. run `npm start` or `node src/index.js` to start the script

It will start deleting immediately when you run it, so make sure you are ready
to delete things!
