// @Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
//@--------------------------------Point------------------------------------@//
export class Entity{
    static IdCounter = 0;
    constructor(){
        //* new properties
        this._id = "TEMP_UNINITIALIZED_ENTITY_"

        /** /// Ignore switches
         **  to prevent:
         **  - using outdated functions,
         **  - spam in console
         **  - calling the initializeFunc more than onces
         */
        this._ignoreInitOf = {};
        this._ignoreLogsOf = {};
        this._ignoreWarnsOf = {};
        this._ignoreErrsOf = {};

        let proto = this;
        while (proto) {
            const name = proto.constructor.name;
            if (!(name in this._ignoreInitOf)) {
                this._ignoreWarnsOf[name] = false; 
                this._ignoreInitOf[name]  = true ;
                this._ignoreLogsOf[name]  = false;
                this._ignoreErrsOf[name]  = false;
            }
            proto = Object.getPrototypeOf(proto);
        }
        this._ignoreInitOf[this.constructor.name] = false;

        if (!(this._ignoreInitOf["Entity"]))this._initializeFunc();
    }
    //@---privateFunctions---@//
    /** /// _copyPropsTo() ///
     ** all new properties of Entity to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @returns {void} 
     */
    _copyPropsTo(target){
        target._ignoreInitOf  = {...this._ignoreInitOf };
        target._ignoreLogsOf  = {...this._ignoreLogsOf };
        target._ignoreErrsOf  = {...this._ignoreErrsOf };
        target._ignoreWarnsOf = {...this._ignoreWarnsOf};
        target._id = "TEMP_UNINITIALIZED_CLONE_OF_" + this._id;
    }
    
    /** /// _initializeFunc() ///
     * * all operation called in constructor, used for cloning
     * @private
     * @return {void}
     */
    _initializeFunc(){
        //console.log(this.constructor.name);
         if (this._id === undefined || this._id?.startsWith("TEMP")) {
            this._id =  Entity.IdCounter.toString().padStart(4, '0');
            Entity.IdCounter++;
        }
    }

    /** /// _logs() ///
     ** logs in console with the entity's class and id as prefix
     ** can be muted with the _ignoreLogsOf switch
     * @private
     * @param {string} message to log
     * @returns {void}
     */
    _logs(message){
        if (!this._ignoreLogsOf[this.constructor.name]){
            console.log(this.constructor.name + "(" + this._id + "): " + message);
        }
    }

    /** /// _warns() ///
     ** warns in console with the entity's class and id as prefix
     ** can be muted with the _ignoreWarnOf switch
     * @private
     * @param {string} message to warn
     * @returns {void}
     */
    _warns(message){
        if (!this._ignoreWarnsOf[this.constructor.name]){
            console.warn(this.constructor.name + "(" + this._id + "): " + message);
        }
    }

    /** /// _errs() ///
     ** throws error in console with the entity's class and id as prefix
     ** can be muted with the _ignoreErrOf switch
     * @private
     * @param {string} message to error
     * @returns {void}
     */
    _errs(message){
        if (!this._ignoreErrsOf[this.constructor.name]){
            console.error(this.constructor.name + "(" + this._id + "): " + message);
        }
    }


    //@---publicFunctions---@//
    /** /// clone() ///
     ** creates a clone of this without using constructor so _copyParamsTo() needed
     * @final
     * @param {boolean} deep - shared media
     * @returns {ThisParameterType} cloned entity
     */
    clone(deep = false){
        const clone = Object.create(this.constructor.prototype);
        clone._isDeepClone = deep;

        this._copyPropsTo(clone);
        clone._initializeFunc();

        return clone;
    }

    //@---setters---@//
    set id (newId){
        this._errs("ID is read-only and auto-generated, cannot be set manually");
    }
}
//@------------------------------helpFunc-----------------------------------@//
//@------------------------------examples-----------------------------------@// 
/*---------------------------------------------------------------------------
const e = new Entity();
const b = e.clone();
console.log(    e._id, b._id);
/** */

