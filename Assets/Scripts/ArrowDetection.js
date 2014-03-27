private var isFlight : boolean;
private var isHit : boolean;
var DestoryTime : float;
var Speed : float;

function Start () {
	transform.rigidbody.isKinematic = true;
}

function Awake () {
	Destroy(gameObject, DestoryTime);
}

function FixedUpdate () {
	var fwd = transform.TransformDirection(Vector3.forward);
	// Debug
	Debug.DrawRay(transform.position, fwd * 2, Color.green);
	
	if (Input.GetButton("Fire1") && !isFlight && !isHit) {
		transform.rigidbody.isKinematic = false;	// can fly
		transform.parent = null;	// delete parent (weapons)
		rigidbody.velocity = transform.forward * Speed;
		isFlight = true;	// flying
	}
	if (isFlight && !isHit) {
		var hit : RaycastHit;
		transform.LookAt (transform.position + rigidbody.velocity);
		transform.Rotate(0, 0, Random.Range(0, 180)); // ratate the arrow
		
		// Raycast detection (but not 100% stick arrows on object)
		if (Physics.Raycast (transform.position, fwd, hit, 2)) {
			// hit!
			// Debug.Log("Hit!");

			// stick arrow on the object
			if (hit.distance < 0.45) {
				transform.rigidbody.isKinematic = true;
				
				// arrows become to children of NPC object
				if(hit.collider.tag == "NPCbody") {
					transform.parent = hit.transform;
				}
				isFlight = false;
				isHit = true;
			}
		}

	} else {
		// hit 
	}
}