const uccx = require('./client')

async function deleteTeams () {
  return deleteTeams({
    typeName: 'UCCX teams',
    type: 'team',
    validTypes: ['Cumulus']
  })
}

async function deleteSkills () {
  return deleteItems({
    typeName: 'UCCX skills',
    type: 'skill',
    validTypes: ['Chat', 'Email', 'Voice', 'Outbound']
  })
}

async function deleteCsqs () {
  return deleteItems({
    typeName: 'UCCX CSQs',
    type: 'csq',
    validTypes: ['Chat', 'Email', 'Voice', 'Outbound']
  })
}

async function deleteChatWidgets () {
  return deleteItems({
    typeName: 'UCCX chat widget',
    type: 'chatWidget',
    validTypes: ['Chat']
  })
}

async function deleteItems ({
  typeName,
  type,
  validTypes
}) {
  const skipped = []
  const success = []
  const fail = []

  console.log(`listing ${typeName}s...`)
  const items = await uccx[type].list()
  console.log('found', items.length, typeName, items)

  const filtered = items.filter(item => {
    const parts = item.name.split('_')
    // valid name has 2 parts
    if (parts.length !== 2) {
      skipped.push(item.name)
      return false
    }
    // check prefix
    if (!validTypes.includes(parts[0])) {
      skipped.push(item.name)
      return false
    }
    // check suffix - it should be a number
    if (isNaN(parts[1])) {
      skipped.push(item.name)
      return false
    }
    //
    return true
  })

  for (const item of filtered) {
    // delete!
    try {
      await uccx[type].delete(item.id)
      console.log('successfully deleted', typeName, item.name)
      success.push(item.name)
    } catch (e) {
      console.log('failed to delete', typeName, item.name, e.message)
      fail.push(item.name)
    }
  }
}

module.exports = {
  deleteCsqs,
  deleteChatWidgets,
  deleteSkills,
  deleteTeams
}
