import { UpdateUser } from "app/auth/validations";
import { resolver, SecurePassword } from "blitz";
import db from "db";


export default resolver.pipe(
  resolver.zod(UpdateUser),
  resolver.authorize("ADMIN"),
  async (userParams, ctx) => {
    const hashedPassword = await SecurePassword.hash(userParams.nationalCode.trim())

    const user = await db.user.update({
      where: { id: userParams.id},
      data: {
        ...userParams,
        email: userParams.email.toLowerCase().trim(),
        hashedPassword,
      },
    })

    return user;
  }
)
