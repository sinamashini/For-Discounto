import { SecurePassword } from "blitz"
import db from "db"

const addClients = async () => {
  const clients = [
    { name: 'سینا ماشینی', email: "sina.mashini1993@gmail.com", nationalCode: '0015443523', contact: '09125430547', notes: '' },
    { name: 'رضا اصغری', email: "sina2@gmail.com", nationalCode: '0387661816', contact: '0912555430547', notes: '' },
    { name: 'کریم عشقی', email: "sina3@gmail.com", nationalCode: '0169924629', contact: '09121225430547', notes: '', parent: '0015443523', },
    { name: 'عباس قلی حسنوند', email: "sina4@gmail.com", nationalCode: '0315067764', contact: '09125423430547', notes: '', parent: '0169924629' },
    { name: 'فاطمه درود گر', email: "sina5@gmail.com", nationalCode: '0804075816', contact: '0912235430547', notes: '', parent: '0315067764'  },
    { name: 'رضا شوکت منش', email: "sin6a@gmail.com", nationalCode: '0188691219', contact: '0912512430547', notes: '' },
  ]

  for (let i = 0; i < clients.length; i++) {
    const hashedPassword = await SecurePassword.hash(clients[i]?.nationalCode!.trim())
    let parent: any = null;
    if(clients[i]?.parent) {
      parent = await db.clients.findUnique({where: {nationalCode: clients[i]?.parent }});
    }
    await db.clients.create({ data: {
      name: clients[i]?.name!,
      email: clients[i]?.email!,
      contact: clients[i]?.contact!,
      hashedPassword,
      nationalCode: clients[i]?.nationalCode!,
      ...(parent && { parentId: parent.id})
     } })

  }
}


export default addClients;
