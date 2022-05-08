import db from "db"

export const addAdminUser = async () => {
  const hashedPassword = "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJE5mZ0dkZ080cUdFTG5LeEtnSjY4SFEkRXBTL2lsQnovaHJXK1pRNlQ2MHl4SVVrKzJQK2hJL3JYdE9IMllaU3dlZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  await db.user.create({ data: { name: 'سینا', email: 'sina.mas1993@gmail.com', hashedPassword, nationalCode: '0015443523', role: "ADMIN" } })
}
