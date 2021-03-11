import {GenericDatabaseManager} from './DatabaseManager';
import {SearchParam} from "./DBSerializer/DatabaseMetaInterface";
import { v4 as uuid } from "uuid"

/**
 * Mock Implementation of the Database Manager to be used by tests
 */
class MockDatabaseManager extends GenericDatabaseManager {
    protected db: Map<any, any>;

    constructor(){
        super();
        this.db = new Map();
    }

    /**
     * Save an object into the database, return its primary key if defined
     * @param obj object to store
     * @param targetClass object class
     */
    async genericCreate(obj: any, targetClass: new () => any): Promise<string> {
        throw new Error("genericCreate should be invoked by subclasses");
    }

    /**
     * Load an object from the database with the given primary key
     * @param pk key to search with
     * @param targetClass expected object class
     */
    async genericRead(pk: string, targetClass: new () => any): Promise<any> {
        throw new Error("genericRead should be invoked by subclasses");
    }

    /**
     * Load all objects matching the search criteria
     * @param targetClass expected object class
     * @param searchParam seach query (**the queries should be built within the server**)
     * @param partial whether or not the complete object structure should be rebuild
     */
    async genericSearch(targetClass: new () => any, searchParam: SearchParam, partial: boolean): Promise<any> {
        throw new Error("genericSearch should be invoked by subclasses");
    }

    /**
     * Delete an object from the database with the given primary key
     * @param pk key to search with
     * @param targetClass object class
     */
    async genericDelete(pk: string, targetClass: new () => any): Promise<string | undefined> {
        throw new Error("genericDelete should be invoked by subclasses");
    }
}