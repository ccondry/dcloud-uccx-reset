const uccx = require('./client')

async function deleteCalendars () {
  return deleteItems({
    typeName: 'UCCX holiday calendars',
    type: 'calendar',
    validTypes: ['HolidayCalendar'],
    idProperty: 'calId'
  })
}

async function deleteApplications () {
  return deleteItems({
    typeName: 'UCCX applications',
    type: 'application',
    validTypes: ['Customer_Service'],
    nameProperty: 'applicationName',
    idProperty: 'applicationName',
    nameParts: 3
  })
}

async function deleteTeams () {
  return deleteItems({
    typeName: 'UCCX teams',
    type: 'team',
    validTypes: ['Cumulus'],
    nameProperty: 'teamname',
    idProperty: 'teamId'
  })
}

async function deleteSkills () {
  return deleteItems({
    typeName: 'UCCX skills',
    type: 'skill',
    validTypes: ['Chat', 'Email', 'Voice', 'Outbound'],
    nameProperty: 'skillName',
    idProperty: 'skillId'
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
    typeName: 'UCCX chat widgets',
    type: 'chatWidget',
    validTypes: ['Chat']
  })
}

async function deleteItems ({
  typeName,
  type,
  validTypes,
  nameProperty = 'name',
  idProperty = 'id',
  nameParts = 2
}) {
  const skipped = []
  const success = []
  const fail = []

  console.log(`listing ${typeName}...`)
  const items = await uccx[type].list()
  console.log('found', items.length, typeName, items[0])
  // console.log('found', items.length, typeName, items)

  const filtered = items.filter(item => {
    const parts = item[nameProperty].split('_')
    // valid name has 2 parts
    if (parts.length !== nameParts) {
      skipped.push(item[nameProperty])
      return false
    }

    // check suffix - it should be a number
    const suffix = parts.pop()
    if (isNaN(suffix)) {
      skipped.push(item[nameProperty])
      return false
    }

    // check prefix
    const prefix = parts.join('_')
    if (!validTypes.includes(prefix)) {
      skipped.push(item[nameProperty])
      return false
    }

    //
    return true
  })

  console.log('filtered', 'to', filtered.length, typeName)
  for (const item of filtered) {
    // delete!
    try {
      await uccx[type].delete(item[idProperty])
      console.log('successfully deleted', typeName, item[nameProperty])
      success.push(item[nameProperty])
    } catch (e) {
      console.log('failed to delete', typeName, item[nameProperty], e.message)
      fail.push(item[nameProperty])
    }
  }
  return {
    success,
    skipped,
    fail
  }
}

module.exports = {
  deleteCsqs,
  deleteChatWidgets,
  deleteSkills,
  deleteTeams,
  deleteApplications,
  deleteCalendars
}
