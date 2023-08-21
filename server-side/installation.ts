
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, errorMessage:{the reason why it is false}}
The error Message is important! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server';
import { BasicFilterRuleData } from '../shared/types';
import { FilterObjectService } from './services/filter-object.service';
import { FilterRuleService } from './services/filter-rule.service';
import { RelationsService } from './services/relations.service';
import semver from 'semver';

export async function install(client: Client, request: Request): Promise<any> {
    try {
        const relationService = new RelationsService(client);
        const filterObjectService = new FilterObjectService(client);
        const filterRuleService = new FilterRuleService(client);

        await filterObjectService.createSchema();
        await filterRuleService.createSchema();
        await relationService.upsertRelations();

        // upsert default Filters and Profile-filters
        const basicFilterRuleData: BasicFilterRuleData[] = await filterObjectService.upsertBasicFilterObjects();
        await filterRuleService.upsertBasicFilterRules(basicFilterRuleData);
    } catch (err) {
        throw new Error(`installation failed. error - ${err}`);
    }

    return { success: true, resultObject: {} };
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return { success: true, resultObject: {} }
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    try {
        console.log(`upgrade from version ${request.body.FromVersion} to version ${request.body.ToVersion}`);
        // if we are upgrading from version < 0.0.56, we need to update the FilterRules permissionSet and schema
        //if (request.body.FromVersion && semver.compare(request.body.FromVersion, '0.0.56') < 0) {
        const filterRuleService = new FilterRuleService(client);
        await filterRuleService.createSchema();
        await filterRuleService.upsertPermissionSet();
        //}
        const relationService = new RelationsService(client);
        await relationService.upsertRelations();

        // upsert default Filters and Profile-filters
        const filterObjectService = new FilterObjectService(client);
        const basicFilterRuleData: BasicFilterRuleData[] = await filterObjectService.upsertBasicFilterObjects();
        await filterRuleService.upsertBasicFilterRules(basicFilterRuleData);
        
        return { success: true, resultObject: {} }

    }
    catch (ex) {
        console.error(`upgrade failed. error - ${ex}`);
        throw ex;
    }
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return { success: true, resultObject: {} }
}


