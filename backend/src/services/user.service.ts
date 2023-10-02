import {User, UserUpdatableFields} from "@eosn/devhub-structures/user";
import Errors, {CustomError} from "../util/errors";
import ORM from "../util/orm";
import {sha256} from "eosjs-ecc";

export default class UserService {

    static subToUserID(sub:string):string {
        return sha256(sub);
    }

    static async get(user_id:string): Promise<User | null> {
        const user = await ORM.get(User.key(user_id), User);
        if(!user) return null;
        return <User>user;
    }

    static async create(body:any): Promise<User | CustomError>{
        if(!body.hasOwnProperty('key') || !body.key) return Errors.invalidUserCreateRequest();
        if(!body.hasOwnProperty('user') || !body.user) return Errors.invalidUserCreateRequest();
        if(body.key !== process.env.USER_CREATE_KEY) return Errors.invalidUserCreateRequestKey();

        const data = body.user;
        if(!data.user_id || !data.email || !data.name) return Errors.invalidUserCreateRequest();
        const user_id = this.subToUserID(data.user_id);
        if(await this.get(user_id)) return Errors.userExists();

        const user = new User({
            id:user_id,
            email:data.email,
            name:data.name,
            created_at:+new Date(),
            graphics:{ avatar: data.picture || null },
        });

        if(!await ORM.update(user)) return Errors.databaseError();

        return user;
    }

    static async updateUser(user_id:string, data:UserUpdatableFields): Promise<User | CustomError>{
        const user = await this.get(user_id);
        if(!user) return Errors.noSuchUser();

        if(data.hasOwnProperty('name') && !!data.name) {
            if(typeof data.name !== "string")
                return Errors.invalidUserUpdateRequest('name_must_be_string');
            if(data.name.length > 50)
                return Errors.invalidUserUpdateRequest('name_too_long');
            if(data.name.length < 5)
                return Errors.invalidUserUpdateRequest('name_too_short');

            user.name = data.name;
        }
        if(data.hasOwnProperty('email') && !!data.email) {
            if(!/^\S+@\S+\.\S+$/.test(data.email))
                return Errors.invalidUserUpdateRequest('email_invalid');

            user.email = data.email;
        }
        if(data.hasOwnProperty('linked_accounts') && !!data.linked_accounts) {
            for(let acc of data.linked_accounts) {
                if(typeof acc !== "object")
                    return Errors.invalidUserUpdateRequest('linked_accounts_invalid_format');
                if(!acc.hasOwnProperty('network') || !acc.hasOwnProperty('account'))
                    return Errors.invalidUserUpdateRequest('linked_accounts_invalid_format');
                if(typeof acc.network !== "string" || !acc.network.length)
                    return Errors.invalidUserUpdateRequest('linked_accounts_invalid_network');
                if(typeof acc.account !== "string" || !acc.account.length)
                    return Errors.invalidUserUpdateRequest('linked_accounts_invalid_account');
            }

            user.linked_accounts = data.linked_accounts;
        }
        if(data.hasOwnProperty('avatar') && !!data.avatar) {
            if(typeof data.avatar !== "string" || !data.avatar.length)
                return Errors.invalidUserUpdateRequest('avatar_invalid');

            user.graphics.avatar = data.avatar;
        }

        if(!await ORM.update(user)) return Errors.databaseError();

        return user;
    }

}
