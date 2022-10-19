export interface Graphics {
    avatar:string;
}

export interface NetworkAccount {
    network:string;
    account:string;
}

export class UserUpdatableFields {
    public name:string|null = null;
    public email:string|null = null;
    public avatar:string|null = null;
    public linked_accounts:Array<NetworkAccount>|null = null;
}

export class User {
    public doc_type:string = "user";
    public created_at:number = 0;

    // Static data
    public id:string = "";
    public name:string = "";

    // Incremental data
    public experience:number = 0;
    public completed_courses:number = 0;
    public graphics:Graphics = { avatar: "" };
    public linked_accounts:Array<NetworkAccount> = [];

    // Removed for public visibility.
    public email:string = "";

    public constructor(json?:Partial<User>) {
        (<any>Object).assign(this, json);
    }

    static key(id:string){ return `user::${id}`; }
    key(){ return User.key(this.id); }

    asPublic(){
        const clone = JSON.parse(JSON.stringify(this));
        delete clone.email;
        return clone;
    }
}
