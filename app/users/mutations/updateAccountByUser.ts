import { EditUserSelfAccount } from "app/auth/validations";
import { resolver } from "blitz";
import db from "db";


export default resolver.pipe(
  resolver.zod(EditUserSelfAccount),
  resolver.authorize(),
  async (userParams, ctx) => {
    const { userId } = ctx.session;

    const user = await db.user.update({
      where: { id: userId },
      data: {
        ...userParams,
        email: userParams.email.toLowerCase().trim(),
      },
    })

    return user;
  }
)
