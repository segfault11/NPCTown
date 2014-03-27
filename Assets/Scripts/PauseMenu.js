private var windowRect : Rect;
private var pause : boolean = false;
private var sleep : boolean = true;
private var player : GameObject;
private var mainCamera : GameObject;
private var candleFlame : GameObject;
private var mouseLook : Component[];
private var aim : Component[];
private var candleAnime : Component[];
private var bgm : AudioClip;

function Start () {
	Screen.lockCursor = true;
	windowRect = new Rect(Screen.width / 2 - 80, Screen.height / 2 - 110, 160, 220);
	player = GameObject.FindWithTag("Player");
	mainCamera = GameObject.FindWithTag("MainCamera");
	candleFlame = GameObject.Find("Candle Flames");
}

function Update () {
	if (Input.GetKeyUp(KeyCode.Escape)) {
		if (pause) {
			pause = false;
		} else {
			pause = true;
		}
	}
	if (pause) {
		// disable mouselook
		for (var mouseLook in player.GetComponentsInChildren(MouseLook)) {
			mouseLook.enabled = false;
		}
		// disable weapon aim
		for (var aim in player.GetComponentsInChildren(Aim)) {
			aim.enabled = false;
		}
		// disable candle animation
		if (candleAnime != null) {
			for (var candleAnime in candleFlame.GetComponentsInChildren(AnimatedTextureUV)) {
				candleAnime.enabled = false;
			}
		}
		// mute music
		mainCamera.audio.mute = true;
		
		Screen.lockCursor = false;
		Time.timeScale = 0;
	} else {
		for (var mouseLook in player.GetComponentsInChildren(MouseLook)) {
			mouseLook.enabled = true;
		}
		for (var aim in player.GetComponentsInChildren(Aim)) {
			aim.enabled = true;
		}
		if (candleAnime != null) {
			for (var candleAnime in candleFlame.GetComponentsInChildren(AnimatedTextureUV)) {
				candleAnime.enabled = true;
			}
		}
		// mute music
		mainCamera.audio.mute = false;
		
		Screen.lockCursor = true;
		Time.timeScale = 1;
	}
}

function OnGUI () {
	if (pause) {
		windowRect = GUI.Window (0, windowRect, windowFunc, "<size=15>Pause</size>");
	}
}

function windowFunc (id) {
	if (GUILayout.Button("<size=20>RESUME</size>")) {
		pause = false;
	}
	if (GUILayout.Button("<size=20>SAVE</size>")) {
	}
	if (GUILayout.Button("<size=20>LOAD</size>")) {
	}
	if (GUILayout.Button("<size=20>OPTIONS</size>")) {
	}
	if (GUILayout.Button("<size=20>HELP</size>")) {
	}
	if (GUILayout.Button("<size=20>QUIT</size>")) {
		Application.Quit();
	}
}
