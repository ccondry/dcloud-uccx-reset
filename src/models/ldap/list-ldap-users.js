const ldap = require('./client')

module.exports = async function ({
  attributes = [
    'name',
    'sAMAccountName',
    'memberOf',
    'primaryGroupID',
    'description',
    'physicalDeliveryOfficeName',
    'distinguishedName',
    'mail',
    'userPrincipalName',
    'whenChanged',
    'whenCreated'
  ],
  filter = '(&(objectClass=user)(objectcategory=person))',
  searchDn
}) {
  const ldapUsers = await ldap.listUsers({
    adminDn: process.env.LDAP_ADMIN_DN,
    adminPassword: process.env.LDAP_ADMIN_PASSWORD,
    filter,
    attributes,
    searchDn
  })
  // return results
  return ldapUsers
}
