import { AsyncStorage } from 'react-native'


var configuration = {
    endpoint: "",
    beforeScript: null,
    credentialsExpiry: 7
}


async function toJSON(e) {
    try {
        if (e.status == 200) {
            const result = await e.json();
            return result;
        }
        else if (e.status == 400 || e.status === 406) {
            const result = await e.json();
            const { error } = result;
            return {
                statusCode: e.status,
                data: null,
                statusText: handleError(e.status, typeof (error) === "object" ? error.originalError && error.originalError.info && error.originalError.info.message : (error || ""))
            };
        }
        else {
            return { statusCode: e.status, data: null, statusText: handleError(e.statusCode, e.statusText) };
        }
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {Object} params 
 */

export async function runQuery(params, customUrl) {
    try {
        try { configuration.beforeScript && typeof (configuration.beforeScript) === "function" ? configuration.beforeScript() : null; } catch (error) { };

        if (!configuration.endpoint) { throw new Error("endpoint is missing") };

        const endpoint = customUrl || configuration.endpoint;
        const c = getCredentials();
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "authorization": `Bearer ${typeof (c) === "object" ? c.token : ""}`
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify(params)
        };
        const result = await fetch(endpoint, options);
        // console.log(result)
        return await toJSON(result);

    } catch (error) {
        throw error
    }
}

/**
 * 
 * @param {{ endpoint:String, beforeScript: Function, credentialsExpiry: number }} param0 
 */
export function configure({ endpoint, beforeScript, credentialsExpiry = 7 }) {
    configuration.endpoint = endpoint;
    configuration.beforeScript = beforeScript;
    configuration.credentialsExpiry = credentialsExpiry
}
/**
 * 
 * @param {import('./types').ISelect} param 
 * @returns {Promise<import('./types').IResponse>}
 */
export async function runSelect({ model, fields, filters, limit, joins, sortby, groupby }) {
    return await runQuery({
        action: "select",
        model,
        fields,
        filters,
        limit,
        sortby,
        groupby,
        joins
    })
}


/**
 * 
 * @param {import('./types').IFilter} param 
 */
export function addFilter({ key, value, model, operator, rightOperator }) {
    const params = {
        key: key,
        value: value,
        operator: operator
    }
    model ? params.model = model : null;
    params.operator = operator || operators.equal
    rightOperator ? params.rightOperator = rightOperator : null;
    return params;
}

export function addSort(model, key, direction) {
    return {
        "model": model,
        "key": key,
        "value": direction || sortTypes.desc
    }
}
/**
 * 
 * @param {string} model 
 * @param {string} primaryKey 
 * @param {string} parentKey 
 * @param {string[]} fields 
 * @param {'LEFT' | 'RIGTH' | 'INNER'} type 
 */
export function addJoin(model, primaryKey, parentKey, fields = [], type) {
    return {
        "model": model,
        "fields": fields,
        "primaryKey": primaryKey,
        "parentKey": parentKey,
        "type": type || joinTypes.inner
    }
}

export const operators = {
    equal: "=",
    in: "in",
    and: "and",
    or: "or"
}

export const joinTypes = {
    inner: "INNER",
    left: "LEFT",
    right: "RIGHT"
}

export const status = {
    success: 200,
    error: 400,
    not_found: 404,
    access_denied: 403
}

export const sortTypes = { asc: "ASC", desc: "DESC" };

/**
 * @param {import('./types').IUpdate} param
 * @returns {Promise<import('./types').IResponse>}
 */
export async function runUpdate({ model, row, filters }) {
    return await runQuery({
        action: "update",
        model: model,
        row: row,
        filters: filters
    })
}

/**
 * 
 * @param {import('./types').IProc} param
 * @returns {Promise<import('./types').IResponse>}
 */
export async function runProc({ model, parameters = [] }) {
    return await runQuery({
        action: "procedure",
        model: model,
        parameters: parameters
    })
}

/**
 * 
 * @param {import('./types').IProc} param 
 * @returns {Promise<import('./types').IResponse>}
 */
export async function runPublicProc({ model, parameters = [] }) {
    return await runQuery({
        action: "public",
        model: model,
        parameters: parameters
    })
}

/**
 * 
 * @param {import('./types').IDelete} param 
 * @returns {Promise<import('./types').IResponse>}
 */
export async function runDelete({ model, filter }) {
    return await runQuery({
        action: "delete",
        model: model,
        filter: filter
    })
}


/**
 * 
 * @param {import('./types').ILogin} param 
 * @returns {Promise<import('./types').IToken}
 */
export async function runLogin({ model, keyField, valueField, fields, joins, filters, relaxMode = true }) {
    return await runQuery({
        action: "login",
        model,
        keyField,
        valueField,
        fields,
        joins,
        filters
    }).then(x => {
        if (relaxMode && x.token) { setCredentials(x.token) };
        return x
    })
}

/**
 * 
 * @param {import('./types').IRegister} param
 * @returns {Promise<import('./types').IToken>}
 */
export async function runRegister({ model, username, afterSelect, row, keyField, valueField, relaxMode = true }) {
    return await runQuery({
        action: "register",
        model,
        username,
        afterSelect,
        row,
        keyField,
        valueField
    }).then(x => {
        if (relaxMode && x.token) { setCredentials(x.token); }
        return x;
    });
}

/**
 * 
 * @param {import('./types').IMultipleCreate} param
 * @returns {Promise<import('./types').IResponse>}
 */
export async function runMultipleCreate({ model, keys, rows }) {
    return await runQuery({
        action: "multipleCreate",
        model,
        keys,
        rows
    })
}
/**
 * 
 * @param {string} script
 * @returns {Promise<import('./types').IResponse>}
 */
export async function runScript(script) {
    return await runQuery({
        action: "script",
        script
    })
}

/**
 * 
 * @param {import('./types').IMail} param
 */
export async function sendMail({ to, subject, text, html, cc }) {
    return await runQuery({
        action: "mail",
        to: to,
        subject: subject,
        text: text,
        html: html,
        cc: cc
    })
}


/**
 * 
 * @returns {{token:string}}
 */
export function getCredentials() {
    const data = AsyncStorage.getItem("token");
    if (data) {
        try {
            var result = JSON.parse(data);
            if (new Date().getTime() <= result.expiryDate) {
                return result
            } else {
                return undefined;
            }
        } catch (error) {
            return undefined
        }
    } else {
        return undefined;
    }
}

/**
 * 
 * @param {any} data 
 * @param {number} [days?] 
 */
export function setCredentials(data, days) {
    var getTime = function () {
        var date = new Date();
        date.setDate(date.getDate() + (days || configuration.credentialsExpiry || 7));
        return date.getTime();
    }
    AsyncStorage.setItem("token", JSON.stringify({ name: "token", value: data, expiryDate: getTime() }))
}


export function clearCredentials() {
    AsyncStorage.removeItem("token");
}

export const statusMessages = {
    "400": "Bad_Request",
    "404": "Not_Found",
    "403": "Unauthorized",
    "406": "Already_Exists",
    "500": "Internal_Server_Error",
    "200": "Success",
    "EPARAM": "Validatiton_Error"
}


export function handleError(statusCode, orginalError) {
    var message = statusMessages[statusCode];

    return message ? { message, orginalError } : null;
}