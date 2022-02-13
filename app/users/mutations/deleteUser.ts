import { DeleteGenral } from '@zhava/generalValidation'
import { resolver } from "blitz";
import db from "db";


export default resolver.pipe(
  resolver.zod(DeleteGenral),
  resolver.authorize("ADMIN"),
  async ({id}, ctx) => {
    await db.user.delete({ where: { id } });
    return 'Done!'
  }
)
