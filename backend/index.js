// Expects: Nothing:
// https://app.kpnc.io/forecaster/api/

async function handleRequest(request) {
	const { searchParams } = new URL(request.url);
    let nav = searchParams.get('nav');

    let latitude = null;
    let longitude = null;

    if (nav != null) { latitude = nav.split(',')[0]; longitude = nav.split(',')[1] }

    if (latitude == null || longitude == null) { latitude = request.cf.latitude; longitude = request.cf.longitude }

	const url = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=yes`, {
            headers: {
                'content-type': 'application/json; charset=UTF-8',
            },
        });
	const data = await url.json();

    const locales = { 'Afghanistan': 'AF', 'Aland Islands': 'AX', 'Albania': 'AL', 'Algeria': 'DZ', 'American Samoa': 'AS', 'Andorra': 'AD', 'Angola': 'AO', 'Anguilla': 'AI', 'Antarctica': 'AQ', 'Antigua and Barbuda': 'AG', 'Argentina': 'AR', 'Armenia': 'AM', 'Aruba': 'AW', 'Australia': 'AU', 'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahamas': 'BS', 'Bahrain': 'BH', 'Bangladesh': 'BD', 'Barbados': 'BB', 'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 'Benin': 'BJ', 'Bermuda': 'BM', 'Bhutan': 'BT', 'Bolivia': 'BO', 'Netherlands Antilles': 'BQ', 'Bosnia and Herzegovina': 'BA', 'Botswana': 'BW', 'Bouvet Island': 'BV', 'Brazil': 'BR', 'British Indian Ocean Territory': 'IO', 'Brunei Darussalam': 'BN', 'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI', 'Cambodia': 'KH', 'Cameroon': 'CM', 'Canada': 'CA', 'Cape Verde': 'CV', 'Cayman Islands': 'KY', 'Central African Republic': 'CF', 'Chad': 'TD', 'Chile': 'CL', 'China': 'CN', 'Christmas Island': 'CX', 'Cocos (Keeling) Islands': 'CC', 'Colombia': 'CO', 'Comoros': 'KM', 'Congo': 'CG', 'Democratic Republic of Congo': 'CD', 'Cook Islands': 'CK', 'Costa Rica': 'CR', 'Cote d\'Ivoire': 'CI', 'Croatia': 'HR', 'Cuba': 'CU', 'Curacao': 'CW', 'Cyprus': 'CY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Djibouti': 'DJ', 'Dominica': 'DM', 'Dominican Republic': 'DO', 'Ecuador': 'EC', 'Egypt': 'EG', 'El Salvador': 'SV', 'Equatorial Guinea': 'GQ', 'Eritrea': 'ER', 'Estonia': 'EE', 'Ethiopia': 'ET', 'Falkland Islands': 'FK', 'Faroe Islands': 'FO', 'Fiji': 'FJ', 'Finland': 'FI', 'France': 'FR', 'French Guiana': 'GF', 'French Polynesia': 'PF', 'French Southern Territories': 'TF', 'Gabon': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH', 'Gibraltar': 'GI', 'Greece': 'GR', 'Greenland': 'GL', 'Grenada': 'GD', 'Guadeloupe': 'GP', 'Guam': 'GU', 'Guatemala': 'GT', 'Guernsey': 'GG', 'Guinea': 'GN', 'Guinea-Bissau': 'GW', 'Guyana': 'GY', 'Haiti': 'HT', 'Heard Island and McDonald Islands': 'HM', 'Vatican City': 'VA', 'Honduras': 'HN', 'Hong Kong': 'HK', 'Hungary': 'HU', 'Iceland': 'IS', 'India': 'IN', 'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE', 'Isle of Man': 'IM', 'Israel': 'IL', 'Italy': 'IT', 'Jamaica': 'JM', 'Japan': 'JP', 'Jersey': 'JE', 'Jordan': 'JO', 'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Kiribati': 'KI', 'North Korea': 'KP', 'South Korea': 'KR', 'Kuwait': 'KW', 'Kyrgyzstan': 'KG', 'Lao People\'s Democratic Republic': 'LA', 'Latvia': 'LV', 'Lebanon': 'LB', 'Lesotho': 'LS', 'Liberia': 'LR', 'Libya': 'LY', 'Liechtenstein': 'LI', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Macao': 'MO', 'Macedonia': 'MK', 'Madagascar': 'MG', 'Malawi': 'MW', 'Malaysia': 'MY', 'Maldives': 'MV', 'Mali': 'ML', 'Malta': 'MT', 'Marshall Islands': 'MH', 'Martinique': 'MQ', 'Mauritania': 'MR', 'Mauritius': 'MU', 'Mayotte': 'YT', 'Mexico': 'MX', 'Federated States of Micronesia': 'FM', 'Moldova': 'MD', 'Monaco': 'MC', 'Mongolia': 'MN', 'Montenegro': 'ME', 'Montserrat': 'MS', 'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nauru': 'NR', 'Nepal': 'NP', 'Netherlands': 'NL', 'New Caledonia': 'NC', 'New Zealand': 'NZ', 'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'Niue': 'NU', 'Norfolk Island': 'NF', 'Northern Mariana Islands': 'MP', 'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Palau': 'PW', 'Palestine': 'PS', 'Panama': 'PA', 'Papua New Guinea': 'PG', 'Paraguay': 'PY', 'Peru': 'PE', 'Philippines': 'PH', 'Pitcairn': 'PN', 'Poland': 'PL', 'Portugal': 'PT', 'Puerto Rico': 'PR', 'Qatar': 'QA', 'Reunion and associated islands': 'RE', 'Romania': 'RO', 'Russia': 'RU', 'Rwanda': 'RW', 'Saint Barthelemy': 'BL', 'Saint Helena': 'SH', 'Saint Kitts and Nevis': 'KN', 'Saint Lucia': 'LC', 'Saint Martin (French part)': 'MF', 'Saint Pierre and Miquelon': 'PM', 'Saint Vincent and the Grenadines': 'VC', 'Samoa': 'WS', 'San Marino': 'SM', 'Sao Tome and Principe': 'ST', 'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS', 'Seychelles': 'SC', 'Sierra Leone': 'SL', 'Singapore': 'SG', 'Sint Maarten (Dutch part)': 'SX', 'Slovakia': 'SK', 'Slovenia': 'SI', 'Solomon Islands': 'SB', 'Somalia': 'SO', 'South Africa': 'ZA', 'South Georgia and South Sandwich Islands': 'GS', 'South Sudan': 'SS', 'Spain': 'ES', 'Sri Lanka': 'LK', 'Sudan': 'SD', 'Suriname': 'SR', 'Svalbard and Jan Mayen': 'SJ', 'Swaziland': 'SZ', 'Sweden': 'SE', 'Switzerland': 'CH', 'Syrian Arab Republic': 'SY', 'Taiwan': 'TW', 'Tajikistan': 'TJ', 'Tanzania': 'TZ', 'Thailand': 'TH', 'Timor-Leste': 'TL', 'Togo': 'TG', 'Tokelau': 'TK', 'Tonga': 'TO', 'Trinidad and Tobago': 'TT', 'Tunisia': 'TN', 'Turkey': 'TR', 'Turkmenistan': 'TM', 'Turks and Caicos Islands': 'TC', 'Tuvalu': 'TV', 'Uganda': 'UG', 'Ukraine': 'UA', 'United Arab Emirates': 'AE', 'United Kingdom': 'GB', 'United States of America': 'US', 'United States Minor Outlying Islands': 'UM', 'Uruguay': 'UY', 'Uzbekistan': 'UZ', 'Vanuatu': 'VU', 'Venezuela': 'VE', 'Vietnam': 'VN', 'Virgin Islands': 'VG', 'Virgin Islands of the United States': 'VI', 'Wallis and Futuna': 'WF', 'Western Sahara': 'EH', 'Yemen': 'YE', 'Zambia': 'ZM', 'Zimbabwe': 'ZW'};

    let city = null;
    let region = null;
    let country = null;
    let timezone = null;

    if (nav != null) {
        city = data.location?.name == null ? '?' : data.location.name;
        region = data.location?.region == null ? '?' : data.location.region;
        country = data.location?.country == null ? '?' : locales[data.location.country];
        timezone = data.location?.tz_id == null ? '?' : data.location.tz_id;
    }

    if (city == null) { city = request.cf.city }
    if (region == null) { region = request.cf.region }
    if (country == null) { country = request.cf.country }
    if (timezone == null) { timezone = request.cf.timezone }

    let location = data.location?.name == null ? '?' : data.location.name;

    let index = null;
    if (data.current?.air_quality != null) {
        index = data.current.air_quality['us-epa-index'];
    }

    let temp = null;
    switch(country) {
        case 'US':
            temp = data.current?.temp_f == null ? '?' : (Math.round(data.current.temp_f)) + '°';
            break;
        default:
            temp = data.current?.temp_c == null ? '?' : (Math.round(data.current.temp_c)) + '°';
            break;
    }

    let temperature = null;
    switch(country) {
        case 'US':
            temperature = data.current?.temp_f == null ? '?' : data.current.temp_f + '°F';
            break;
        default:
            temperature = data.current?.temp_c == null ? '?' : data.current.temp_c + '°C';
            break;
    }

    let feelslike = null;
    switch(country) {
        case 'US':
            feelslike = data.current?.feelslike_f == null ? '?' : data.current.feelslike_f + '°F';
            break;
        default:
            feelslike = data.current?.feelslike_c == null ? '?' : data.current.feelslike_c + '°C';
            break;
    }

    let windspeed = data.current?.wind_kph == null ? '?' : data.current.wind_kph;
    switch(country) {
        case 'US':
        case 'UK':
            windspeed = data.current?.wind_mph == null ? '?' : data.current.wind_mph + ' mph'
            break;
        case 'CA':
        case 'IE':
        case 'DE':
        case 'PL':
        case 'BE':    
        case 'FR':
        case 'MD':
        case 'AT':
        case 'CH':
        case 'IT':
        case 'SI':
        case 'TR':
        case 'ES':
        case 'PT':
        case 'JO':
        case 'IL':
        case 'AU':
            windspeed = windspeed == '?' ? '?' : windspeed + ' km/h';
            break;
        case 'MT':
            windspeed = windspeed == '?' ? '?' : (Math.round(((windspeed / 1.852) + Number.EPSILON) * 10) / 10) + ' Knots';
            break;
        case 'GR':
            if (windspeed == '?') { windspeed = 'Force ?' }
            if (windspeed < 2) { windspeed = 'Force 0' }
            if (windspeed > 2 && windspeed < 5) { windspeed = 'Force 1' }
            if (windspeed > 5 && windspeed < 11) { windspeed = 'Force 2' }
            if (windspeed > 11 && windspeed < 19) { windspeed = 'Force 3' }
            if (windspeed > 19 && windspeed < 28) { windspeed = 'Force 4' }
            if (windspeed > 28 && windspeed < 38) { windspeed = 'Force 5' }
            if (windspeed > 38 && windspeed < 49) { windspeed = 'Force 6' }
            if (windspeed > 49 && windspeed < 61) { windspeed = 'Force 7' }
            if (windspeed > 61 && windspeed < 74) { windspeed = 'Force 8' }
            if (windspeed > 74 && windspeed < 88) { windspeed = 'Force 9' }
            if (windspeed > 88 && windspeed < 102) { windspeed = 'Force 10' }
            if (windspeed > 102 && windspeed < 117) { windspeed = 'Force 11' }
            if (windspeed > 117) { windspeed = 'Force 12' }
            break;
        default:
            windspeed = windspeed == '?' ? '?' : (Math.round(((windspeed / 3.6) + Number.EPSILON) * 10) / 10) + ' m/s';
            break;
    }

    let pressure = data.current?.pressure_mb == null ? '?' : data.current.pressure_mb;
    switch(country) {
        case 'US':
            pressure = data.current?.pressure_in == null ? '?' : data.current.pressure_in + ' inHg';
            break;
        case 'CA':
            pressure = pressure == '?' ? '?' : (pressure / 10) + ' kPa';
            break;
        case 'RU':
            pressure = data.current?.pressure_in == null ? '?' : (Math.round(((data.current.pressure_in * 25.4) + Number.EPSILON) * 10) / 10) + ' Torr';
            break;
        default:
            pressure =  pressure == '?' ? '?' : pressure + ' hPa';
            break;
    }

    const epa = {0: 'Great', 1: 'Good', 2: 'Moderate', 3: 'Unhealthy For Some', 4: 'Unhealthy', 5: 'Very Unhealthy', 6: 'Hazardous'};

    let icon = data.current?.condition?.icon == null ? null : data.current.condition.icon;
    let condition = data.current?.condition?.text == null ? '?' : data.current.condition.text;
    let humidity = data.current?.humidity == null ? '?' : data.current.humidity + '%';
    let winddegree = data.current?.wind_degree == null ? null : data.current.wind_degree;
    let windheading = data.current?.wind_dir == null ? null : data.current.wind_dir;
    let winddirection = winddegree == null ? '?' : winddegree + '°';
    winddirection += windheading == null ? '' : windheading;
    let uvi = data.current?.uv == null ? '?' : data.current.uv + ' of 10';
    let aqi = index == null ? '?' : index + ` (${epa[index]})`;
    let pm25 = data.current?.air_quality?.pm2_5 == null ? '?' : (Math.round((data.current.air_quality.pm2_5 + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let pm10 = data.current?.air_quality?.pm10 == null ? '?' : (Math.round((data.current.air_quality.pm10 + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let o3 = data.current?.air_quality?.o3 == null ? '?' : (Math.round((data.current.air_quality.o3 + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let co = data.current?.air_quality?.co == null ? '?' : (Math.round((data.current.air_quality.co + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let no2 = data.current?.air_quality?.no2 == null ? '?' : (Math.round((data.current.air_quality.no2 + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let so2 = data.current?.air_quality?.so2 == null ? '?' : (Math.round((data.current.air_quality.so2 + Number.EPSILON) * 10) / 10) + ' μg/m³';

    let values = {
        "location": {
            "lat": latitude,
            "long": longitude,
            "city": city,
            "region": region,
            "country": country,
            "zone": timezone,
            "data": location
        }, "weather": {
            "condition": condition,
            "temperature": temperature,
            "feelslike": feelslike,
            "humidity": humidity,
            "windspeed": windspeed,
            "winddirection": winddirection,
            "pressure": pressure,
            "uvi": uvi
        }, "airquality": {
            "aqi": aqi,
            "pm25": pm25,
            "pm10": pm10,
            "o3": o3,
            "co": co,
            "no2": no2,
            "so2": so2
        }
    };

    return new Response(JSON.stringify(values), {
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json; charset=UTF-8',
            'status': 200
        }, status: 200
    });
}

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
});