import SMSApi from './SMSApi';

export const sendSingle = (template, receptor, params) => {
  const tokens = {
    token: params.token,
    ...(params.token2 && { token2: params.token2 }),
    ...(params.token3 && { token3: params.token3 })
  };
  const goh = { ...tokens };
  SMSApi.Send({
    receptor,
    template,
    ...tokens,
  });
}
