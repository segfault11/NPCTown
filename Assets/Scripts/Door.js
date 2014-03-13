private var isDoor : boolean;

function Start () {
    var doorName : String = PlayerPrefs.GetString("DoorName", "begin");
    var startPoint : GameObject = GameObject.Find("SP_" + doorName);
    if (doorName != "begin") {
    	var door : GameObject = GameObject.Find(doorName);
    } 
	transform.position = startPoint.transform.position;
}

function Update () {
	var hit : RaycastHit;
	if ( Physics.Raycast (transform.position, transform.TransformDirection(Vector3.forward), hit, 3) && hit.collider.tag == "Door") {
		isDoor = true;
	} else {
		isDoor = false;
	}
	
	if (isDoor && (Input.GetKeyUp(KeyCode.E) || Input.GetKeyUp(KeyCode.Return))) {
		PlayerPrefs.SetString("DoorName", hit.collider.name);
		PlayerPrefs.SetString("LastScene", Application.loadedLevelName);
		Application.LoadLevel("Loading");
	}
}

function OnGUI () {
	if (isDoor) {
		GUI.Button(new Rect(Screen.width / 2 - 50, Screen.height / 2 - 25, 100, 50), "<size=30><color=yellow>E</color></size><size=20>nter</size>");
	}
}
