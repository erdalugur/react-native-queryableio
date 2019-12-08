import { configure, runPublicProc } from 'react-native-queryableio'
configure({
    endpoint: "http://apivm.asicodes.com/query"
})
export function loadAll() {
    return runPublicProc({
        model: "SP_GET_ALL",
        parameters: []
    })
}