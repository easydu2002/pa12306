

import Cookies from 'js-cookie'
import { request } from '../util/request'

export interface TicketQuery {
    type: 'dc' | 'wf',
    // userType: 'dc',
    from: string,
    to: string,
    fromDate: string,
    toDate: string
}

export const getTicket = function(query: TicketQuery) {
    
    // Cookies.set('_uab_collina', '166700441087708985161181')
    // Cookies.set('_jc_save_fromStation', '%u5317%u4EAC%2CBJP')
    Cookies.set('_jc_save_toDate', query.toDate)
    // Cookies.set('route', '6f50b51faa11b987e576cdb301e545c4')
    // Cookies.set('RAIL_EXPIRATION', '1667285998478')
    Cookies.set('_jc_save_fromDate', query.fromDate)
    // Cookies.set('guidesStatus', 'off')
    Cookies.set('_jc_save_wfdc_flag', query.type)
    // Cookies.set('JSESSIONID', '75D7975C1898AF51853E457448398BAF')
    // Cookies.set('cursorStatus', 'off')
    // Cookies.set('fo', '1r7dyi64axkptqzf78Myayz5_DYZ00ihJV10RdCwsdSYd_vCwxsJqfkKxLybjlLkpVwbGxPPQlQ5WXfye59Vp4Q6sRRPClKIy_N7d9Yl256TSZEP6Er_9b4WQmxLyHg9jIOdvJob8XJInY-H0fKq6YLVH4kOU6CUcRyGE0qdcooQWltVxHJpNKzRCrsk')
    // Cookies.set('highContrastMode', '9wGKKx-yDiSEU0Ue-MlB87rHhM9fiJ19pejmQAcgd1d0')
    // Cookies.set('tk', 'defaltMode')
    // Cookies.set('BIGipServerotn', '66060810.24610.0000')
    // Cookies.set('uKey', '84b1510a687b595104fcb4a76741ab1d9da026b2f780387d06ff46891028b84a')
    // Cookies.set('_jc_save_toStation', '%u4E0A%u6D77%2CSHH')
    // Cookies.set('BIGipServerpool_passport', '82051594.50215.0000')
    // Cookies.set('current_captcha_type', 'Z')
    // Cookies.set('RAIL_DEVICEID', 'k8jdE1yfggIqV08RCerFaYzF3jZYQH5aCLOWHcEw09wDmoZqSUJ67TSaVilFNr9I_sw-w64eVV-sc-z4FSp_YIExOwVVe5PAXA9nGeOJKKII2ngYiE8Mg-uZYa2eAVAvOWgiGLo834rWUYeMlAkRj_0APoRM0bZN')

    return request(`/otn/leftTicket/query?leftTicketDTO.train_date=${query.fromDate}&leftTicketDTO.from_station=${query.from}&leftTicketDTO.to_station=${query.to}&purpose_codes=ADULT`).then(res => res.json())
}