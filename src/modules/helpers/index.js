export async function updateMacAddress(uid,mac_address) {
    const response = await fetch('http://34.87.8.207:5000/user_update?uid='+uid+'&mac_address='+mac_address)
    return response.json();
}

export async function createMacAddress(uid,mac_address) {
    const response = await fetch('http://34.87.8.207:5000/user_create?uid='+uid+'&mac_address='+mac_address)
    return response.json();
}

export async function getDetail(mac_address) {
    const response = await fetch('http://34.87.8.207:5000/sleep_detail?mac_address='+mac_address)
    return response.json();
}

export async function log_data(uid,mac_address,sleep_status,current_datetime) {
    const response = await fetch('http://34.87.8.207:5000/sleep_log?uid='+uid+'&mac_address='+mac_address+'&timestamp='+current_datetime+'&status='+sleep_status)
    return response.json();
}

export async function get_log_data_by_macaddress(mac_address) {
    const response = await fetch('http://34.87.8.207:5000/sleep_log_weekly?mac_address='+mac_address)
    return response.json();
}

export async function get_sleep_data_by_macaddress(uid,mac_address) {
    const response = await fetch('http://34.87.8.207:5000/sleep_score_weekly?uid='+uid+'&mac_address='+mac_address)
    return response.json();
}