import { Client, Request } from '@pepperi-addons/debug-server'
import { Collection, FilterObject } from '@pepperi-addons/papi-sdk';
import { FilterObjectService } from './services/filter-object.service';
import { FilterRuleService } from './services/filter-rule.service';

export async function get_resources(client: Client, request: Request): Promise<Collection[]> {
    const filterObjectService = new FilterObjectService(client);
    try {
        const resources: Collection[] = await filterObjectService.getResources();
        return resources;
    }
    catch (ex) {
        console.error(`Error in get_resources: ${ex}`);
        throw new Error((ex as { message: string }).message);
    }
}

export async function get_filters_by_keys(client: Client, request: Request): Promise<FilterObject[]> {
    const filterObjectService = new FilterObjectService(client);
    try {
        console.log(`start get_filters_by_keys request. body - ${JSON.stringify(request.body)}`);
        const filterObjectKeys = request.body.KeyList as string[];
        const result = await filterObjectService.getByKeys(filterObjectKeys);
        console.log(`end get_filters_by_keys request. result - ${JSON.stringify(result)}`);
        return result;
    }
    catch (ex) {
        console.error(`get_filters_by_keys failed. error - ${ex}`);
        throw new Error((ex as { message: string }).message);
    }
}


export async function filters_delete(client: Client, request: Request) {
    const filterObjectService = new FilterObjectService(client);
    try {
        if (request.method === 'POST') {
            console.log(`start delete_filters request. body - ${JSON.stringify(request.body)}`);
            const filterObjectKeys = request.body.Keys as string[];
            const result = await filterObjectService.delete(filterObjectKeys);
            console.log(`end delete_filters request. result - ${JSON.stringify(result)}`);
            return result;
        }

        else {
            throw new Error(`Unsupported request method: ${request.method}`);
        }
    }
    catch (ex) {
        console.error(`delete_filters failed. error - ${ex}`);
        throw new Error((ex as { message: string }).message);
    }
}

export async function profile_filters_delete(client: Client, request: Request) {
    const filterRuleService = new FilterRuleService(client);
    try {
        if (request.method === 'POST') {
            console.log(`start delete_profile_filters request. body - ${JSON.stringify(request.body)}`);
            const filterRuleKeys = request.body.Keys as string[];
            const result = await filterRuleService.delete(filterRuleKeys);
            console.log(`end delete_profile_filters request. result - ${JSON.stringify(result)}`);
            return result;
        }

        else {
            throw new Error(`Unsupported request method: ${request.method}`);
        }
    }
    catch (ex) {
        console.error(`delete_profile_filters failed. error - ${ex}`);
        throw new Error((ex as { message: string }).message);
    }
}