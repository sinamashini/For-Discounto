import { SecurePassword } from "blitz"
import db from "db"


export const addAdminUser = async () => {
  const password = "sina2581343";
  const hashedPassword = await SecurePassword.hash(password.trim())
  await db.user.create({ data: { name: 'سینا', email: 'sina.mas1993@gmail.com', hashedPassword, nationalCode: '0015443523', role: "ADMIN" } })
}
