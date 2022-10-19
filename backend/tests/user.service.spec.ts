import UserService from "../src/services/user.service";
import { assert } from 'chai';

import ORM from "../src/util/orm";
import {User, UserUpdatableFields, Graphics} from "@eosn/devhub-structures/user";

import {sha256} from 'eosjs-ecc';

const auth0UserData = {
    key: process.env.USER_CREATE_KEY,
    user:{
        email: 'test@test.com',
        name: 'Test User',
        user_id: '12345'
    }
};

describe('User service tests', () => {
    it('should clear the database', async () => {
        await ORM.clearDatabase();
    });

    it('should be able to create a user', async () => {
        const user = await UserService.create(auth0UserData);
        assert(user instanceof User, "Did not create a user");
        assert(user.id === sha256(auth0UserData.user.user_id), "User did not have correct ID");
        assert(user.email === auth0UserData.user.email, "User did not have correct email");
        assert(user.name === auth0UserData.user.name, "User did not have correct name");
    });

    it('should be able to get a user', async () => {
        const id = sha256(auth0UserData.user.user_id);
        const user = await UserService.get(id);
        assert(user instanceof User, "Did not get a user");
        assert(user.id === id, "User did not have correct ID");
    });


    it('should be able to update a user', async () => {
        const data:UserUpdatableFields = {
            name: 'newname',
            email: 'c@ts.com',
            avatar: 'test',
            linked_accounts: [{
                network: 'test',
                account: 'test',
            }]
        }

        let user = await UserService.updateUser(sha256(auth0UserData.user.user_id), data);
        assert(user instanceof User, "Did not create a user");
        assert(user.id === sha256(auth0UserData.user.user_id), "User did not have correct ID");
        assert(user.name === data.name, "User did not have correct name");
        assert(user.email === data.email, "User did not have correct email");
        assert(user.graphics.avatar === data.avatar, "User did not have correct graphics");
        assert(user.linked_accounts[0].network === (<any>data.linked_accounts)[0].network, "User did not have correct linked accounts");


        user = await UserService.updateUser(sha256(auth0UserData.user.user_id), {
            name: null,
            email: null,
            avatar: 'test2',
            linked_accounts: [{
                network: 'test2',
                account: 'test2',
            }]
        });
        assert(user instanceof User, "Did not create a user");
        assert(user.name === data.name, "User did not have correct name");
        assert(user.email === data.email, "User did not have correct email");
        assert(user.graphics.avatar === 'test2', "User did not have correct graphics");
        assert(user.linked_accounts[0].network === 'test2', "User did not have correct linked accounts");
    });
});
