

export const getStation = () => fetch('/12306/otn/resources/js/framework/station_name.js?station_version=1.9241').then(async res => await res.text())