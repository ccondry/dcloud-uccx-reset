const uccx = require('./client')
// 
// async function deleteCsqs () {
//   const skipped = []
//   const success = []
//   const fail = []
//   console.log('listing CSQs...')
//   const csqs = await uccx.csq.list()
//   console.log('found', csqs.length, 'CSQs')
//   const validTypes = ['Chat', 'Email', 'Voice', 'Outbound']
//   const filtered = csqs.filter(csq => {
//     // console.log(csq)
//     // return csq.queueType === 'CHAT'
//     // const prefix = csq.name.substring('
//     const parts = csq.name.split('_')
//     // valid csq has 2 parts
//     if (parts.length !== 2) {
//       skipped.push(csq.name)
//       return false
//     }
//     // check prefix
//     if (!validTypes.includes(parts[0])) {
//       skipped.push(csq.name)
//       return false
//     }
//     // check suffix - it should be a number
//     if (isNaN(parts[1])) {
//       skipped.push(csq.name)
//       return false
//     }
//     //
//     return true
//   })
//
//   for (const csq of filtered) {
//     // delete!
//     try {
//       await uccx.csq.delete(csq.id)
//       console.log('successfully deleted UCCX CSQ', csq.name)
//       success.push(csq.name)
//     } catch (e) {
//       console.log('failed to delete UCCX CSQ', csq.name, e.message)
//       fail.push(csq.name)
//     }
//   }
// }

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

  const typeName = 'UCCX chat widget'
  const type = 'chatWidget'
  const validTypes = ['Chat']

  console.log(`listing ${typeName}s...`)
  const items = await uccx[type].list()
  console.log('found', items.length, typeName)

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
      console.log('successfully deleted', typeName, csq.name)
      success.push(csq.name)
    } catch (e) {
      console.log('failed to delete', typeName, csq.name, e.message)
      fail.push(csq.name)
    }
  }
}

module.exports = {
  deleteCsqs,
  deleteChatWidgets
}
