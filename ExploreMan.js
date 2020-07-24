class mainCharacter{
    constructor(a,b,c,d){
        this.name = a; //string
        this.health = b; //int
        this.maxHealth = b; //int
        this.manaMax = c; //int 
        this.deck = d; //list of cards
    }
    setMaxMana(a){
        this.manaMax = a;
    }
    setMaxHealth(a){
        this.maxHealth = a;
    }
    reduceHealth(a){
        this.health -= a;
        if (this.health <= 0){
            return false;
        }
        return true;
    }
    healHealth(a){
        this.health = Math.min(this.health+a,this.maxHealth);
    }

}

class card{
    constructor(a,b,c,d){
        this.name = a; //string
        this.mana = b; //mana
        this.description = c; //string
        this.action = d; //????
    }
}

