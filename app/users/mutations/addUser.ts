import { AddUser } from "app/auth/validations";
import { resolver, SecurePassword, Ctx } from "blitz";
import db from "db";

const authorize = (input, ctx: Ctx) => {
  ctx.session.$authorize('ADMIN');
  return input;
}

export default resolver.pipe(
  resolver.zod(AddUser),
  authorize,
  async (userParams, ctx: Ctx) => {
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
