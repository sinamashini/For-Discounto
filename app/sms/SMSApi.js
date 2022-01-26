import Kavenegar from 'kavenegar';

const SMSApi = Kavenegar.KavenegarApi({
  apikey: process.env.SMS_PROVIDER_APIKEY
});

export default SMSApi;

