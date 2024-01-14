type FriendList=string[]
export interface SetUserParam{
    username:string;
    password:string;
    created_at?:string;
    updated_at?:string;
    friends?:string
}
export interface UserInfo extends SetUserParam{
    id:number
}