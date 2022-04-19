import { replaceSpaceWithHalfSpace } from 'app/clients/backend/helpers';
import { KavenegarApi } from 'kavenegar';

export const sendSingle = async (template, receptor, params) => {
  const tokens = {
    "token": replaceSpaceWithHalfSpace(params.token),
    ...(params.token2 && { "token2": replaceSpaceWithHalfSpace(params.token2) }),
    ...(params.token3 && { "token3": replaceSpaceWithHalfSpace(params.token3) })
  };
  const SMSApi = KavenegarApi({
    apikey: '74335069726877556F345035764231536F4C4B7133332B467250537A674E427A2F5231384156456E6743733D',
  });
  await SMSApi.VerifyLookup({
    receptor,
    template,
    ...tokens,
  }, (input, status, message) => {
    console.log("*****************************")
    console.log(input);
    console.log(status);
    console.log(message);
    console.log("*****************************")
  });
}
