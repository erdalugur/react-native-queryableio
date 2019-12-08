import { runPublicProc, configure } from "./lib";

configure({
    endpoint: "http://apivm.asicodes.com/query"
})
export function loadAll() {
    return runPublicProc({
        model: "SP_GET_ALL",
        parameters: []
    })
}