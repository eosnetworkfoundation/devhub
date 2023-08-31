import {User, UserUpdatableFields} from "@eosn/devhub-structures/user";
import Errors, {CustomError} from "../util/errors";
import ORM from "../util/orm";
import {sha256} from "eosjs-ecc";
import {FireAuth} from "../util/firebase";

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
        if(!body) return Errors.invalidUserCreateRequest();

        const { token } = body;
        if(!token || !token.length) return Errors.invalidUserCreateRequest();

        try {
            const decodedToken = await FireAuth.decodeToken(token);

            if(decodedToken === "expired_token") {
                return Errors.invalidUserCreateRequest('expired_token');
            }

            let {
                uid,
                name,
                picture,
                email,
                firebase,
            } = decodedToken;

            if(!name) name = `User-${Math.round(Math.random() * 1000000000000)}`;
            if(!picture) picture = '';

            if(!uid || !uid.length) return Errors.invalidUserCreateRequest('invalid_uid');

            if(!firebase) return Errors.invalidUserCreateRequest('invalid_firebase');

            const {
                sign_in_provider,
            } = firebase;

            if(!sign_in_provider || !sign_in_provider.length) return Errors.invalidUserCreateRequest('invalid_sign_in_provider');
            if(!['google.com', 'github.com'].includes(sign_in_provider)) return Errors.invalidUserCreateRequest('invalid_sign_in_provider');

            const id = this.subToUserID(uid);

            const existingUser = await this.get(id);
            if(existingUser) return existingUser;


            const user = new User({
                id,
                email,
                name,
                created_at:+new Date(),
                graphics:{ avatar: picture || null },
            });

            if(!await ORM.upsert(user)) {
                return Errors.databaseError();
            }

            return user;
        } catch (e:any) {
            console.error(e);
            return Errors.invalidUserCreateRequest(e.message);
        }
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

        if(!await ORM.upsert(user)) return Errors.databaseError();

        return user;
    }

}
