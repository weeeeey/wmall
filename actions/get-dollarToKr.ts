import axios from 'axios';

// from = 'USD';
// to = 'KOR';
// amount = '10';

// execute the conversion using the "convert" endpoint:
// $.ajax({
//     url: 'https://api.currencylayer.com/' + endpoint + '?access_key=' + access_key +'&from=' + from + '&to=' + to + '&amount=' + amount,
//     dataType: 'jsonp',
//     success: function(json) {

//         // access the conversion result in json.result
//         alert(json.result);

//     }
// });
process.env.NEXT_PUBLIC_CURRENCYLAYER_API;
const getDollarToKr = async (price: number) => {
    const url = `${process.env.NEXT_PUBLIC_APILAYER_URL}${process.env.NEXT_PUBLIC_CURRENCYLAYER_API}&currencies=KRW&source=USD&format=1`;
    const res = await axios(url);

    return parseInt(price * res.data.quotes.USDKRW + '');
};

export default getDollarToKr;
