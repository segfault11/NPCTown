import SimpleJSON;

var audioClip : AudioClip[];
private var activity : String;
private var objectName : String;
private var lines : JSONNode;
private var subtitle : String;
private var timer : float;
private var subtitleTime : float = 5.0f;

function Start () {
    var doorName : String = PlayerPrefs.GetString("DoorName", "begin");
    var startPoint : GameObject = GameObject.Find("SP_" + doorName);
	transform.position = startPoint.transform.position;
	transform.rotation = startPoint.transform.rotation;
	
	// lines
	lines = JSON.Parse(Resources.Load("Lines", TextAsset).text);
}

function Update () {
	// subtitle time
	timer += Time.deltaTime;
	
	var hit : RaycastHit;
	if ( Physics.Raycast (transform.position, transform.TransformDirection(Vector3.forward), hit, 3)) {
		if (hit.collider.tag == "Door") {
			activity = "Open";
			objectName = hit.collider.name;
		} else if (hit.collider.tag == "NPCbody") {
			activity = "Talk";
			// NPC name
			objectName = hit.collider.transform.root.name;
		}
	} else {
		activity = null;
		objectName = null;
	}
	
	if (activity == "Open" && Input.GetKeyUp(KeyCode.E)) {
		PlayerPrefs.SetString("DoorName", objectName);
		PlayerPrefs.SetString("LastScene", Application.loadedLevelName);
		Application.LoadLevel("Loading");
	}
	
	if (activity == "Talk" && Input.GetKeyUp(KeyCode.E)) {
		if (lines[objectName] != null) {
			
			// if sound file exist
			var indexClip = new Array();
			for (var c = 0; c < audioClip.Length; c++) {
				if (lines[objectName][audioClip[c].name] != null) {
					indexClip.Push(c);
				}
			}
			// random line
			var i = Random.Range(0, indexClip.Count);
			
			// play sound
			if (indexClip.Count != 0) {
				hit.collider.transform.root.audio.clip = audioClip[indexClip[i]];
				hit.collider.transform.root.audio.Play();
			}
			
			// show subtitle
			subtitle = lines[objectName][audioClip[indexClip[i]].name];
			timer = 0;
		}
	}
	
	if (timer > subtitleTime)
		subtitle = null;
				
}

function OnGUI () {
	var centeredStyle = GUI.skin.GetStyle("Label");
    centeredStyle.alignment = TextAnchor.UpperCenter;
    
	if (activity != null) {
		if (activity == "Talk")
			GUI.Label(new Rect(Screen.width / 2 - 100, Screen.height / 2 + 20, 200, 40), "<size=25><b>" + objectName + "</b></size>", centeredStyle);
		GUI.Button(new Rect(Screen.width / 2 - 40, Screen.height / 2 + 70, 30, 30), "<size=18>E</size>");
		GUI.Label(new Rect(Screen.width / 2 - 5, Screen.height / 2 + 70, 50, 30), "<size=20>" + activity + "</size>");
	}
	if (subtitle != null) {
		GUI.Label(new Rect(100, Screen.height - 300, Screen.width - 200, 100), "<size=30>" + subtitle + "</size>", centeredStyle);
	}
}
