require('dotenv').config()
const ldap = require('./models/ldap')
const cucm = require('./models/cucm')
const uccx = require('./models/uccx')

async function go () {
  try {
    console.log('deleting demo agent LDAP users...')
    console.log(await ldap.deleteDemoUsers())
    console.log('deleting demo user LDAP users...')
    console.log(await ldap.deleteDemoAdmins())
    console.log('deleting demo agent Jabber phones...')
    console.log(await cucm.deleteJabberPhones())
    console.log('deleting demo agent Jabber directory numbers...')
    console.log(await cucm.deleteJabberLines())
    console.log('deleting UCCX CSQs...')
    console.log(await uccx.deleteCsqs())
    console.log('deleting UCCX Chat Widgets...')
    console.log(await uccx.deleteChatWidgets())
  } catch (e) {
    console.log(e)
  }
}

go()
