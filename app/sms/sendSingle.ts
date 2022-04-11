import { KavenegarApi } from 'kavenegar';

export const sendSingle = async (template, receptor, params) => {
  const tokens = {
    token: params.token,
    ...(params.token2 && { token2: params.token2 }),
    ...(params.token3 && { token3: params.token3 })
  };
  console.log(tokens);
  const SMSApi = KavenegarApi({
    apikey: '314E323138565363514433784A2F5951355A544F5357382B71316247335758662B414C475056474A5365633D',
  });
  console.log(SMSApi);
  await SMSApi.VerifyLookup({
    receptor,
    template,
    ...tokens,
  }, (input, status, message) => {
    console.log(input);
    console.log(status);
    console.log(message);
  });
}
