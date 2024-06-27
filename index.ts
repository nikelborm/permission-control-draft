// I'll give an example. Forget about actions.

// There is abstract actor type called "User".
// There are abstract permissions: "CRUD permission",  "Create permission",  "Read permission",  "Update permission",  "Delete permission". "CRUD permission" has as its children: "Create permission",  "Read permission",  "Update permission",  "Delete permission". It means anyone who gets instance of "CRUD permission" automatically has all nested permissions. 
// There is abstract resource type called "Document".
// There is relation called "User can have CRUD permission" between abstract actor "User" and abstract permission "CRUD permission" that shows that instances of specific type of actors may or may not have specific instances of permission.

// There is "User A" (actor instance) of actor type "User". 

// есть инстансы акторов, есть абстрактные типы акторов (которые могут быть также обобщением над абстрактными типами акторов)
// есть инстансы акшнов, есть абстрактные типы акшнов (которые могут быть также обобщением над абстрактными типами акшнов)
// есть инстансы пермижнов, есть абстрактные типы пермижнов (которые могут быть также обобщением над абстрактными типами пермижнов)
// есть инстансы ресурсов, есть абстрактные типы ресурсов (которые могут быть также обобщением над абстрактными типами ресурсов)


// инстанс актора ссылается на


abstract class Toolbox {
    constructor(config: {}) {}
//    tokenToImplementationStore: {
//        [token:string]: AbstractActorType | AbstractPermissionType | AbstractActionType | AbstractResourceType
//    }
// и когда создаются релейшны, можно через instanceof проверить является ли permissionToken скажем инстансом пермижна. А если его пока нет в сторе, то кидаем отложенную проверку

    abstract get actorManager(): ActorManager
    abstract get actionManager(): ActionManager
    abstract get permissionManager(): PermissionManager
    abstract get resourceManager(): ResourceManager

    abstract delayedChecks: ([
        validationFunction: (toolbox: Toolbox) => void,
        errorContext: Record<string, any>
    ])[]

    abstract finishConfigurationAndMakeFinalTreeValidation(): void
}










abstract class ActorManager {
    abstract registerActor(actor: {
        serializationToken: string,
        humanReadableName: string
    }): AbstractActorType

    // abstract registerActors(actors:...[]): AbstractActorType[]

    abstract createActorParenthood(relation: {
        parentToken: string,
        childToken: string
    }): AbstractActorType
}



abstract class ActionManager {
    abstract registerAction(action: {
        serializationToken: string,
        humanReadableName: string
    }): AbstractActionType

    // abstract registerActions(actions:...[]): AbstractActionType[]

    abstract createActionParenthood(relation: {
        parentToken: string,
        childToken: string
    }): AbstractActionType
}



abstract class PermissionManager {
    abstract registerPermission(permission: {
        serializationToken: string,
        humanReadableName: string
    }): AbstractPermissionType

    // abstract registerPermissions(permissions:...[]): AbstractPermissionType[]

    abstract createPermissionParenthood(relation: {
        parentToken: string,
        childToken: string
    }): AbstractPermissionType
}



abstract class ResourceManager {
    abstract registerResource(resource: {
        serializationToken: string,
        humanReadableName: string
    }): AbstractResourceType

    // abstract registerResources(resources:...[]): AbstractResourceType[]

    abstract createResourceParenthood(relation: {
        parentToken: string,
        childToken: string
    }): AbstractResourceType
}



abstract class RelationManager {
    abstract allowActorToHavePermission(params: {
        actorToken: string
        permissionToken: string
    }): void

    abstract allowActionToBeDoneWithResource(params: {
        actionToken: string
        resourceToken: string
    }): void


}





abstract class AbstractPermissionTypeSchemaValidator {
    abstract isSchemaValid(): boolean
}

declare function buildZodSchemaValidator(): AbstractPermissionTypeSchemaValidator




class LibInternalManager {}



// "User", "authorized application"
abstract class AbstractActorType {
    constructor(private internalManagerReference: LibInternalManager) {}
    abstract get leaves(): AbstractActorType[]
    abstract serializationToken: string;
}
abstract class ActorInstance {
    abstract instanceOf: AbstractActorType;
}


// "CRUD permission", "authorized application"
abstract class AbstractPermissionType {
    constructor(private internalManagerReference: LibInternalManager) {}
    abstract get leaves(): AbstractPermissionType[]
    abstract serializationToken: string;
    abstract schemaValidator: AbstractPermissionTypeSchemaValidator
}
abstract class PermissionInstance {
    abstract instanceOf: AbstractPermissionType;
}




abstract class ActionOnResource {}



// главный вопрос жизни и смерти: что есть действие, что есть пермижн?
// Это одно и то же?
// или пермижны связаны с абстрактными действиями?
// или пермижны связаны с действиями привязанными к ресурсам?
// нужна ли действиям вложенная структура? И что делать, если действия рекурсивны?
// нужна ли пермижнам вложенная структура?


// "Create", "Read", "Update", "Delete", 
abstract class AbstractActionType {
    constructor(private internalManagerReference: LibInternalManager) {}
    abstract get leaves(): AbstractActionType[]
    abstract serializationToken: string;
}
abstract class ActionInstance {
    abstract instanceOf: AbstractActionType;
}


// "Document", "User"
abstract class AbstractResourceType {
    constructor(private internalManagerReference: LibInternalManager) {}
    abstract get leaves(): AbstractResourceType[]
    abstract serializationToken: string;
}
abstract class ResourceInstance {
    abstract instanceOf: AbstractResourceType;
}
