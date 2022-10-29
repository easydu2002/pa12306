import { request } from "../util/request";


export const getStation = () => request('/otn/resources/js/framework/station_name.js?station_version=1.9241').then(async res => await res.text())