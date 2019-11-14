const listLdapUsers = require('./list-ldap-users')
const deleteLdapUsers = require('./delete-ldap-users')

module.exports = async function () {
  const skipped = []
  console.log('getting ldap demo users...')
  const ldapUsers = await listLdapUsers({
    searchDn: process.env.LDAP_CCE_AGENTS_DN
  })
  console.log('successfully got', ldapUsers.length, 'ldap users in', process.env.LDAP_CCE_AGENTS_DN)

  // filter users to the ones we want to delete
  const users = ldapUsers.filter(user => {
    const username = user.sAMAccountName

    // check username length
    if (username.length !== 12) {
      return false
    }

    // check username prefix
    const prefix = username.substring(0, 8)
    const prefixes = ['sjeffers', 'rbarrows', 'jopeters']
    if (!prefixes.includes(prefix)) {
      return false
    }
    // check username suffix
    const suffix = username.substring(8)
    if (isNaN(suffix)) {
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
