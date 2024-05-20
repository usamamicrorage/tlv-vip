
import axios from "axios";

let api_url = "https://dev.tlv-vip.com/ci/api/v1/";
let token = "SnF5KzBadmJvOVpVR2VRT2NuVldSZz09Ojo5NGUyYjdlYjY0OGMwODQ1";

export const Flight_numbers = async (flight_number) => {
    let data;
    await axios.get(api_url + 'get_flight_numbers?flight_number=' + flight_number, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        console.log('Response While getting flight numbers ', response);
        data = response?.data?.data;
    }).catch((error) => {
        console.log('Error while getting flight numbers', error);
    });
    console.log(data);
    return data;
}