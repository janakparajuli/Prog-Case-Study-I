/*Name: Janak Parajuli (al393628)
Subject: Programming (2019/2020)
Case Study I*/

//Define a generic class called Mission with:
//id of the mission (mandatory)
//coordinator’s name (mandatory)
class Mission{
    constructor(missionID, coordinatorName){
        //Check whether string and numbers are within the rules.
        this._missionID = (missionID>0)?missionID:"No, Negatives Por Favor!";
        // this._missionID = Math.abs(missionID);
        this._coordinatorName = (coordinatorName.length<128)?coordinatorName:"Please, enter the name within 128 characters";
    }
    //Define the getters methods only.
    //Setters are not required for this purpose
    get missionID(){
        return this._missionID;
    }
    get coordinatorName(){
        return this._coordinatorName;
    }
}
//Define a class called Action with the following properties:
// the name of the OCHA staff in that place (mandatory)
// the description of the humanitarian action (mandatory)
// whether the humanitarian action is over or not in that place (default value = false)
// total number of (local) people affected (default value = 0)
class Action{
    constructor(staffName, actionDescription, isActionOver=false, affectedPeople = 0){
        //Check whether the string length is within 128 chars.
        this._staffName = (staffName.length<128)?staffName:'Please, enter the name within 128 characters';
        this._actionDescription = actionDescription;
        this._isActionOver = isActionOver;
        //Check whether num of people is non-negative
        this._affectedPeople = (affectedPeople>=0)?affectedPeople:"No, Negatives Por Favor!";
    }
    //Define the getters and setters of Action class
    get staffName(){
        return this._staffName;
    }
    get actionDescription(){
        return this._actionDescription;
    }
    get isActionOver(){
        return this._isActionOver;
    }
    set isActionOver(actionOver){
        this._isActionOver = actionOver;
    }
    get affectedPeople(){
        return this._affectedPeople;
    }
    set affectedPeople(noOfAffectedPeople){
        //Check whether the number of people is non-negative.
        this._affectedPeople = (noOfAffectedPeople>=0)?noOfAffectedPeople:"No, Negatives Por Favor!";
    }
}

//Define a class called Syrian Mission which implements the Mission class and add the following information:
//name of the country where the mission is deployed (mandatory, default value = ‘syria’)
//start date (default value)
//end date (default value)
class SyrianMission extends Mission{
    //Provide default country name as 'Syria', default start date as of now and end date as 30 days from now.
    constructor(missionID, coordinatorName, countryName = "Syria", startDate = new Date(), endDate = new Date((Date.now()+2592000000))){
        super(missionID, coordinatorName);
        this._countryName = countryName;
        this._startDate = startDate;
        this._endDate = endDate;
        //Define an array to add actions.
        this._addAction = [];
    }
    //Define getters and setters for Syrian Mission
    get countryName(){
        return this._countryName;
    }
    get startDate(){
        return this._startDate;
    }
    set startDate(sDate){
        this._startDate = sDate;
    }
    get endDate(){
        return this._endDate;
    }
    set endDate(eDate){
        this._endDate = eDate;
    }
    //Define required functions
    //Define addAction function to add the actions.
    addAction(anAction){
        return "The actions: "+this._addAction.push(anAction);
    }
    //Define getActiveActions function, which generates an array of actions that are not over
    getActiveActions(){
        let action, activeAction = [];
        this._addAction.forEach(element => {
            !(element.isActionOver)?activeAction.push(element):null;
        });
        return activeAction;
    }
    //Define getInactiveActions function, which generates an array of actions that are over.
    getInActiveActions(){
        let inActiveAction = [];
        this._addAction.forEach(action => {
            action.isActionOver?inActiveAction.push(action):null;
        });
        return inActiveAction;
    }
    // Calculate the number of people affected by the mission.
    //For in loop is used this time.
    sumPeopleAffected(){
        let action, counter = 0;
        for(action in this._addAction){
            if(this._addAction[action].isActionOver==true){
                counter= counter+ this._addAction[action].affectedPeople;
           }
        }
        return counter;
    }
    // Define showActions function, which iterates over an array of Actions provided as input parameter and shows the staff name
    // and description of each action.
    showActions(actionOver){
        let actions = ``;
        actionOver.forEach(action => {
            actions = actions + "Action led by "+action.staffName+" on: "+action.actionDescription + '\n';
        });
        return actions;
    }
}
//Initiate the objects of Action class. Here four objects are created
var a1 = new Action("Paul","Goal One: Good health and well-being", false,2);
var a2 = new Action("John","Goal Two: Clear water and sanitation");     //false
var a3 = new Action("Maria","Goal Three: Quality education", true,10);
var a4 = new Action("Ganesh","Goal Four: Personal Hygiene");

a2.affectedPeople = 5;          //Add the number of affected people in object a2.
a2.isActionOver = !(a2.isActionOver);       //Set the action as completed i.e isActionOver is true.

var syria = new SyrianMission(1,"Dr. Ada");     //Declare a Syrian Mission object.
//Add the above four actions to object syria
syria.addAction(a1);
syria.addAction(a2);
syria.addAction(a3);
syria.addAction(a4);
//Find which missions are completed and which are not.
let inactiveActions, activeActions = [];
inactiveActions = syria.getInActiveActions();
activeActions = syria.getActiveActions();
//Display Incomplete Actions
console.log(`Active actions: ${activeActions.length}`);
console.log(syria.showActions(activeActions));

//Display Completed Actions
console.log(`Inactive actions: ${inactiveActions.length}`);
console.log(syria.showActions(inactiveActions));
//Calculate the total number of people affected in the action completed areas.
console.log(`Total number of people affected: ${syria.sumPeopleAffected()}`);