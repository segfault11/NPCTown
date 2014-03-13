private var doorName : String;
private var lastScene : String;
private var nextScene : String;

function Start () {
	doorName = PlayerPrefs.GetString("DoorName");
	lastScene = PlayerPrefs.GetString("LastScene");
	
	// tavern - town (2 doors)	
	if (doorName == "Tavern door 1" && lastScene == "NPCtown") 
		nextScene = "tavern_interior";
	else if (doorName == "Tavern door 1" && lastScene == "tavern_interior")
		nextScene = "NPCtown";
	else if (doorName == "Tavern door 2" && lastScene == "NPCtown")
		nextScene = "tavern_interior";
	else if (doorName == "Tavern door 2" && lastScene == "tavern_interior")
		nextScene = "NPCtown";
}

function Update () {
	Debug.Log (Application.GetStreamProgressForLevel(nextScene));
	if(Application.GetStreamProgressForLevel(nextScene) == 1){
	    Application.LoadLevel(nextScene);
	}
}