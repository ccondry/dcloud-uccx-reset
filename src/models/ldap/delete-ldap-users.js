const ldap = require('./client')

module.exports = async function (users) {
  const success = []
  const failed = []
  for (const user of users) {
    const username = user.sAMAccountName
    // console.log('deleting LDAP user', username, '...')
    try {
      await ldap.deleteUser({
        adminDn: process.env.LDAP_ADMIN_DN,
        adminPassword: process.env.LDAP_ADMIN_PASSWORD,
        userDn: user.distinguishedName
      })
      console.log('successfully deleted LDAP user', username)
      // add to list of deleted users
      success.push(username)
      continue
    } catch (e) {
      console.log('failed to delete LDAP user', username, e.message)
      failed.push(username)
      continue
    }
  }
  // return results
  return {
    success,
    failed
  }
}
