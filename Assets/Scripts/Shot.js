#pragma strict

var crossbow_front : Transform;
var ArrowPrefab: GameObject;

var isCreated : boolean;
var countDown: float;
var timer : float;

function Start () {
}

function Update () {
	timer += Time.deltaTime;
	
	if (!isCreated && timer > countDown) {
		// create the arrow
		var arrow : GameObject = Instantiate(ArrowPrefab,crossbow_front.position,crossbow_front.rotation);
		arrow.transform.rigidbody.isKinematic = true;
		arrow.transform.parent = crossbow_front.transform;
		isCreated = true;	// already created status
	}
		
	// fire
	if (Input.GetButton("Fire1") && isCreated) {
			timer = 0;
			isCreated = false;
	}
}

