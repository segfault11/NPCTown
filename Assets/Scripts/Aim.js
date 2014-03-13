#pragma strict
var HipPose : Vector3;
var AimPose : Vector3;
private var MainCam : GameObject;

function Start () {
	transform.localPosition = HipPose;
	MainCam = GameObject.FindGameObjectWithTag("MainCamera");
}

function Update () {
	if(Input.GetButton("Fire2")){
		transform.localPosition = AimPose;
		MainCam.camera.fieldOfView = 40;
	} else {
		transform.localPosition = HipPose;
		MainCam.camera.fieldOfView = 60;
	}
}