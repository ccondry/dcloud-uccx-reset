const listLdapUsers = require('./list-ldap-users')
const deleteLdapUsers = require('./delete-ldap-users')

module.exports = async function () {
  const skipped = []
  console.log('getting ldap admin users...')
  const ldapUsers = await listLdapUsers({
    searchDn: process.env.LDAP_CCE_ADMINS_DN
  })
  console.log('successfully got', ldapUsers.length, 'ldap users in', process.env.LDAP_CCE_ADMINS_DN)

  // filter users to the ones we want to delete
  const users = ldapUsers.filter(user => {
    const username = user.sAMAccountName

    // check usernames are not one of the main admin users
    const usernames = ['mgianni', 'ccondry', 'ntheolog']
    if (usernames.includes(username)) {
      return false
    }

    // otherwise included
    return true
  })

  const {success, failed} = await deleteLdapUsers(users)
  // return results
  return {
    success,
    failed,
    skipped
  }
}
