import { onBeforeMount, ref } from "vue"
import { getStation } from "../api/station"

const StationCacheKey = 'station_list'

export const useStation = function() {

    const list = ref([])
    const options = ref([])

    onBeforeMount(async () => {
        const stationList = localStorage.getItem(StationCacheKey)
        if(stationList) {
            // return console.log(stationList.split('!!'));
            
        }
        const txt = await getStation()
        const txts = txt.split('|')
        txts[0] = txts[0].slice(txts[0].indexOf('@'))
        list.value = txts.reduce((result, item, key) => {
            const last = result.at(-1)
            if(!(key % 5)) {
                // @ts-ignore
                last && options.value.push({value: last[2], label: last[1], searchStr: last.join('') })
                // @ts-ignore
                result.push([item])
            }else {
                // @ts-ignore
                last.push(item)
            }
            // localStorage.setItem(StationCacheKey, result.join('!!'))
            return result
        }, [])
    })

    return {list, options}
}