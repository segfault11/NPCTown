var aiDetectionRange : float;
private var target : GameObject;
private var headLook : Component;

function Start () {
	target = GameObject.FindWithTag("Player");
	headLook = GetComponent(HeadLookController);
}

function Update () {
	distance = Vector3.Distance(target.transform.position, transform.position);
	
	if (distance > aiDetectionRange)
		headLook.enabled = false;
	else
		headLook.enabled = true;
}