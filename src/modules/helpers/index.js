export async function updateMacAddress(uid,mac_address) {
    const response = await fetch('http://35.247.149.111:5000/user_update?uid='+uid+'&mac_address='+mac_address)
    return response;
}

export async function createMacAddress(uid,mac_address) {
    const response = await fetch('http://35.247.149.111:5000/user_create?uid='+uid+'&mac_address='+mac_address)
    return response;
}

export async function getDetail(mac_address) {
    const response = await fetch('http://35.247.149.111:5000/sleep_detail/'+mac_address)
    return response;
}