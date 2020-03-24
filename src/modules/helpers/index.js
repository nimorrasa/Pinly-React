export function diseaseValueData(options) {
    let datas = [];
    for(const data of options) {
        datas.push(data.value);
    }
    return datas.toString();
}

export function toPercent (value,max_value=10) {
    return value * 100 / max_value;
}

export function get_today_string() {
    let date = (new Date()).toISOString();
    return date.substring(0, 10);
}

export function get_date_string(date) {
    return date.toISOString().substring(0, 10);
}


export async function updateMacAddress(uid,mac_address) {
    const response = await fetch('https://api.pinly.org/user_update?uid='+uid+'&mac_address='+mac_address)
    return response.json();
}

export async function createMacAddress(uid,mac_address) {
    const response = await fetch('https://api.pinly.org/user_create?uid='+uid+'&mac_address='+mac_address)
    return response.json();
}

export async function getDetail(date,mac_address) {
    const response = await fetch('https://api.pinly.org/sleep_detail?mac_address='+mac_address+'&date='+date)
    return response.json();
}

export async function log_data(uid,mac_address,sleep_status,current_datetime) {
    const response = await fetch('https://api.pinly.org/sleep_log?uid='+uid+'&mac_address='+mac_address+'&timestamp='+current_datetime+'&status='+sleep_status)
    return response.json();
}

export async function get_log_data_by_macaddress(mac_address) {
    const response = await fetch('https://api.pinly.org/sleep_log_weekly?mac_address='+mac_address)
    return response.json();
}

export async function get_sleep_data_by_macaddress(uid,mac_address) {
    const response = await fetch('https://api.pinly.org/sleep_score_weekly?uid='+uid+'&mac_address='+mac_address)
    return response.json();
}

export async function get_mic_summary(date,mac_address) {
    const response = await fetch('https://api.pinly.org/mic_summary?date='+date+'&mac_address='+mac_address)
    return response.json();
}
