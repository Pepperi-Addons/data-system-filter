export type PermissionSetValues = "Sync" | "Online"; // default is "Sync"

/**
 * Key?: string; - Key of the basic filter object (UUID)
 * 
 * Resource: string; - Name of the resource referenced by the basic filter object's "Field" field
 */
export interface BasicFilterRuleData {
    Resource: string,
    Key: string
}
