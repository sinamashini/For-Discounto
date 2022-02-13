import { AddUser } from "app/auth/validations";
import { resolver, SecurePassword } from "blitz";
import db from "db";


export default resolver.pipe(
  resolver.zod(AddUser),
  resolver.authorize("ADMIN"),
  async (userParams, ctx) => {
    const hashedPassword = await SecurePassword.hash(userParams.nationalCode.trim())

    const user = await db.user.create({
      data: {
        ...userParams,
        email: userParams.email.toLowerCase().trim(),
        hashedPassword,
      },
    })

    return user;
  }
)
