

export interface Ticket {
    /**
     * 车次
     */
    number: string
    /**
     * 出发站编号
     */
    from: string
    /**
     * 到达站编号
     */
    to: string
    /**
     * 出发时间
     */
    fromDate: string
    /**
     * 到达时间
     */
    toDate: string
    /**
     * 历时
     */
    totalTime: string
    
    /**
     * 商务座
     */
    seatA: string
    /**
     * 一等座
     */
    seat1: string
    /**
     * 二等座
     */
    seat2: string

    /**
     * 高级软卧
     */
    bedA: string
    /**
     * 一等软卧
     */
    bed1: string

    /**
     * 动卧
     */
    dynamicBed: string
    /**
     * 硬卧二等卧
     */
    bed2: string

    /**
     * 软座 
     */
    ruanSeat: string // 这及其之后的座位应该是火车的
    /**
     * 硬座
     */
    yingSeat: string
    /**
     * 站票
     */
    stand: string
    /**
     * 其他
     */
    other: string

    /**
     * 备注
     */
    remark: string


}

/**
 * 解析数据
 * @param str 
 * 
 * @example
 * Gtck177KeVVS%2BHAeQZBimmi4F6%2BqAvo2YELjxSaI2mv8rPaUp2pjsGDbSXS9kbp5eFYzRkPhMW1D%0ATGajieRmLsOp3KJOyvtvDNLLlwBKuKluOujmcYFWZnY%2BupvnKYZlrwaHiE%2B%2Bs0G6ecJjWkDphQJ4%0AxFBn5SNkfyGWzBEAYGxn7Eqz1AxVdq51tbR2DwcSulLwtVkwMLSPcBwkHcWcu9ycYYqstl23zHES%0Az%2BuHqba%2BHiwsKYtRVZrB5U1c92j59bju3lKJFTua%2BdfbWv7ia%2FSzy4c7Tyn0heG9e3UKtUjv1sgY%0A7aEvO3Vt4W%2B3WdlO|预订|240000G12113|G121|VNP|AOH|VNP|AOH|10:05|15:42|05:37|Y|3Ua5cVGMieCNmzPYylTzxvRt1IM%2BO7rJ8t%2FUVc%2BZvxTSGbqU|20221029|3|P2|01|09|1|0|||||||||||有|有|7||O0M090|OM9|1|0||O059800021M1006000219215800007|0|||||1|#1#0#0#z||7
 * 
 */
export const parserTicket = function(str: string, map: [][]): Ticket {
    const items = str.split('|')

    const [from, to] = Object.entries(map)
    return {
        number: items[3] || '--',
        // @ts-ignore
        from: from[1] || '--',
        // @ts-ignore
        to: to[1] || '--',
        fromDate: items[8] || '--',
        toDate: items[9] || '--',
        totalTime: items[10] || '--',
        seatA: items[32] || '--',
        seat1: items[31] || '--',
        seat2: items[30] || '--',
        bedA: items[21] || '--',
        bed1: items[23] || '--',
        dynamicBed: items[33] || '--',
        bed2: items[28] || '--',
        ruanSeat: items[24] || '--',
        yingSeat: items[29] || '--',
        stand: items[26] || '--',
        other: '--',
        remark: items[1] || '--'
    }
}