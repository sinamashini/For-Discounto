const smsTemplate = [{
    name: 'duration',
    text: '%token عزیز  میزان  %token2 شما به سقف خود رسیده است و تا  %token3 روز دیگر برای بهره مندی از خدمات کلینیک قابل استفاده است. با تشکر کلینیک ژاوا '
}, {
    name: 'discount',
    text: '%token عزیز مفتخریم که شما کلینیک ما را جهت معرفی به دوستان خود انتخاب نمودید. %token3 از طرف شما به مجموعه ما اضافه شد، برای سپاس از محبت شما مبلغ %token2 ریال از خدمات استفاده شده توسط ایشان در حساب شما منظور گردید. با تشکر کلینیک ژاوا'
}, {
    name: 'head',
    text: 'سلام %token عزیز مفتخریم که شما ما را برای انجام خدمات زیبایی خود انتخاب نمودید. بی صبرانه منتظر حضور بعدی شما هستیم. با تشکر کلینیک ژاوا'
}, {
    name: 'ndays',
    text: '%token عزیز برای استفاده از %token2 خود تنها %token3 روز دیگر وقت دارید.برای بهره مندی از خدمات در اسرع وقت به کلینیک مراجعه کنید . با تشکر کلینیک ژاوا '
}, {
    name: 'register',
    text: 'سلام %token عزیز مفتخریم که شما ما را برای معرفی به دوستان خود انتخاب نمودید. %token2 از طرف شما به مجموعه ما اضافه گردید. با تشکر کلینیک ژاوا'
}];

export enum SmsTemplateEnum {
    DURATION = 'duration',
    DISCOUNT = 'discount',
    HEAD = 'head',
    NDAYS = 'ndays',
    REGISTER = 'register',
}

export default smsTemplate;