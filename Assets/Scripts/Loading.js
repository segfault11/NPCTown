private var doorName : String;
private var lastScene : String;
private var nextScene : String;

function Start () {
	doorName = PlayerPrefs.GetString("DoorName");
	lastScene = PlayerPrefs.GetString("LastScene");
	
	// tavern - town (2 doors)	
	if (doorName == "Tavern door 1" && lastScene == "Lothbrok Alpha Scene 01") 
		nextScene = "tavern_interior";
	else if (doorName == "Tavern door 1" && lastScene == "tavern_interior")
		nextScene = "Lothbrok Alpha Scene 01";
	else if (doorName == "Tavern door 2" && lastScene == "Lothbrok Alpha Scene 01")
		nextScene = "tavern_interior";
	else if (doorName == "Tavern door 2" && lastScene == "tavern_interior")
		nextScene = "Lothbrok Alpha Scene 01";
		
	// castle - town (1 doors)
	if (doorName == "Castle door" && lastScene == "Lothbrok Alpha Scene 01") 
		nextScene = "castle_hall";
	else if (doorName == "Castle door" && lastScene == "castle_hall")
		nextScene = "Lothbrok Alpha Scene 01";
}

function Update () {
	Debug.Log (nextScene);
	if(Application.GetStreamProgressForLevel(nextScene) == 1){
	    Application.LoadLevel(nextScene);
	}
}