class Player{

    constructor(name, role){

        this._name = name;
        this._role = role;
    }

    get name(){
        return this._name;
    }

    get role(){
        return this._role;
    }

    set name(name){
        this._name = name;
    }

    set role(role){
        this._role = role;
    }

}

module.exports = Player;