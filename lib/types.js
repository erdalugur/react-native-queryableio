/**
 * 
 * @typedef {Object} IResponse 
 * @property {array} data
 * @property {any} error 
 * @property {number} statusCode 
 * 
 */

/**
* @typedef {Object} IToken 
* @property {string} token
* @property {array} data
* @property {any} error 
* @property {number} statusCode 
* 
*/
/**
 * 
 * @typedef {Object} IKeyValuePair 
 * @property {string} key
 * @property {any} value 
 * 
 */

/**
* 
* @typedef {Object} IRow 
* @property {string} key
* @property {string} value 
* 
*/

/**
* 
* @typedef {Object} IFilter 
* @property {string} key
* @property {any} value 
* @property {string} model
* @property {"="|"in"|"!="| "not in" | "is null" | "is not null" | ">" | ">=" | "<" | "<="} operator
* @property {"AND" | "and" | "or" | "OR" | "not" | "NOT" | "AND NOT" | "OR NOT"} rightOperator
* 
*/
/**
* 
* @typedef {Object} ISort 
* @property {string} key
* @property {string} value 
* @property {string} model 
* 
*/
/**
* 
* @typedef {Object} IGroup 
* @property {string} key
* @property {string} model 
* 
*/

/**
 * 
 * @typedef {Object} IJoin 
 * @property {string} model
 * @property {string} primaryKey
 * @property {string[]} fields
 * @property {string} parentKey
 * @property {'LEFT' | 'RIGHT' | 'INNER' } type    
 */
/**
 * 
 /**
  * @typedef {Object} IRegister
  * @property {string} model
  * @property {string} username
  * @property {string[]} afterselect
  * @property {IRow[]} row
  * @property {IKeyValuePair} keyField
  * @property {IKeyValuePair} valueField
  * @property {boolean} relaxMode
  */

/**
* @typedef {Object} ILogin
* @property {string} model
* @property {string} username
* @property {string[]} fields
* @property {IJoin[]} [joins?]
* @property {IKeyValuePair} keyField
* @property {IKeyValuePair} valueField
* @property {IFilter[]} [filters?]
* @property {boolean} [relaxMode?]
*/

/**
* @typedef {Object} IMultipleCreate
* @property {string} model
* @property {string[]} keys
* @property {string[][]} rows
*/

/**
* @typedef {Object} IDelete
* @property {string} model
* @property {IFilter[]} filter
*/

/**
* @typedef {Object} IProc
* @property {string} model
* @property {IKeyValuePair[]} parameters
*/

/**
  * @typedef {Object} IUpdate
  * @property {string} model
  * @property {IRow[]} row
  * @property {IFilter[]} filters
  */

/**
* @typedef {Object} ISelect
* @property {string} model
* @property {string[]} fields
* @property {IJoin[]} [joins=[]]
* @property {IFilter[]?} [filters=[]]
* @property {number} [limit=100]
* @property {ISort} [sortby]
* @property {IGroup} [groupby]
*/


/**
 * @typedef {Object} IMail
 * @property {Array<string>} to
 * @property {string} subject
 * @property {string} text
 * @property {string} html
 * @property {Array<string>} [cc?] 
 */

export { }