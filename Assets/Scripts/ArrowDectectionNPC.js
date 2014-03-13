#pragma strict

var DestoryTime : float;
private var isHit : boolean;

function Start () {
}

function Awake () {
	Destroy(gameObject, DestoryTime);
}

function FixedUpdate () {
	var fwd = transform.TransformDirection(Vector3.forward);
	// Debug
	Debug.DrawRay(transform.position, fwd * 2, Color.green);

	if (!isHit) {
		var hit : RaycastHit;
		transform.LookAt (transform.position + rigidbody.velocity);
		transform.Rotate(0, 0, Random.Range(0, 180)); // ratate the arrow
		
		// Raycast detection (but not 100% stick arrows on object)
		if (Physics.Raycast (transform.position, fwd, hit, 10)) {
			// hit!
			//Debug.Log("Hit!");

			// stick arrow on the object
			if (hit.distance <0.8) {
				transform.rigidbody.isKinematic = true;
				
				// arrows become to children of NPC object
				if(hit.collider.tag == "Player") {
					transform.parent = hit.transform;
				}
				isHit = true;
			}
		}

	} else {
		// hit 
	}
}