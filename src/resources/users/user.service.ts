class UserService{
    private user:any ='UserModel'

    /**
     * create a new user
    */
   public async create(title:string,body:string):Promise<void>{
    try{
        const user = await this.user.create({title,body})
            return user
    }catch(err){
        throw new Error('Unable to create user')
    }
   }
}
export default UserService